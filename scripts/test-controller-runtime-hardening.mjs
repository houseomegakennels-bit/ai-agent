import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/controllerRuntimeHardeningContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/controller-runtime-hardening.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 25 controller runtime hardening contract remains a dry-run proof', () => {
  assert.match(contractSource, /controllerRuntimeHardeningChecklist/);
  assert.match(contractSource, /buildControllerRuntimeDryRunProof/);
  assert.match(contractSource, /serverStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /productionTrafficAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|uvicorn|FastAPI\(|requests\.|httpx\.|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 25 docs and manifest keep controller hardening non-live', () => {
  assert.match(docSource, /dry-run proof only, not live/i);
  assert.match(docSource, /Server started: no/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Secret value included: no/);
  assert.match(manifestSource, /controller_runtime_hardening/);
});
