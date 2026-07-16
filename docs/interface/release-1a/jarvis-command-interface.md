# Release 1A — Jarvis PWA and Telegram Mini App

## Purpose

Release 1A expands the shared command-interface contracts for Telegram Mini App mode, PWA standalone mode, and mobile Safari mode.

## Built as contracts

- Launch environments: Telegram Mini App, PWA standalone, and mobile Safari.
- Interface modes: Basic, Advanced, Command, Operations, Trade, and System.
- Emergency Stop visibility contract across every mode.
- Telegram Mini App signed-init-data authentication contract.
- PWA/passkey protection contract placeholder.
- Live update contracts for Server-Sent Events, WebSocket for interactive browser only, and short-polling fallback.
- Voice input/output safety contracts.
- Notification deduplication contract.

## Out of scope

- No production Telegram Mini App deployment.
- No real passkey session runtime.
- No push notification provider connection.
- No WebSocket browser-control runtime.
- No real Telegram bot token, webhook secret, or allowed user ID.
- No live infrastructure.

## Review gate

Release 1A must stop for operator review before Release 2 begins.
