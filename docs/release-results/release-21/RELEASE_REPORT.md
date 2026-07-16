# Release 21 Report — Local Task Activity Feed and Recent-Change Previews

## Status

Completed pending operator review.

## Scope delivered

- Approved Release 20 and started Release 21 after operator instruction.
- Added a local-only task activity feed contract for mock recent changes.
- Added an in-memory activity adapter for command-interface feed previews.
- Rendered a phone-first Activity Feed card with local filters, recent-change events, and mock actor labels.
- Added grouped loading, empty, validation, and error states for activity feed review.
- Added deterministic tests for the Release 21 contract, adapter, command-interface, static build output, and manifest flag.

## Telegram bridge status

The Telegram bridge is not set up yet. Telegram remains contract-only in the build manifest and no production bot, webhook, token, chat ID, live endpoint, or bridge runtime was added in Release 21.

## Safety boundaries

- No persistence was added.
- No live endpoint was contacted or configured.
- No production deployment, server IP, paid API, Telegram bot, GitHub token, broker integration, or trading integration was added.
- All activity events remain mock, local, and in-memory.

## Evidence

- `npm run test:local-task-activity`
- `npm test`
- `npm run build`
- `./scripts/validate-environment.sh`
- `./scripts/validate-no-secrets.sh`
- `./scripts/export-scaffold-evidence.sh`
