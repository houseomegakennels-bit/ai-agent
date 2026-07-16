import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readinessSource = readFileSync('core/readiness/contracts/goLiveReadinessContract.ts', 'utf8');
const secretSource = readFileSync('core/readiness/contracts/secretEnvironmentWiringContract.ts', 'utf8');
const readinessDoc = readFileSync('docs/go-live/production-readiness-plan.md', 'utf8');
const secretDoc = readFileSync('docs/go-live/secret-environment-wiring.md', 'utf8');

test('Release 23 readiness plan blocks production until operator gates are complete', () => {
  assert.match(readinessSource, /goLiveReadinessGates/);
  assert.match(readinessSource, /blocksGoLive: true/);
  assert.match(readinessSource, /not_ready/);
  assert.match(readinessDoc, /not ready for production launch/i);
  assert.match(readinessDoc, /No agent may deploy/);
});

test('Release 24 secret wiring contract is placeholder-only and runtime-only', () => {
  assert.match(secretSource, /placeholder_only/);
  assert.match(secretSource, /mayCommitValue: false/);
  assert.match(secretSource, /runtimeOnly: true/);
  assert.match(secretDoc, /must never be committed/);
  assert.doesNotMatch(secretDoc, /[0-9]{1,3}(\.[0-9]{1,3}){3}|https?:\/\/[^`\s)]+/i);
});
