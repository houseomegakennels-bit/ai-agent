# Production Go-Live Candidate Checklist — Release 28

Status: candidate checklist only, not live.

## Launch decision

Release 28 does **not** launch production. It aggregates the remaining blocking gates and records that explicit operator approval is still required.

## Blocking gates

1. Final operator go-live approval is required.
2. Runtime secrets must be injected outside Git with redacted evidence only.
3. Telegram production bridge cutover requires a separate approved runtime release.
4. Controller deployment target, rollback, health, and readiness proof must be approved with redacted metadata.
5. Paid APIs remain disabled unless explicit budget approval exists.

## Current safety state

- Launch approved: no
- Deployment started: no
- Live endpoint contacted: no
- Server IP included: no
- Secret value included: no
- Telegram production bot enabled: no
- Paid API enabled: no
