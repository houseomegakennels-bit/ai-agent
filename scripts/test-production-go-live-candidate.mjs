import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/productionGoLiveCandidateContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/production-go-live-candidate.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 28 go-live candidate aggregates blocking gates without launching', () => {
  assert.match(contractSource, /productionGoLiveCandidateGates/);
  assert.match(contractSource, /operator-final-approval/);
  assert.match(contractSource, /runtime-secret-injection/);
  assert.match(contractSource, /telegram-runtime-cutover/);
  assert.match(contractSource, /controller-deploy-cutover/);
  assert.match(contractSource, /launchApproved: false/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 28 docs and manifest keep go-live candidate non-live', () => {
  assert.match(docSource, /candidate checklist only, not live/i);
  assert.match(docSource, /does \*\*not\*\* launch production/);
  assert.match(docSource, /Final operator go-live approval is required/);
  assert.match(docSource, /Deployment started: no/);
  assert.match(manifestSource, /production_go_live_candidate/);
});
