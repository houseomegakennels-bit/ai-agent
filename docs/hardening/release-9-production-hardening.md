# Release 9 — Production Hardening

## Purpose

Release 9 defines production-hardening contracts before any production deployment is allowed.

## Built as contracts

- Restore drill requirements.
- Failure simulation matrix requirements.
- Migration safety and dry-run requirements.
- Dependency and secret scan requirements.
- Security review requirements.
- Preview deploy contract.
- Rollback validation contract.
- Production acceptance contract.

## Boundaries

No production deployment is performed. No real secrets, live endpoints, server IPs, production credentials, or paid API activation are added. Preview deployment remains contract-only and requires operator approval before any future runtime implementation.
