# Production Health and Readiness Smoke-Test Contract

Status: production health/readiness smoke-test contract only, not executed.

This contract defines the redacted evidence shape for future production `/health`, `/ready`, Telegram webhook health, operator mobile smoke proof, and rollback health gates. It does not contact live endpoints, include production URLs, include server IPs, connect a Telegram production bot, include bot tokens, include webhook secrets, enable paid APIs, connect brokers, or start trading workflows.

## Required smoke-test artifacts

| Smoke-test artifact | Redacted placeholder | Current status |
| --- | --- | --- |
| Controller health response shape | `REDACTED_CONTROLLER_HEALTH_RESPONSE_SHAPE_FIXTURE` | Dry-run smoke shape only |
| Controller readiness response shape | `REDACTED_CONTROLLER_READINESS_RESPONSE_SHAPE_FIXTURE` | Dry-run smoke shape only |
| Telegram webhook health placeholder | `REDACTED_TELEGRAM_WEBHOOK_HEALTH_PLACEHOLDER` | Redacted fixture only |
| Operator mobile smoke proof placeholder | `REDACTED_OPERATOR_MOBILE_SMOKE_PROOF_PLACEHOLDER` | Blocked until runtime approval |
| Rollback health gate placeholder | `REDACTED_ROLLBACK_HEALTH_GATE_PLACEHOLDER` | Redacted fixture only |

## Dry-run rules

1. Do not contact production health, readiness, webhook, or rollback endpoints.
2. Do not commit production URLs, server IPs, bot tokens, webhook secrets, chat IDs, account identifiers, credentials, or live response payloads.
3. Keep all smoke-test evidence as redacted shape fixtures until runtime implementation approval exists.
4. Require iPhone-operable proof for future operator validation without requiring desktop-only workflows.
5. Require rollback health gates before any future production validation can be marked complete.

## Safety state

- Production health endpoint contacted: no
- Production readiness endpoint contacted: no
- Telegram webhook contacted: no
- Production URL included: no
- Server IP included: no
- Real secret included: no
- Bot token included: no
- Paid API enabled: no
- Broker integration enabled: no
- Trading integration enabled: no
- Runtime implementation approval required: yes

## Forbidden in this release

- Live health/readiness/webhook/rollback endpoint checks
- Production URLs, server IPs, bot tokens, webhook secrets, chat IDs, account IDs, credentials, or live response payloads
- Telegram production bot connection or webhook registration
- Paid API enablement
- Broker or trading system connection
- Commands that start, mutate, probe, curl, ping, or validate live infrastructure
