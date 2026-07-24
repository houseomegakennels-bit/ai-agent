from codex_telegram_bridge.bot import format_result, handle_message, is_authorized, validate_prompt
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


class FakeController:
    def __init__(self):
        self.calls = []

    def run(self, instruction, *, confirmed=False):
        self.calls.append((instruction, confirmed))
        return CommandResult("ok", "", 0)


def message(text, user_id=123):
    return {"text": text, "from": {"id": user_id}, "chat": {"id": 456}}


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


def test_handle_message_rejects_unauthorized_user(tmp_path):
    replies = handle_message(message("/status", user_id=999), make_config(tmp_path), FakeController())

    assert replies == [("Unauthorized.", None)]


def test_handle_message_routes_run_confirm(tmp_path):
    controller = FakeController()
    replies = handle_message(message("/run_confirm test"), make_config(tmp_path), controller)

    assert replies[0] == ("Codex task started...", None)
    assert replies[1][1] == "HTML"
    assert controller.calls == [("test", True)]
