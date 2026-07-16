# ADR-001 — SQLite selected for Version 1

## Status

Accepted by master specification; implementation not started.

## Decision

Version 1 uses SQLite in WAL mode with transactional task claims and a migration abstraction.

## Rationale

The platform is single-operator, phone-first, and low-cost. SQLite reduces operational burden for Version 1.

## Migration path

PostgreSQL remains a later-only option after measured need and an approved ADR.
