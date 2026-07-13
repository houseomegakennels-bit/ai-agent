from pathlib import Path

import pytest

from codex_telegram_bridge.config import ConfigError, load_config


def test_load_config_parses_required_and_optional_values(tmp_path: Path):
    config = load_config(
        {
            "TELEGRAM_BOT_TOKEN": "12345678:abcdefghijklmnopqrstuvwxyzABCDE",
            "TELEGRAM_ALLOWED_USER_IDS": "123, 456",
            "CODEX_WORKDIR": str(tmp_path),
            "CODEX_COMMAND": "python -m codex_fake",
            "CODEX_COMMAND_TIMEOUT_SECONDS": "12.5",
            "TELEGRAM_MAX_PROMPT_LENGTH": "77",
            "CODEX_REQUIRE_CONFIRMATION": "false",
        }
    )

    assert config.allowed_user_ids == frozenset({123, 456})
    assert config.codex_workdir == tmp_path.resolve()
    assert config.codex_command == ("python", "-m", "codex_fake")
    assert config.command_timeout_seconds == 12.5
    assert config.max_prompt_length == 77
    assert config.require_confirmation is False


def test_load_config_fails_without_token(tmp_path: Path):
    with pytest.raises(ConfigError, match="TELEGRAM_BOT_TOKEN"):
        load_config({"TELEGRAM_ALLOWED_USER_IDS": "123", "CODEX_WORKDIR": str(tmp_path)})


def test_load_config_fails_without_allowed_users(tmp_path: Path):
    with pytest.raises(ConfigError, match="TELEGRAM_ALLOWED_USER_IDS"):
        load_config({"TELEGRAM_BOT_TOKEN": "token", "CODEX_WORKDIR": str(tmp_path)})
