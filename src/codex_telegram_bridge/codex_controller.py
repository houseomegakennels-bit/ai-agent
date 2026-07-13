"""Controlled Codex command execution."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import os
import re
import subprocess

from .config import BridgeConfig


DESTRUCTIVE_PATTERNS = tuple(
    re.compile(pattern, re.IGNORECASE)
    for pattern in (
        r"\b(write|edit|modify|delete|remove|overwrite)\b",
        r"\b(commit|push|merge|rebase)\b",
        r"\b(install|pip|npm|pnpm|yarn|apt|brew)\b",
        r"\b(curl|wget|network|download|upload)\b",
    )
)


@dataclass(frozen=True)
class CommandResult:
    """Result of a Codex invocation."""

    stdout: str
    stderr: str
    exit_code: int | None
    timed_out: bool = False
    blocked: bool = False

    @property
    def ok(self) -> bool:
        return not self.timed_out and not self.blocked and self.exit_code == 0


class CodexController:
    """Small, safe interface around the Codex CLI."""

    def __init__(self, config: BridgeConfig) -> None:
        self._config = config

    def run(self, instruction: str, *, confirmed: bool = False, dry_run: bool = False) -> CommandResult:
        """Run Codex with an instruction and capture its output.

        Arguments are passed as a list to avoid shell interpolation of untrusted
        Telegram input. Potentially destructive instructions are blocked unless
        confirmation is disabled or the call is explicitly confirmed.
        """

        instruction = instruction.strip()
        if not instruction:
            return CommandResult("", "Instruction must not be empty.", 2, blocked=True)
        if len(instruction) > self._config.max_prompt_length:
            return CommandResult(
                "",
                f"Instruction exceeds maximum length of {self._config.max_prompt_length} characters.",
                2,
                blocked=True,
            )
        if self.needs_confirmation(instruction) and not confirmed:
            return CommandResult(
                "",
                "Instruction may change files, install packages, use the network, or affect git. "
                "Re-run with confirmation if you trust it.",
                2,
                blocked=True,
            )

        args = [*self._config.codex_command, instruction]
        if dry_run:
            return CommandResult("Dry run: " + " ".join(_quote_for_display(arg) for arg in args), "", 0)

        try:
            completed = subprocess.run(
                args,
                cwd=self._config.codex_workdir,
                env=_minimal_child_env(os.environ),
                text=True,
                capture_output=True,
                timeout=self._config.command_timeout_seconds,
                check=False,
            )
        except subprocess.TimeoutExpired as exc:
            return CommandResult(
                redact(str(exc.stdout or ""), self._config.sensitive_env_names),
                redact(str(exc.stderr or ""), self._config.sensitive_env_names),
                None,
                timed_out=True,
            )

        return CommandResult(
            redact(completed.stdout, self._config.sensitive_env_names),
            redact(completed.stderr, self._config.sensitive_env_names),
            completed.returncode,
        )

    def needs_confirmation(self, instruction: str) -> bool:
        """Return whether an instruction should require explicit confirmation."""

        return self._config.require_confirmation and any(pattern.search(instruction) for pattern in DESTRUCTIVE_PATTERNS)


def redact(text: str, sensitive_env_names: tuple[str, ...]) -> str:
    """Redact known secret values and token-looking strings from command output."""

    redacted = text
    for name in sensitive_env_names:
        value = os.environ.get(name)
        if value:
            redacted = redacted.replace(value, "[REDACTED]")
    redacted = re.sub(r"\b\d{8,10}:[A-Za-z0-9_-]{30,}\b", "[REDACTED_TELEGRAM_TOKEN]", redacted)
    redacted = re.sub(r"\b(sk-[A-Za-z0-9_-]{20,})\b", "[REDACTED_API_KEY]", redacted)
    return redacted


def _minimal_child_env(parent_env: os._Environ[str]) -> dict[str, str]:
    """Pass through the environment while leaving redaction to response formatting."""

    return dict(parent_env)


def _quote_for_display(arg: str | Path) -> str:
    import shlex

    return shlex.quote(str(arg))
