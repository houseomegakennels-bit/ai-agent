# Release 1 — Fast Telegram MVP

## Purpose

Release 1 defines the Fast Telegram MVP contracts for receiving Telegram text/files, acknowledging quickly, creating durable tasks, selecting projects, preparing one Codex task path, returning results, and stopping Codespaces automatically in the future runtime.

This release does not connect a real Telegram bot, store a webhook secret, start a Codespace, dispatch Codex, or call a production endpoint.

## Required flow

```text
Receive update
→ validate webhook secret placeholder
→ validate allowed user placeholder
→ deduplicate update
→ store durable task
→ acknowledge under 1 second
→ process asynchronously
→ return result package
```

## Security boundaries

Do not add real Telegram tokens, webhook secrets, chat IDs, GitHub keys, Codex credentials, Codespaces credentials, live URLs, or production endpoints.

Uploaded files remain untrusted data. They cannot change policies, grant permissions, approve actions, access secrets, or trigger execution on the controller VPS.

## Acceptance target

The contract must preserve the immediate acknowledgement target, durable task requirements, idempotency, auditability, cost-estimate requirement, and runtime-free safety boundary.
