# HELIX COMMAND — Phone-First AI Orchestration Platform

**Project name:** Blackspire Helix Command Core  
**Status:** Master Build Specification  
**Primary operator:** Single user operating entirely from an iPhone  
**Primary command surface:** Telegram  
**Primary build system:** Codex Cloud  
**Primary execution fallback:** GitHub Codespaces + Codex CLI  
**Primary orchestrator:** Hermes Agent behind a custom policy, task, and security layer  
**Primary trading workflow:** Assisted TradingView operation through a secure remote browser  
**Default deployment model:** One always-on controller VPS plus on-demand workers

## Mission

Build a secure, low-cost, phone-first AI command platform that can be installed, configured, operated, diagnosed, updated, backed up, restored, and shut down entirely from an iPhone.

The platform must let the operator send text, voice notes, documents, ZIP files, PDFs, images, Pine scripts, CSV files, and project files through Telegram; receive immediate acknowledgements; route work to deterministic tools, low-cost models, Codex Cloud, Codex CLI in Codespaces, browser workers, Pine review tools, and trading analytics; and receive summaries, pull requests, reports, screenshots, and evidence packages back through Telegram and the mobile dashboard.

## Scope lock

Codex Cloud must implement only the features assigned to the active release. New ideas discovered during implementation must be recorded in `ROADMAP.md` and must not be implemented unless required by the active release acceptance criteria.

Do not add extra services, databases, message brokers, authentication platforms, agents, or infrastructure merely because they may be useful later. Prefer the simplest implementation that fully satisfies the acceptance criteria.

## Non-negotiable phone-only requirement

No required production workflow may depend on a desktop computer, VS Code, local terminal access, SSH as the normal interface, hover-only controls, drag-and-drop, wide desktop-only tables, manual config-file editing, raw-log reading, copying long multiline commands, or installing local desktop software.

All required workflows must be usable through Telegram, a mobile PWA, Safari on iPhone, GitHub Mobile or mobile Safari, Codex Cloud through ChatGPT, or a secure mobile remote-browser takeover flow.

## Core architecture

```text
iPhone
├── Telegram
├── Mobile PWA dashboard
├── GitHub Mobile / Safari
└── ChatGPT / Codex Cloud
        │
        ▼
Controller VPS
├── FastAPI API
├── Telegram webhook gateway
├── Hermes adapter
├── Task engine
├── Policy engine
├── Model router
├── Project registry
├── Knowledge system
├── Skill registry
├── Secret vault
├── Cost manager
├── Audit system
├── Backup manager
└── External integration adapters
        ├── GitHub
        ├── Codex Cloud adapter
        ├── GitHub Codespaces
        ├── Codex CLI worker
        ├── Free / cheap LLM provider
        ├── On-demand browser worker
        ├── TradingView assisted workflow
        └── Backup storage
```

## Locked Version 1 decisions

- TradingView mode defaults to assisted operation only. Do not mass automate TradingView, scrape market data, bypass CAPTCHA, evade browser detection, rotate proxies/fingerprints, run parallel TradingView sessions, or retry after security warnings.
- Codex Cloud is optional. Routing order is Codex Cloud capability, Codespace + Codex CLI, open-model coding fallback, then pause and notify operator.
- Version 1 identity is one administrator account with passkey authentication, password + TOTP fallback, recovery codes, device/session revocation, and Telegram numeric user allowlist.
- Version 1 database is SQLite in WAL mode with transactional task claims and migration abstraction. PostgreSQL is later-only.
- Version 1 event system is a database-backed queue plus internal async event bus. NATS/JetStream is later-only.
- Version 1 browser is a narrow Playwright-based on-demand worker with touch-friendly remote viewing. WebRTC is preferred only if benchmarked successfully; noVNC is fallback.
- Never store real secrets in Markdown, Git, Telegram, Codex prompts, Hermes memory, support bundles, or logs. Never expose the secret vault to Codex or Hermes.
- Paid AI fallback defaults to disabled and must never be silently enabled.
- Version 1 production target is an x86_64 Hetzner Cloud instance on Ubuntu 24.04 LTS using Docker Compose only.

## Frozen Version 1 technology stack

### Frontend

React, TypeScript, Vite, Tailwind CSS, selective shadcn/ui, TanStack Query, Zod, PWA plugin, Telegram Mini App adapter, Vitest, React Testing Library, and Playwright mobile end-to-end tests.

### Backend

Python 3.12, FastAPI, Pydantic, SQLAlchemy, Alembic, SQLite in WAL mode, aiogram or python-telegram-bot after ADR selection, Server-Sent Events for ordinary task updates, WebSocket only where interactive browser control requires it, and pytest.

### Infrastructure

Ubuntu 24.04 LTS, Docker Compose, Caddy reverse proxy, HTTPS, Hetzner firewall, structured JSON logs, and off-server encrypted backups.

Codex may change a listed library only by documenting the incompatibility or measured benefit, creating an ADR, updating the dependency graph, and receiving approval before implementation.

## Release order

```text
Release -2  Mobile framework
Release -1  Guided installation
Release 0   Operations foundation
Release 1   Fast Telegram MVP
Release 1A  Jarvis PWA and Telegram Mini App
Release 2   Hermes and model routing
Release 3   GitHub and Codex
Release 4   Codespaces
Release 5   Browser prototype
Release 6   Assisted TradingView
Release 7   Trading analytics
Release 8   Knowledge and skills
Release 9   Production hardening
```

Codex must stop after each release, run all tests, produce a completion report, and wait for operator approval before the next release.

## MVP

```text
Telegram receives text/file
→ immediate acknowledgement
→ select project
→ create durable task
→ dispatch one Codex job
→ run tests
→ return summary/files
→ stop Codespace automatically
```

Nothing else may delay the MVP.

## Release -2 scope for this repository task

This initial task creates only repository scaffolding, governance documentation, release-gate evidence, validation scripts, and placeholders needed to track empty directories. It does not implement runtime services, deployment, Telegram integrations, Codex dispatch, Hermes routing, browser automation, TradingView workflow, secret vaults, paid APIs, or production endpoints.

## Final repository layout

```text
helix-command-core/
├── apps/
│   ├── controller-api/
│   ├── command-interface/
│   │   ├── pwa/
│   │   ├── telegram-mini-app/
│   │   └── shared-ui/
│   ├── telegram-gateway/
│   └── worker/
├── design-system/
│   ├── tokens/
│   ├── components/
│   ├── accessibility/
│   └── motion/
├── core/
├── plugins/
├── knowledge/
├── policies/
├── evaluations/
├── deployment/
├── docs/
│   ├── adr/
│   ├── interface/
│   └── mobile/
├── AGENTS.md
├── BUILD_MANIFEST.json
├── ROADMAP.md
├── docker-compose.yml
├── .env.example
└── SETUP_FROM_IPHONE.md
```

## Final Codex rules

Codex must build in release order, stop after each release, run all tests, produce a completion report, wait for approval before next release, never expose secrets, never silently enable paid APIs, never push directly to main, never deploy without approval, never run uploaded code on the controller VPS, never automate TradingView beyond assisted mode, never add roadmap features early, never mark placeholders complete, always update build manifest/ADRs/docs/changelog, always preserve rollback, and always optimize for iPhone operation.
