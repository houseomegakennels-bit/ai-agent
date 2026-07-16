# Release -1 — Guided Installation

## Purpose

Release -1 defines the phone-first guided installation experience. It does not connect real providers, deploy production infrastructure, or collect secrets.

## Required setup flow

1. Create administrator account.
2. Register passkey.
3. Configure TOTP fallback.
4. Save and verify recovery codes.
5. Prepare offline vault recovery-key flow.
6. Connect Telegram in a future connector screen.
7. Verify Telegram webhook in a future connector screen.
8. Connect GitHub in a future connector screen.
9. Test repository permissions in a future connector screen.
10. Test Codespaces permissions in a future connector screen.
11. Test Codex Cloud capability in a future connector screen.
12. Connect free model provider in a future connector screen.
13. Configure budgets.
14. Configure backup storage.
15. Verify external uptime monitor.
16. Launch browser prototype in a later release.
17. Test secure browser takeover in a later release.
18. Run final diagnostics.
19. Complete first end-to-end task in a later release.

## Phone-first rules

Every setup step must show what the operator is doing, why it is required, where to tap, expected difficulty, what happens next, common mistakes, retry, back, skip if optional, I’m Stuck, and What’s Next.

## Verification rule

The system must verify each step instead of asking the operator to self-confirm. Until connectors exist, Release -1 records verification contracts and blocks runtime claims.

## Out of scope

- Runtime Telegram bot.
- Real GitHub connector.
- Real Codex Cloud connector.
- Real Codespaces control.
- Secret vault implementation.
- Production deployment.
- Browser worker.
- TradingView workflow.
