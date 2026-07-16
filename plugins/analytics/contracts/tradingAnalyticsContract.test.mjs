import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const analytics = readFileSync('plugins/analytics/contracts/tradingAnalyticsContract.ts', 'utf8');
const prop = readFileSync('plugins/analytics/contracts/propRuleContract.ts', 'utf8');
const docs = readFileSync('docs/analytics/release-7-trading-analytics.md', 'utf8');

test('Release 7 analytics includes parsing, metrics, curves, drawdowns, performance splits, prop rules, comparisons, and reports', () => {
  for (const expected of ['parse-tradingview-export', 'calculate-backtest-metrics', 'calculate-equity-curve', 'calculate-drawdowns', 'analyze-session-performance', 'simulate-prop-rules', 'compare-strategy-versions', 'build-trading-report']) {
    assert.match(analytics, new RegExp(expected));
  }
});

test('analytics contracts require official evidence and forbid fabricated results or execution', () => {
  assert.match(analytics, /requiresOfficialExport: true/g);
  assert.match(analytics, /fabricatedResultsAllowed: false/g);
  assert.match(analytics, /tradingExecutionAllowed: false/g);
});

test('prop rule contract requires official rules and cannot declare eligibility without them', () => {
  assert.match(prop, /officialRulesSourceRequired: true/);
  assert.match(prop, /canDeclarePropEligibilityWithoutRules: false/);
});

test('Release 7 docs forbid results without official exports', () => {
  assert.match(docs, /No metric may be reported without an official export/);
  assert.match(docs, /No live trading/);
});
