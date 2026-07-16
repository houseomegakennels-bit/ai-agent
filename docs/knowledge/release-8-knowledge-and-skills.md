# Release 8 — Knowledge and Skills

## Purpose

Release 8 defines the unified knowledge system, prompt versioning, skill versioning, ADR requirements, documentation automation, and skill scoring contracts.

## Built as contracts

- Unified knowledge areas: memory, skills, documentation, prompts, research, and decisions.
- Knowledge entry metadata: source, date, project scope, confidence, sensitivity, expiration/review date, and edit/delete controls.
- Skill definition of done.
- Skill version promotion and rollback contract.
- Prompt versioning contract.
- ADR contract for major choices.
- Skill scoring contract through task-result scoring and version comparison.

## Boundaries

Version 1 uses Git-tracked Markdown and normal search. No vector database. No runtime memory store. No placeholders may be marked complete. No sensitive data may be stored in knowledge entries.
