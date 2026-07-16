# Release 0 — Operations Foundation

## Purpose

Release 0 defines the operations foundation contracts for secret handling, recovery, diagnostics, backups, restore, safe update, rollback, emergency stop, and external uptime monitoring.

This release does not deploy production infrastructure or collect real secrets.

## Built as contracts

- Secret vault contract.
- Offline recovery-key contract.
- Diagnostics contract.
- Backup contract.
- Restore contract.
- Safe update contract.
- Rollback contract.
- Emergency stop contract.
- External uptime monitor contract.

## Phone-first requirements

Every operations flow must be understandable and usable from iPhone. Screens must explain the current state, why action is required, what happens next, risk level, and whether approval is required.

## Security boundaries

Do not enter real secrets. Do not paste tokens into chat. Do not store raw recovery keys in Git, Markdown, logs, Telegram, support bundles, or backups. Do not expose secret vault values to Codex or Hermes.

## Out of scope

- No production deployment.
- No live infrastructure.
- No real secret vault runtime.
- No real backup provider connection.
- No real uptime monitor connection.
- No Telegram command runtime.
- No Codespaces control runtime.
- No paid model controls beyond disabled placeholders.
