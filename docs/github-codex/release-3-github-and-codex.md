# Release 3 — GitHub and Codex

## Purpose

Release 3 defines project registry, GitHub workflow, Codex Cloud capability, Codex CLI fallback, and evaluation contracts.

## Built as contracts

- Project registry entry for Blackspire Helix Command Core.
- Branch prefix validation contract.
- GitHub workflow contract requiring pull requests and human review.
- Codex dispatch route contracts for Codex Cloud capability test, Codex CLI/Codespace fallback, open-model coding fallback, and pause-and-notify-operator.
- Evaluation contract requiring tests, PR, and human approval before the next release.

## Security boundaries

No real GitHub private key, app ID, installation ID, Codex credential, Codespaces credential, model key, token, webhook secret, live URL, or production endpoint may be committed.

Codex cannot approve its own pull request, spend money without approval, bypass policy, or push directly to main.

## Out of scope

- No runtime Codex dispatch.
- No live GitHub App connection.
- No Codespace startup.
- No repository mutation outside this development PR.
- No paid model fallback.
