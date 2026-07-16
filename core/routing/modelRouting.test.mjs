import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const routing = readFileSync('core/routing/modelRouting.ts', 'utf8');
const hermes = readFileSync('plugins/hermes/contracts/hermesAdapterContract.ts', 'utf8');
const docs = readFileSync('docs/routing/release-2-hermes-and-routing.md', 'utf8');

test('Release 2 routing defines deterministic/free/Codex/pause routes', () => {
  for (const route of ['no-ai-deterministic', 'free-model', 'codex-cloud', 'codex-cli-codespace', 'pause-for-operator']) {
    assert.match(routing, new RegExp(route));
  }
});

test('paid fallback remains disabled for every route', () => {
  assert.match(routing, /paidApiAllowed: false/g);
  assert.match(routing, /paidFallbackIsDisabled/);
});

test('route order prefers deterministic then free then Codex then pause', () => {
  assert.match(routing, /if \(capabilities\.deterministic\) return 'no-ai-deterministic'/);
  assert.match(routing, /if \(capabilities\.freeModelHealthy\) return 'free-model'/);
  assert.match(routing, /if \(capabilities\.codexCloudAvailable\) return 'codex-cloud'/);
  assert.match(routing, /return 'pause-for-operator'/);
});

test('Hermes contract cannot receive secrets, approve, raise budgets, or bypass policy', () => {
  assert.match(hermes, /receivesSecretValues: false/);
  assert.match(hermes, /canApproveActions: false/);
  assert.match(hermes, /canRaiseBudget: false/);
  assert.match(hermes, /canBypassPolicy: false/);
});

test('Release 2 docs forbid paid APIs and runtime connectors', () => {
  assert.match(docs, /Do not enable paid APIs/);
  assert.match(docs, /No runtime Hermes process/);
});
