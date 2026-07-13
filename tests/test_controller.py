import sys

from codex_telegram_bridge.codex_controller import CodexController, redact
from codex_telegram_bridge.config import BridgeConfig


def make_config(tmp_path, command, **overrides):
    values = {
        "telegram_bot_token": "12345678:abcdefghijklmnopqrstuvwxyzABCDE",
        "allowed_user_ids": frozenset({123}),
        "codex_workdir": tmp_path,
        "codex_command": tuple(command),
        "command_timeout_seconds": 5.0,
        "max_prompt_length": 100,
        "require_confirmation": True,
    }
    values.update(overrides)
    return BridgeConfig(**values)


def test_controller_runs_without_shell_interpolation(tmp_path):
    config = make_config(
        tmp_path,
        [sys.executable, "-c", "import sys; print(sys.argv[1])"],
        require_confirmation=False,
    )

    result = CodexController(config).run("hello; echo injected")

    assert result.ok
    assert result.stdout.strip() == "hello; echo injected"


def test_controller_blocks_destructive_instruction_without_confirmation(tmp_path):
    config = make_config(tmp_path, [sys.executable, "-c", "print('should not run')"])

    result = CodexController(config).run("commit these changes")

    assert result.blocked
    assert "Re-run with confirmation" in result.stderr


def test_controller_enforces_prompt_length(tmp_path):
    config = make_config(tmp_path, [sys.executable, "-c", "print('should not run')"], max_prompt_length=3)

    result = CodexController(config).run("abcd", confirmed=True)

    assert result.blocked
    assert "maximum length" in result.stderr


def test_controller_timeout(tmp_path):
    config = make_config(
        tmp_path,
        [sys.executable, "-c", "import time; time.sleep(2)"],
        command_timeout_seconds=0.1,
        require_confirmation=False,
    )

    result = CodexController(config).run("wait")

    assert result.timed_out
    assert result.exit_code is None


def test_redact_masks_secret_env_value(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "sk-testsecretvalue1234567890")

    assert "[REDACTED]" in redact("key=sk-testsecretvalue1234567890", ("OPENAI_API_KEY",))
