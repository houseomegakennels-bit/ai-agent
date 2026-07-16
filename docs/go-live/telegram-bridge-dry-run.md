# Telegram Bridge Dry-Run Contract — Release 26

Status: local fixture dry-run only, not live.

## Purpose

This document defines how Telegram bridge behavior can be reviewed with local transcript fixtures before any future production bot is enabled.

## What this release does

- Uses local transcript fixtures only.
- Previews acknowledgement, local task preview, and project-selection behavior.
- Keeps token reads disabled.
- Keeps chat ID reads disabled.
- Keeps live endpoint contact disabled.
- Keeps deployment changes disabled.

## What remains forbidden

- No production bot token.
- No real chat ID.
- No webhook URL.
- No live endpoint.
- No server IP.
- No secret values in Markdown, logs, prompts, Telegram, or support bundles.

## Future gate

A future release may only implement runtime Telegram bridge behavior after explicit operator approval, external runtime secret provisioning, redacted evidence, and rollback instructions.
