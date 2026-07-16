# Codex Telegram Bridge

A small Python Telegram bot that lets an allowlisted Telegram user ask questions of Codex or start controlled Codex tasks from chat.

> **Security warning:** this project exposes an automation agent through Telegram. Treat the bot token like a production secret, restrict access with `TELEGRAM_ALLOWED_USER_IDS`, run the bridge in a locked-down workspace, and keep confirmation mode enabled unless you fully understand the risk.

## Features

- Telegram commands for `/start`, `/status`, `/ask`, `/run`, and `/run_confirm`.
- Required Telegram user allowlist.
- Maximum prompt length checks.
- Codex command timeout handling.
- Codex invocation through argument lists rather than shell-interpolated strings.
- Confirmation guard for instructions that appear to write files, commit, install packages, or use the network.
- Redaction of common sensitive environment values from Telegram responses.

## Project layout

```text
pyproject.toml
src/codex_telegram_bridge/
  __init__.py
  bot.py
  codex_controller.py
  config.py
tests/
```

## Setup

1. Create a Telegram bot with BotFather:
   - Open Telegram and start a chat with `@BotFather`.
   - Send `/newbot`.
   - Choose a display name and username.
   - Copy the bot token and store it securely as `TELEGRAM_BOT_TOKEN`.
2. Find your Telegram numeric user ID. A common option is to message a trusted user-info bot, then copy the numeric ID it reports.
3. Install this project:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -e .
   ```

4. Export the required environment variables:

   ```bash
   export TELEGRAM_BOT_TOKEN='123456789:replace-with-your-token'
   export TELEGRAM_ALLOWED_USER_IDS='123456789'
   export CODEX_WORKDIR='/path/to/workspace'
   ```

5. Start polling:

   ```bash
   codex-telegram-bridge
   ```

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | Yes | None | Token from BotFather. |
| `TELEGRAM_ALLOWED_USER_IDS` | Yes | None | Comma-separated numeric Telegram user IDs allowed to use the bridge. |
| `CODEX_WORKDIR` | No | Current working directory | Directory where Codex is invoked. Must already exist. |
| `CODEX_COMMAND` | No | `codex` | Codex command to execute. This is split with shell-like parsing and then executed as an argument list, not through a shell. |
| `CODEX_COMMAND_TIMEOUT_SECONDS` | No | `300` | Maximum runtime for each Codex command. |
| `TELEGRAM_MAX_PROMPT_LENGTH` | No | `4000` | Maximum prompt or instruction length accepted from Telegram. |
| `CODEX_REQUIRE_CONFIRMATION` | No | `true` | When true, potentially destructive instructions are blocked unless sent with `/run_confirm`. |

## Telegram commands

- `/start` - Show usage.
- `/status` - Verify that the bridge is alive.
- `/ask <prompt>` - Ask Codex a read-only question. The bridge prefixes the prompt with a read-only instruction.
- `/run <instruction>` - Start a controlled Codex task. Potentially destructive tasks are blocked when confirmation mode is enabled.
- `/run_confirm <instruction>` - Run an instruction after you manually confirm that you trust it.

Example:

```text
/status
/ask Explain the test layout in this repository.
/run Inspect the code and summarize TODO comments.
/run_confirm Update README.md with the new deployment notes.
```

## Safety guidance

- Keep `CODEX_REQUIRE_CONFIRMATION=true` for any bot connected to a real repository.
- Use a dedicated Telegram bot token for this bridge only.
- Keep the allowed-user list as small as possible.
- Run the process with the least filesystem and network access needed.
- Prefer a disposable branch or workspace for tasks started from Telegram.
- Never paste secrets into Telegram commands; responses are redacted for common secret formats, but redaction is a last line of defense, not a guarantee.

## Development

Install test dependencies and run tests:

```bash
pip install -e '.[test]'
pytest -q
```

## GitHub Codespaces setup

This repository includes a `.devcontainer/devcontainer.json` so GitHub Codespaces can open it with Python and the test dependencies installed automatically.

1. Push this repository to GitHub.
2. In GitHub, select **Code** → **Codespaces** → **Create codespace on current branch**.
3. Add repository or Codespace secrets for:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_ALLOWED_USER_IDS`
4. In the Codespace terminal, export the secrets into the shell if they are not already present:

   ```bash
   export TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN"
   export TELEGRAM_ALLOWED_USER_IDS="$TELEGRAM_ALLOWED_USER_IDS"
   export CODEX_WORKDIR="$PWD"
   ```

5. Start the bridge:

   ```bash
   codex-telegram-bridge
   ```

Codespaces are useful for testing, but they may stop when idle. For a long-running production bridge, prefer a small VPS, container worker, or systemd service on a server you control.

You can also copy `.env.example` to `.env` for local setup, but do not commit real tokens.
