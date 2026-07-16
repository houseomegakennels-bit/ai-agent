# Release 5 — Browser Prototype

## Purpose

Release 5 defines the on-demand browser worker, secure mobile takeover, touch/keyboard/clipboard, reconnect, screenshot, download, security pause, trace, and termination contracts.

## Built as contracts

- Start on-demand browser.
- Restore browser profile placeholder.
- Verify browser health.
- Open secure mobile takeover.
- Support touch, keyboard, and clipboard.
- Reconnect after mobile network interruption.
- Capture screenshot for evidence.
- Manage downloads as untrusted files.
- Pause on CAPTCHA, login, or security warning.
- Create browser trace.
- Terminate browser session and cleanup temporary files.

## Security boundaries

No browser worker is started. No public browser-control port is exposed. No Docker socket is exposed. No secrets are mounted into a browser. No CAPTCHA bypass, proxy rotation, fingerprint evasion, or parallel TradingView sessions are allowed.

## TradingView boundary

No TradingView automation is implemented. Future TradingView work remains assisted mode only unless a later approved high-risk mode is explicitly added.
