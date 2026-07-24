"""Telegram Bot API polling bridge for Codex."""

from __future__ import annotations

import json
import time
from html import escape
from typing import Any
from urllib import parse, request
from urllib.error import HTTPError, URLError

from .codex_controller import CodexController, CommandResult, redact
from .config import BridgeConfig, ConfigError, load_config

USAGE = """Codex Telegram Bridge

Commands:
/start - Show this help
/status - Report bridge health
/ask <prompt> - Ask Codex a read-only question
/run <instruction> - Run a controlled Codex task
/run_confirm <instruction> - Run a task that passed your manual confirmation
"""


class TelegramApiError(RuntimeError):
    """Raised when Telegram Bot API calls fail."""


class TelegramClient:
    """Minimal stdlib Telegram Bot API client."""

    def __init__(self, token: str, *, timeout_seconds: float = 35.0) -> None:
        self._base_url = f"https://api.telegram.org/bot{token}"
        self._timeout_seconds = timeout_seconds

    def get_updates(self, *, offset: int | None = None, timeout: int = 30) -> list[dict[str, Any]]:
        params: dict[str, Any] = {"timeout": timeout, "allowed_updates": json.dumps(["message"])}
        if offset is not None:
            params["offset"] = offset
        data = self._post("getUpdates", params)
        return list(data.get("result", []))

    def send_message(self, chat_id: int, text: str, *, parse_mode: str | None = None) -> None:
        params: dict[str, Any] = {"chat_id": chat_id, "text": text}
        if parse_mode:
            params["parse_mode"] = parse_mode
        self._post("sendMessage", params)

    def _post(self, method: str, params: dict[str, Any]) -> dict[str, Any]:
        encoded = parse.urlencode(params).encode("utf-8")
        api_request = request.Request(f"{self._base_url}/{method}", data=encoded, method="POST")
        try:
            with request.urlopen(api_request, timeout=self._timeout_seconds) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except (HTTPError, URLError, TimeoutError, OSError) as exc:
            raise TelegramApiError(f"Telegram API request failed for {method}: {exc}") from exc
        if not payload.get("ok"):
            raise TelegramApiError(f"Telegram API request failed for {method}: {payload!r}")
        return payload


def is_authorized(config: BridgeConfig, user_id: int | None) -> bool:
    """Return whether a Telegram user ID is allowed to use the bridge."""

    return user_id is not None and user_id in config.allowed_user_ids


def validate_prompt(config: BridgeConfig, prompt: str) -> str | None:
    """Validate prompt length and presence, returning an error message if invalid."""

    if not prompt.strip():
        return "Please provide text after the command."
    if len(prompt) > config.max_prompt_length:
        return f"Prompt is too long; limit is {config.max_prompt_length} characters."
    return None


def format_result(result: CommandResult, config: BridgeConfig) -> str:
    """Format a command result for Telegram with truncation and redaction."""

    status = "timed out" if result.timed_out else "blocked" if result.blocked else f"exit {result.exit_code}"
    body = []
    if result.stdout:
        body.append(f"stdout:\n{result.stdout}")
    if result.stderr:
        body.append(f"stderr:\n{result.stderr}")
    text = f"Codex result: {status}\n\n" + ("\n\n".join(body) if body else "No output.")
    return escape(redact(_truncate(text), config.sensitive_env_names))


def handle_message(message: dict[str, Any], config: BridgeConfig, controller: CodexController) -> list[tuple[str, str | None]]:
    """Handle one Telegram message and return replies as ``(text, parse_mode)`` tuples."""

    user_id = _extract_user_id(message)
    if not is_authorized(config, user_id):
        return [("Unauthorized.", None)]

    text = str(message.get("text") or "").strip()
    command, argument = _split_command(text)
    if command == "/start":
        return [(USAGE, None)]
    if command == "/status":
        return [("Bridge is alive.", None)]
    if command == "/ask":
        return _run_codex(argument, config, controller, prefix="Answer this without changing files: ", confirmed=True)
    if command == "/run":
        return _run_codex(argument, config, controller, prefix="", confirmed=False)
    if command == "/run_confirm":
        return _run_codex(argument, config, controller, prefix="", confirmed=True)
    return [("Unknown command. Send /start for usage.", None)]


def run_polling(
    config: BridgeConfig,
    controller: CodexController | None = None,
    client: TelegramClient | None = None,
    *,
    poll_timeout_seconds: int = 30,
) -> None:
    """Poll Telegram for messages and dispatch commands forever."""

    active_controller = controller or CodexController(config)
    active_client = client or TelegramClient(config.telegram_bot_token)
    offset: int | None = None
    while True:
        try:
            updates = active_client.get_updates(offset=offset, timeout=poll_timeout_seconds)
            for update in updates:
                offset = int(update["update_id"]) + 1
                message = update.get("message")
                if not isinstance(message, dict) or "chat" not in message:
                    continue
                chat_id = int(message["chat"]["id"])
                for reply, parse_mode in handle_message(message, config, active_controller):
                    active_client.send_message(chat_id, reply, parse_mode=parse_mode)
        except TelegramApiError as exc:
            print(exc, flush=True)
            time.sleep(5)


def main() -> None:
    """CLI entry point."""

    try:
        config = load_config()
    except ConfigError as exc:
        raise SystemExit(f"Configuration error: {exc}") from exc
    run_polling(config)


def _run_codex(
    instruction: str,
    config: BridgeConfig,
    controller: CodexController,
    *,
    prefix: str,
    confirmed: bool,
) -> list[tuple[str, str | None]]:
    error = validate_prompt(config, instruction)
    if error:
        return [(error, None)]
    result = controller.run(prefix + instruction, confirmed=confirmed)
    return [("Codex task started...", None), (format_result(result, config), "HTML")]


def _split_command(text: str) -> tuple[str, str]:
    if not text:
        return "", ""
    command, separator, argument = text.partition(" ")
    command = command.split("@", 1)[0]
    return command, argument if separator else ""


def _extract_user_id(message: dict[str, Any]) -> int | None:
    sender = message.get("from")
    if not isinstance(sender, dict):
        return None
    user_id = sender.get("id")
    return int(user_id) if isinstance(user_id, int) else None


def _truncate(text: str, limit: int = 3500) -> str:
    if len(text) <= limit:
        return text
    return text[: limit - 80] + "\n...[truncated for Telegram response safety]"


if __name__ == "__main__":
    main()
