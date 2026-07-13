"""Telegram command handlers for the Codex bridge."""

from __future__ import annotations

import asyncio
from html import escape

from typing import Any, TYPE_CHECKING

if TYPE_CHECKING:
    from telegram import Update
    from telegram.ext import Application, ContextTypes
else:
    Update = Any
    ContextTypes = Any
    Application = Any

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


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _reply_if_authorized(update, context, USAGE)


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _reply_if_authorized(update, context, "Bridge is alive.")


async def ask(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _run_codex(update, context, prefix="Answer this without changing files: ", confirmed=True)


async def run(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _run_codex(update, context, prefix="", confirmed=False)


async def run_confirm(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _run_codex(update, context, prefix="", confirmed=True)


async def reject_unknown(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await _reply_if_authorized(update, context, "Unknown command. Send /start for usage.")


async def _run_codex(update: Update, context: ContextTypes.DEFAULT_TYPE, *, prefix: str, confirmed: bool) -> None:
    config: BridgeConfig = context.application.bot_data["config"]
    controller: CodexController = context.application.bot_data["controller"]
    if not await _ensure_authorized(update, config):
        return
    instruction = " ".join(context.args or [])
    error = validate_prompt(config, instruction)
    if error:
        await update.effective_message.reply_text(error)
        return
    await update.effective_message.reply_text("Codex task started...")
    result = await asyncio.to_thread(controller.run, prefix + instruction, confirmed=confirmed)
    await update.effective_message.reply_html(format_result(result, config))


async def _reply_if_authorized(update: Update, context: ContextTypes.DEFAULT_TYPE, text: str) -> None:
    config: BridgeConfig = context.application.bot_data["config"]
    if await _ensure_authorized(update, config):
        await update.effective_message.reply_text(text)


async def _ensure_authorized(update: Update, config: BridgeConfig) -> bool:
    if is_authorized(config, update.effective_user.id if update.effective_user else None):
        return True
    if update.effective_message:
        await update.effective_message.reply_text("Unauthorized.")
    return False


def build_application(config: BridgeConfig, controller: CodexController | None = None) -> Application:
    """Build the python-telegram-bot application."""

    from telegram.ext import Application as TelegramApplication, CommandHandler, MessageHandler, filters

    app = TelegramApplication.builder().token(config.telegram_bot_token).build()
    app.bot_data["config"] = config
    app.bot_data["controller"] = controller or CodexController(config)
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(CommandHandler("ask", ask))
    app.add_handler(CommandHandler("run", run))
    app.add_handler(CommandHandler("run_confirm", run_confirm))
    app.add_handler(MessageHandler(filters.ALL, reject_unknown))
    return app


def main() -> None:
    """CLI entry point."""

    try:
        config = load_config()
    except ConfigError as exc:
        raise SystemExit(f"Configuration error: {exc}") from exc
    from telegram import Update as TelegramUpdate

    build_application(config).run_polling(allowed_updates=TelegramUpdate.ALL_TYPES)


def _truncate(text: str, limit: int = 3500) -> str:
    if len(text) <= limit:
        return text
    return text[: limit - 80] + "\n...[truncated for Telegram response safety]"


if __name__ == "__main__":
    main()
