# Release 7 — Trading Analytics

## Purpose

Release 7 defines trading analytics contracts for official TradingView export parsing, metrics, equity curves, drawdowns, session/weekday/monthly analysis, long/short comparisons, overfitting signals, prop-rule simulations, strategy comparisons, and reports.

## Built as contracts

- Parse TradingView export.
- Calculate backtest metrics.
- Calculate equity curve.
- Calculate drawdowns.
- Analyze session performance.
- Analyze weekday performance.
- Analyze monthly performance.
- Compare long/short performance.
- Detect overfitting signals.
- Simulate prop rules.
- Compare strategy versions.
- Build trading report.

## Evidence boundary

No metric may be reported without an official export or operator-provided evidence package. Missing or malformed exports must fail closed.

## Out of scope

- No live trading.
- No broker integration.
- No TradingView scraping.
- No fabricated backtest results.
- No prop eligibility claim without official rules.
