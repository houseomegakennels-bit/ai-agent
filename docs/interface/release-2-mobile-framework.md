# Release -2 — Mobile Framework

## Built

- Shared React/TypeScript command-interface shell.
- PWA manifest and mobile viewport metadata.
- Phone-first dashboard home screen with system status, current project, active task, human-action queue, quick actions, low-bandwidth control, explain-this-screen control, and always-visible Emergency Stop.
- Reusable shell state helpers for Basic Mode, human-action queue summaries, and safe offline action rules.
- Design token JSON for semantic state colors and mobile interaction rules.
- Reduced Motion CSS handling.

## Not built

- Runtime API services.
- Telegram bot or Mini App authentication.
- Passkey authentication.
- Push notifications.
- Codex dispatch.
- Codespaces automation.
- Browser worker.
- TradingView workflow.
- Secret vault.
- Production deployment.

## Gate

Release -2 is limited to the mobile framework and must stop for operator review before Release -1 begins.

## Validation status

Scaffold validation, secret-pattern validation, mobile framework tests, dependency installation, and production scaffold build passed in this environment. The Release -2 scaffold intentionally uses no external packages so restricted registry access does not block review.
