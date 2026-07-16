import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const lifecycle = readFileSync('plugins/codespaces/contracts/codespacesLifecycleContract.ts', 'utf8');
const budget = readFileSync('plugins/codespaces/contracts/codespaceBudgetContract.ts', 'utf8');
const docs = readFileSync('docs/codespaces/release-4-codespaces.md', 'utf8');

test('Release 4 Codespaces lifecycle includes start, stop, monitor, orphan cleanup, storage cleanup, and stalled recovery', () => {
  for (const expected of ['start-safe-codespace', 'stop-codespace', 'monitor-runtime', 'cleanup-orphans', 'cleanup-storage', 'recover-stalled-task']) {
    assert.match(lifecycle, new RegExp(expected));
  }
});

test('Codespaces contracts remain runtime-free and do not allow credentials in repo', () => {
  assert.match(lifecycle, /realCredentialInRepoAllowed: false/g);
  assert.match(lifecycle, /implementedRuntime: false/g);
  assert.match(lifecycle, /allCodespaceContractsAreRuntimeFree/);
});

test('Codespaces budget contract has fixed ceiling and agent cannot increase it', () => {
  assert.match(budget, /monthlyUsdCeiling: 15/);
  assert.match(budget, /warningThresholdsPercent: \[50, 75, 90\]/);
  assert.match(budget, /agentCanIncreaseBudget: false/);
});

test('Release 4 docs forbid real Codespace starts and credentials', () => {
  assert.match(docs, /No real Codespace is started/);
  assert.match(docs, /No GitHub or Codespaces credentials/);
});
