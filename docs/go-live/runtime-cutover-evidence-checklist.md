# Runtime Cutover Evidence Checklist

Status: redacted evidence checklist only, not live.

This checklist maps the Release 31 runtime cutover runbook preconditions to proof artifacts required before any separately approved runtime implementation release. It does not deploy services, contact infrastructure, reveal controller targets, inject secrets, enable Telegram runtime, enable paid APIs, connect broker accounts, or start trading workflows.

## Required redacted evidence

| Runbook precondition | Required proof placeholder | Current status |
| --- | --- | --- |
| Operator runtime approval | `REDACTED_OPERATOR_RUNTIME_APPROVAL_REFERENCE` | Blocked until separately approved runtime release |
| Runtime-only secret injection proof | `REDACTED_RUNTIME_SECRET_PROOF_REFERENCE` | Blocked until separately approved runtime release |
| Deployment target proof | `REDACTED_DEPLOYMENT_TARGET_REFERENCE` | Missing redacted evidence |
| Rollback and restore proof | `REDACTED_ROLLBACK_PROOF_REFERENCE` | Missing redacted evidence |
| Telegram production cutover proof | `REDACTED_TELEGRAM_CUTOVER_REFERENCE` | Blocked until separately approved runtime release |
| Paid API budget proof | `REDACTED_BUDGET_APPROVAL_REFERENCE` | Blocked until separately approved runtime release |

## Evidence handling rules

1. Store sensitive proof outside Git.
2. Commit only redacted references or placeholders.
3. Do not paste secrets into Markdown, logs, prompts, support bundles, Telegram, or test fixtures.
4. Do not include live URLs, server IPs, account IDs, token values, bot tokens, webhook secrets, broker credentials, or trading credentials.
5. Require a separate operator-approved runtime implementation release before using any evidence to affect infrastructure.

## Safety state

- Deployment started: no
- Live endpoint contacted: no
- Server IP included: no
- Real secret included: no
- Telegram production bot enabled: no
- Paid API enabled: no
- Broker integration enabled: no
- Trading integration enabled: no
- Runtime implementation release required: yes

## Forbidden in this release

- Production deployment automation
- Live URLs or server IPs
- Real secrets, account IDs, bot tokens, webhook secrets, or credentials
- Telegram production bot connection
- Paid API enablement
- Broker or trading integration
- Commands that start, mutate, or validate live infrastructure
