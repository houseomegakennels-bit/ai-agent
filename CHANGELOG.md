# Changelog

## Unreleased

- Complete Release 8 knowledge and skills contracts, prompt/ADR boundaries, tests, docs, and handoff package.
- Complete Release 7 trading analytics contracts, prop-rule boundaries, tests, docs, and handoff package.
- Complete Release 6 assisted TradingView contracts, Pine review boundaries, evidence rules, tests, docs, and handoff package.
- Complete Release 5 browser prototype contracts, security boundaries, tests, docs, and handoff package.
- Complete Release 4 Codespaces lifecycle, budget, cleanup, tests, docs, and handoff package.
- Complete Release 3 GitHub and Codex contracts, evaluations, tests, docs, and handoff package.
- Complete Release 2 Hermes and model-routing contracts, tests, docs, and handoff package.
- Complete Release 1A Jarvis PWA and Telegram Mini App contracts, tests, docs, and handoff package.
- Complete Release 1 Fast Telegram MVP contracts, durable task lifecycle, tests, and handoff package.
- Complete Release 0 operations foundation contracts, documentation, tests, and handoff package.
- Complete Release -1 guided installation contracts, stuck workflow, explainability docs, tests, and handoff package.
- Complete Release -2 mobile framework scaffold with shared command-interface shell, design tokens, tests, and handoff docs.
- Record operator approval of all remaining initial scaffold gates blocking Release -2.
- Record operator approval of the initial scaffold review gate.
- Initialize Blackspire Helix Command Core scaffold.

## Release 39 — Production audit and evidence retention review contract

- Approved Release 38 and added production audit and evidence retention review contracts.
- Defined redacted evidence placeholders for audit log redaction policy, operator evidence retention schedule, support bundle redaction checklist, audit access review, and evidence deletion proof without reading live logs or accessing production storage.
- Added deterministic Release 39 test coverage and handoff evidence while keeping raw logs, support bundles, production URLs, server IPs, account IDs, tokens, secrets, paid APIs, brokers, and trading integrations disabled.

## Release 38 — Operator production incident response drill contract

- Approved Release 37 and added iPhone-first operator production incident response drill contracts.
- Defined redacted evidence placeholders for incident intake, escalation path, service degradation triage, Emergency Stop confirmation, and post-incident handoff without executing live incident actions.
- Added deterministic Release 38 test coverage and handoff evidence while keeping live endpoints, production URLs, server IPs, phone numbers, chat IDs, tokens, secrets, paid APIs, brokers, and trading integrations disabled.

## Release 37 — Production health/readiness smoke-test contract

- Approved Release 36 and added production health/readiness smoke-test contracts.
- Defined redacted fixtures for controller health, controller readiness, Telegram webhook health, operator mobile smoke proof, and rollback health gate evidence without contacting live endpoints.
- Added deterministic Release 37 test coverage and handoff evidence while keeping production URLs, server IPs, bot tokens, webhook secrets, live response payloads, paid APIs, brokers, and trading integrations disabled.

## Release 36 — Telegram production cutover dry-run

- Approved Release 35 and added Telegram production cutover dry-run checklist contracts.
- Defined redacted artifacts for operator approval, bot secret proof, webhook shape, allowed chat proof, and Telegram rollback references without connecting production Telegram runtime.
- Added deterministic Release 36 test coverage and handoff evidence while keeping bot tokens, webhook secrets, chat IDs, live endpoints, server IPs, paid APIs, brokers, and trading integrations disabled.

## Release 35 — Rollback and restore dry-run evidence

- Approved Release 34 and added rollback and restore dry-run evidence contracts.
- Referenced Release 34 local deployment package preview items with redacted evidence placeholders for rollback plan, restore proof, emergency stop, observability recovery, and operator rollback approval.
- Added deterministic Release 35 test coverage and handoff evidence while keeping infrastructure commands, runtime services, deployment automation, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 34 — Local deployment package preview

- Approved Release 33 and added a local-only deployment package preview contract.
- Referenced Release 33 runtime boundary items with redacted local preview artifacts for runtime README, environment example, package layout, observability contract, and cutover gates.
- Added deterministic Release 34 test coverage and handoff evidence while keeping runtime services, deployment automation, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 33 — Runtime implementation boundary

- Approved Release 32 and added a runtime implementation boundary contract.
- Defined a dry-run package structure for future runtime entrypoint, environment contract, package layout, observability, cutover gates, and rollback references without executable deployment artifacts.
- Added deterministic Release 33 test coverage and handoff evidence while keeping runtime services, deployment, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 32 — Runtime cutover evidence checklist

- Approved Release 31 and added a redacted runtime cutover evidence checklist contract.
- Mapped each runtime cutover runbook precondition to a required redacted proof placeholder stored outside Git when sensitive.
- Added deterministic Release 32 test coverage and handoff evidence while keeping deployment, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 31 — Runtime cutover runbook template

- Approved Release 30 and added a redacted runtime cutover runbook template contract.
- Added explicit preconditions for operator runtime approval, runtime-only secret proof, redacted deployment target proof, rollback proof, Telegram cutover proof, and paid API budget approval.
- Added deterministic Release 31 test coverage and handoff evidence while keeping deployment, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 30 — Operator launch decision record

- Approved Release 29 and added a redacted operator launch decision record contract.
- Added go/no-go/defer decision states that reference the Release 29 final preflight evidence bundle without approving runtime launch.
- Added deterministic Release 30 test coverage and handoff evidence while keeping deployment, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 29 — Final preflight evidence bundle

- Approved Release 28 and added a final preflight evidence bundle contract for operator review.
- Packaged redacted readiness report references for production readiness, secret wiring, controller hardening, Telegram dry-run, deployment preview, and go-live candidate checks.
- Added deterministic Release 29 test coverage and handoff evidence while keeping launch, deployment, live endpoints, secrets, Telegram runtime, paid APIs, brokers, and trading integrations disabled.

## Release 28 — Production go-live candidate checklist

- Approved Release 27 and added a production go-live candidate contract that aggregates launch blockers.
- Added explicit gates for final operator approval, runtime secret injection, Telegram runtime cutover, controller deployment/rollback proof, and paid API controls.
- Added deterministic Release 28 test coverage and handoff evidence while keeping launch, deployment, live endpoints, secrets, and Telegram runtime disabled.

## Release 27 — Deployment preview checklist

- Approved Release 26 and added a redacted deployment preview contract.
- Added local-only smoke-test evidence for static build, environment validation, secret scan, and operator cutover gating.
- Added deterministic Release 27 test coverage and handoff evidence while keeping production deployment, live URLs, server IPs, secrets, and Telegram runtime disabled.

## Release 26 — Telegram bridge dry-run fixtures

- Approved Release 25 and added a placeholder-only Telegram bridge dry-run contract.
- Added local transcript fixtures for acknowledgement, local task preview, and project-selection behavior without reading tokens, chat IDs, live endpoints, or deployment settings.
- Added deterministic Release 26 test coverage and handoff evidence while keeping production Telegram runtime disabled.

## Release 25 — Controller runtime hardening dry-run proof

- Approved Release 24 and added a controller runtime hardening checklist contract.
- Added a source-level dry-run health/readiness proof that does not start a server, contact live endpoints, include server IPs, expose secrets, or allow production traffic.
- Added deterministic Release 25 test coverage and handoff evidence while keeping deployment and Telegram runtime disabled.

## Release 22 — Local task export/share preview

- Approved Release 21 and added a local-only export/share package contract for in-memory mock tasks.
- Connected the command-interface to export/share preview formats with loading, empty, validation, and error examples.
- Added deterministic Release 22 test coverage and handoff evidence without persistence, live endpoints, secrets, paid APIs, deployments, server IPs, Telegram production bots, or trading integrations.

## Release 23 — Production readiness plan

- Added a planning-only go-live readiness contract and production readiness plan.
- Recorded explicit operator, runtime-secret, Telegram bridge, controller deployment, rollback, and paid-API gates that continue to block launch.
- Kept production deployment, live URLs, server IPs, real secrets, and Telegram runtime out of scope.

## Release 24 — Secret and environment wiring contract

- Added a placeholder-only secret/environment wiring contract for future runtime values.
- Documented runtime-only handling rules for Telegram, controller URL, and future GitHub app values without committing real values.
- Added deterministic Release 24 test coverage while keeping the project not live and blocked by operator gates.

## Release 9 — Production Hardening

- Added production hardening contracts for restore drills, failure simulations, migration safety, dependency scans, security review, preview deploys, rollback validation, and production acceptance.
- Added Release 9 handoff evidence and validation coverage while keeping production deployment, real secrets, and live infrastructure out of scope.

## Release 10 — Local Controller API Prototype

- Added local-only FastAPI controller API scaffold with `/health` and `/ready` endpoints.
- Added typed health response contract, dependency-free controller API source tests, and Release 10 handoff package.
- Kept production deployment, real secrets, live endpoints, paid APIs, production Telegram bot, server IPs, and trading integrations out of scope.

## Release 11 — Local Controller API Connection

- Added local controller API client contract and mock health/readiness adapter for the mobile command interface.
- Updated the command-interface status panel to read mock/local controller API state and display offline/error-safe messaging.
- Added Release 11 tests and handoff package while keeping real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 12 — Local Task Model and Mock Task List

- Added a safe local task model contract and mock task list data.
- Connected the command-interface to the mock task list with task state display and empty/loading/error view builders.
- Added Release 12 tests and handoff package while keeping persistence, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 13 — Local In-Memory Task Creation

- Added a local task creation contract with validation and explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface create-task section wired to mock in-memory task creation, success feedback, and validation feedback.
- Added Release 13 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 14 — Local In-Memory Task Updates

- Added a local task update contract with allowed mock actions and explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface task update adapter and mobile task action controls for success, validation, and not-found feedback.
- Added Release 14 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 15 — Local In-Memory Task Filtering and Grouping

- Added a local task filter/grouping contract with attention, active, done, and failed buckets plus explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface grouping adapter and mobile filter/group sections for ready, empty, validation, loading, and error states.
- Added Release 15 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 16 — Local Task Detail Preview and Audit Trail

- Added a local task detail/audit contract with read-only mock task detail, local validation, and explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface detail adapter and mobile task detail/audit section with ready, loading, validation, not-found, and error states.
- Added Release 16 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.


## Release 17 — Local Task Search and Sort

- Added a local task search/sort contract with safe query validation, mock-only sort options, and explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface search/sort adapter and mobile task search controls with ready, empty, validation, loading, and error states.
- Added Release 17 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 18 — Local Task Bulk-Selection Preview

- Added a local task bulk-selection preview contract with safe mock actions, selected task validation, and explicit no-persistence/no-live-endpoint safety flags.
- Added a command-interface bulk-selection adapter and mobile bulk action controls with ready, empty, validation, not-found, loading, and error states.
- Added Release 18 tests and handoff package while keeping persistent storage, real API calls, secrets, deployment, paid APIs, Telegram runtime, and trading integrations out of scope.

## Release 19 — Local task timeline and daily focus preview

- Approved Release 18 and added a local-only task timeline contract for in-memory mock daily focus buckets.
- Connected the command-interface to daily focus recommendations with grouped loading, empty, validation, and error examples.
- Added deterministic Release 19 test coverage and handoff evidence without persistence, live endpoints, secrets, paid APIs, deployments, server IPs, or trading integrations.

## Release 20 — Local task notes and annotation previews

- Approved Release 19 and added a local-only task notes contract for in-memory mock annotations.
- Connected the command-interface to task note draft/list previews with loading, empty, validation, not-found, and error examples.
- Added deterministic Release 20 test coverage and handoff evidence without persistence, live endpoints, secrets, paid APIs, deployments, server IPs, or trading integrations.

## Release 21 — Local task activity feed and recent-change previews

- Approved Release 20 and added a local-only task activity feed contract for in-memory mock recent changes.
- Connected the command-interface to activity feed previews with loading, empty, validation, and error examples.
- Added deterministic Release 21 test coverage and handoff evidence without persistence, live endpoints, secrets, paid APIs, deployments, server IPs, Telegram production bots, or trading integrations.
