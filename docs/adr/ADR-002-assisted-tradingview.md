# ADR-002 — Assisted TradingView mode only

## Status

Accepted by master specification; implementation not started.

## Decision

TradingView operation defaults to assisted mode through a secure remote browser controlled by the operator.

## Constraints

The system must not mass automate TradingView, scrape market data, bypass CAPTCHA, evade browser detection, rotate proxies or fingerprints, run parallel TradingView sessions, or retry after TradingView security warnings.
