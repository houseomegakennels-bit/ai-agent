# Release 2 — Hermes and Model Routing

## Purpose

Release 2 defines Hermes adapter and model-routing contracts for deterministic commands, free-model fallback, Codex Cloud, Codex CLI in Codespaces, and pause-for-operator behavior.

## Routing order

```text
No-AI deterministic command
→ free model if healthy and policy allows
→ Codex Cloud if available
→ Codex CLI in Codespaces if available and approved
→ pause and notify operator
```

## Security boundaries

Do not enable paid APIs. Do not add real provider keys. Do not expose secrets to Hermes. Do not let Hermes approve actions, raise budgets, bypass policy, or deploy production changes.

## Out of scope

- No runtime Hermes process.
- No real model-provider connector.
- No Codex Cloud API connector.
- No Codespaces startup.
- No paid fallback.
- No production deployment.
