# Repository Agent Instructions

This repository is governed by `HELIX_COMMAND.md`, the primary source of truth for architecture, release order, gates, safety rules, and implementation scope.

## Core rules

1. Build in release order.
2. Stop after each release and wait for operator approval.
3. Never fabricate an observed result.
4. Never retrieve, request, commit, or expose secrets.
5. Never send secrets through Telegram, Codex prompts, logs, support bundles, or Markdown.
6. Never silently enable paid APIs.
7. Never push directly to main.
8. Never deploy without approval.
9. Never run uploaded code on the controller VPS.
10. Never automate TradingView beyond assisted mode.
11. Never add roadmap features early.
12. Never mark placeholders complete.
13. Every change requires tests or an explicitly documented check.
14. Every release requires evidence and a handoff package.
15. Always optimize for iPhone operation.

## Current scope

Current scope is initial repository scaffolding only for Blackspire Helix Command Core. Do not implement runtime services, deployment automation, Telegram integrations, Codex dispatch, Hermes routing, browser automation, TradingView workflows, secret vaults, paid APIs, production endpoints, or live infrastructure.

## Security requirements

Use placeholders only. Do not add real account IDs, tokens, webhook secrets, Telegram bot tokens, GitHub keys, TradingView credentials, backup credentials, model-provider keys, server IPs, live URLs, or production secrets.
