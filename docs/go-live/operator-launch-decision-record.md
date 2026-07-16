# Operator launch decision record

Status: redacted decision record only, not live.

Release 30 defines how the operator can record a go, no-go, or defer decision after reviewing the Release 29 final preflight evidence bundle. This record is source-level review metadata only. It does not approve runtime launch, start deployment, contact infrastructure, reveal controller targets, enable Telegram runtime, enable paid APIs, or enable broker or trading integrations.

## Allowed decisions

- `go_redacted_approval_only`: operator approval is captured as redacted metadata only; a separate runtime release is still required before launch.
- `no_go_blocked`: launch remains blocked.
- `defer_pending_evidence`: launch review pauses until redacted evidence is corrected or completed.

## Required evidence reference

- Evidence bundle: `release-29-final-preflight-evidence-bundle`
- Source document: `docs/go-live/final-preflight-evidence-bundle.md`
- Release handoff: `docs/release-results/release-29/RELEASE_REPORT.md`

## Safety state

- Runtime launch approved: no
- Deployment started: no
- Live endpoint contacted: no
- Server IP included: no
- Secret value included: no
- Telegram production bot enabled: no
- Paid API enabled: no
- Broker integration enabled: no
- Trading integration enabled: no
- Separate runtime release required: yes

## Redaction rules

1. Record only a redacted operator reference, never a real account identifier, token, chat ID, webhook secret, server IP, live URL, broker credential, or model-provider key.
2. Keep decision notes short and free of operational target details.
3. Treat a `go_redacted_approval_only` decision as approval to plan the next release, not permission to deploy.
4. Continue to block runtime cutover until separate deployment, secret, rollback, Telegram, and budget evidence is approved outside Git.
