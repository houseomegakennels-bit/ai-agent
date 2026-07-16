import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/deploymentPreviewContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/deployment-preview-checklist.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 27 deployment preview contract keeps target metadata redacted and local-only', () => {
  assert.match(contractSource, /deploymentPreviewTarget/);
  assert.match(contractSource, /REDACTED_CONTROLLER_TARGET/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /liveUrlIncluded: false/);
  assert.match(contractSource, /secretIncluded: false/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /productionTrafficAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 27 docs and manifest keep deployment preview non-live', () => {
  assert.match(docSource, /not deployed/i);
  assert.match(docSource, /Server IP included: no/);
  assert.match(docSource, /Live URL included: no/);
  assert.match(docSource, /No production deployment/);
  assert.match(manifestSource, /deployment_preview/);
});
