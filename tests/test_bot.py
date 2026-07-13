from codex_telegram_bridge.bot import is_authorized, validate_prompt, format_result
from codex_telegram_bridge.codex_controller import CommandResult
from codex_telegram_bridge.config import BridgeConfig


def make_config(tmp_path):
    return BridgeConfig(
        telegram_bot_token="12345678:abcdefghijklmnopqrstuvwxyzABCDE",
        allowed_user_ids=frozenset({123}),
        codex_workdir=tmp_path,
        codex_command=("codex",),
        max_prompt_length=5,
    )


def test_authorized_user_allowed(tmp_path):
    assert is_authorized(make_config(tmp_path), 123)


def test_unauthorized_user_rejected(tmp_path):
    assert not is_authorized(make_config(tmp_path), 999)
    assert not is_authorized(make_config(tmp_path), None)


def test_prompt_length_validation(tmp_path):
    config = make_config(tmp_path)

    assert validate_prompt(config, "") == "Please provide text after the command."
    assert validate_prompt(config, "123456") == "Prompt is too long; limit is 5 characters."
    assert validate_prompt(config, "12345") is None


def test_format_result_includes_status_and_escapes_html(tmp_path):
    config = make_config(tmp_path)
    text = format_result(CommandResult("<ok>", "", 0), config)

    assert "exit 0" in text
    assert "&lt;ok&gt;" in text
