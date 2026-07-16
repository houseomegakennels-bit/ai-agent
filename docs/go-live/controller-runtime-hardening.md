# Controller Runtime Hardening Checklist — Release 25

Status: dry-run proof only, not live.

## Purpose

This document records the controller runtime hardening checks required before any future live deployment. It does not deploy, start, expose, or contact a production controller.

## Dry-run proof

- Health path: `/health`
- Readiness path: `/ready`
- Server started: no
- Live endpoint contacted: no
- Server IP included: no
- Secret value included: no
- Production traffic allowed: no

## Required future gates

1. Operator approves the deployment release and rollback plan.
2. Runtime secrets are injected outside Git with redacted evidence only.
3. Health and readiness checks are proven in a disposable preview before production traffic.
4. Rollback health proof is captured before any cutover.
5. Telegram bridge runtime remains disabled until its own operator-approved release.
