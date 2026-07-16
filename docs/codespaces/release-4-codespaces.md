# Release 4 — Codespaces

## Purpose

Release 4 defines Codespaces lifecycle, budget, cleanup, and stalled-task recovery contracts.

## Built as contracts

- Validate GitHub/Codespaces permissions.
- Start safe Codespace after policy and budget checks.
- Wait for ready with bounded retries.
- Dispatch scoped worker task.
- Monitor runtime.
- Stop Codespace automatically.
- Stop orphaned Codespaces.
- Delete expired Codespace/task storage.
- Recover stalled Codespace tasks.
- Enforce monthly Codespaces budget and warnings.

## Security boundaries

No real Codespace is started. No GitHub or Codespaces credentials are stored. No worker receives production secrets. No task may run uploaded code on the controller VPS.

## Budget boundaries

Codespaces budget ceiling remains $15/month. Warnings occur at 50%, 75%, and 90%. No agent may increase the budget.

## Out of scope

- No live Codespace startup.
- No GitHub API call.
- No Codex CLI worker runtime.
- No production infrastructure.
