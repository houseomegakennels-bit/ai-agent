# Secret and Environment Wiring Contract — Release 24

Status: placeholder-only contract.

## Runtime-only values

The following values may be configured only in the approved runtime environment. Their real values must never be committed:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ALLOWED_CHAT_ID`
- `CONTROLLER_PUBLIC_BASE_URL`
- `GITHUB_APP_PRIVATE_KEY`

## Rules

- Use placeholders in source control.
- Store real values only in the approved deployment secret manager or runtime environment.
- Never paste real values into Telegram, Codex prompts, logs, Markdown, release evidence, support bundles, or test fixtures.
- Secret wiring does not make the system live; it only defines the safe boundary for a future operator-approved deployment release.
