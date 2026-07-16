import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const assisted = readFileSync('plugins/tradingview/contracts/assistedTradingViewContract.ts', 'utf8');
const pine = readFileSync('plugins/pine/contracts/pineReviewContract.ts', 'utf8');
const evidence = readFileSync('plugins/tradingview/contracts/backtestEvidenceContract.ts', 'utf8');
const docs = readFileSync('docs/tradingview/release-6-assisted-tradingview.md', 'utf8');

test('Release 6 includes Pine review, approval, manifest, checklist, exports, validation, and evidence packaging', () => {
  for (const expected of ['review-pine-script', 'require-repair-approval', 'create-backtest-manifest', 'display-mobile-checklist', 'collect-official-exports', 'validate-evidence', 'package-evidence']) {
    assert.match(assisted, new RegExp(expected));
  }
});

test('Release 6 forbids TradingView automation and real credentials', () => {
  assert.match(assisted, /tradingViewAutomationAllowed: false/g);
  assert.match(assisted, /realCredentialInRepoAllowed: false/g);
  assert.match(assisted, /implementedRuntime: false/g);
});

test('Pine review contract requires approval and forbids compile claims without evidence', () => {
  assert.match(pine, /repairRequiresApproval: true/);
  assert.match(pine, /claimTradingViewCompileWithoutEvidence: false/);
});

test('Backtest evidence contract requires official exports and forbids fabricated results', () => {
  assert.match(evidence, /officialExportsRequired: true/);
  assert.match(evidence, /userObservedResultsRequired: true/);
  assert.match(evidence, /fabricatedResultsAllowed: false/);
});

test('Release 6 docs keep automation out of scope', () => {
  assert.match(docs, /No automated TradingView operation/);
  assert.match(docs, /No TradingView credentials/);
});
