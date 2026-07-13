"""Configuration loading for the Codex Telegram bridge."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import os


class ConfigError(ValueError):
    """Raised when configuration is missing or unsafe."""


@dataclass(frozen=True)
class BridgeConfig:
    """Runtime configuration for the Telegram bridge."""

    telegram_bot_token: str
    allowed_user_ids: frozenset[int]
    codex_workdir: Path
    codex_command: tuple[str, ...]
    command_timeout_seconds: float = 300.0
    max_prompt_length: int = 4000
    require_confirmation: bool = True
    sensitive_env_names: tuple[str, ...] = (
        "TELEGRAM_BOT_TOKEN",
        "OPENAI_API_KEY",
        "ANTHROPIC_API_KEY",
        "GITHUB_TOKEN",
        "GH_TOKEN",
    )


def load_config(env: dict[str, str] | None = None) -> BridgeConfig:
    """Load bridge configuration from environment variables.

    Required variables:
    - TELEGRAM_BOT_TOKEN
    - TELEGRAM_ALLOWED_USER_IDS (comma-separated Telegram numeric user IDs)

    Optional variables:
    - CODEX_WORKDIR (defaults to current working directory)
    - CODEX_COMMAND (defaults to ``codex``; split with shell-like syntax)
    - CODEX_COMMAND_TIMEOUT_SECONDS (defaults to 300)
    - TELEGRAM_MAX_PROMPT_LENGTH (defaults to 4000)
    - CODEX_REQUIRE_CONFIRMATION (defaults to true)
    """

    source = env if env is not None else os.environ
    token = _required(source, "TELEGRAM_BOT_TOKEN")
    allowed_user_ids = _parse_allowed_user_ids(_required(source, "TELEGRAM_ALLOWED_USER_IDS"))
    workdir = Path(source.get("CODEX_WORKDIR", os.getcwd())).expanduser().resolve()
    if not workdir.exists() or not workdir.is_dir():
        raise ConfigError(f"CODEX_WORKDIR must be an existing directory: {workdir}")

    return BridgeConfig(
        telegram_bot_token=token,
        allowed_user_ids=allowed_user_ids,
        codex_workdir=workdir,
        codex_command=tuple(_split_command(source.get("CODEX_COMMAND", "codex"))),
        command_timeout_seconds=_parse_positive_float(source, "CODEX_COMMAND_TIMEOUT_SECONDS", 300.0),
        max_prompt_length=_parse_positive_int(source, "TELEGRAM_MAX_PROMPT_LENGTH", 4000),
        require_confirmation=_parse_bool(source.get("CODEX_REQUIRE_CONFIRMATION", "true")),
    )


def _required(env: dict[str, str], name: str) -> str:
    value = env.get(name, "").strip()
    if not value:
        raise ConfigError(f"Missing required environment variable: {name}")
    return value


def _parse_allowed_user_ids(raw: str) -> frozenset[int]:
    ids: set[int] = set()
    for item in raw.split(","):
        item = item.strip()
        if not item:
            continue
        try:
            user_id = int(item)
        except ValueError as exc:
            raise ConfigError("TELEGRAM_ALLOWED_USER_IDS must contain only numeric IDs") from exc
        if user_id <= 0:
            raise ConfigError("TELEGRAM_ALLOWED_USER_IDS must contain positive numeric IDs")
        ids.add(user_id)
    if not ids:
        raise ConfigError("TELEGRAM_ALLOWED_USER_IDS must include at least one user ID")
    return frozenset(ids)


def _split_command(raw: str) -> list[str]:
    import shlex

    command = shlex.split(raw)
    if not command:
        raise ConfigError("CODEX_COMMAND must not be empty")
    return command


def _parse_positive_float(env: dict[str, str], name: str, default: float) -> float:
    raw = env.get(name)
    if raw is None or raw.strip() == "":
        return default
    try:
        value = float(raw)
    except ValueError as exc:
        raise ConfigError(f"{name} must be a positive number") from exc
    if value <= 0:
        raise ConfigError(f"{name} must be positive")
    return value


def _parse_positive_int(env: dict[str, str], name: str, default: int) -> int:
    raw = env.get(name)
    if raw is None or raw.strip() == "":
        return default
    try:
        value = int(raw)
    except ValueError as exc:
        raise ConfigError(f"{name} must be a positive integer") from exc
    if value <= 0:
        raise ConfigError(f"{name} must be positive")
    return value


def _parse_bool(raw: str) -> bool:
    normalized = raw.strip().lower()
    if normalized in {"1", "true", "yes", "y", "on"}:
        return True
    if normalized in {"0", "false", "no", "n", "off"}:
        return False
    raise ConfigError("CODEX_REQUIRE_CONFIRMATION must be a boolean value")
