import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/operatorLaunchDecisionRecordContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/operator-launch-decision-record.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 30 decision record supports redacted go no-go and defer decisions', () => {
  assert.match(contractSource, /go_redacted_approval_only/);
  assert.match(contractSource, /no_go_blocked/);
  assert.match(contractSource, /defer_pending_evidence/);
  assert.match(contractSource, /release-29-final-preflight-evidence-bundle/);
  assert.match(contractSource, /buildOperatorLaunchDecisionRecord/);
  assert.match(contractSource, /validateOperatorDecisionInput/);
});

test('Release 30 decision record never starts runtime launch', () => {
  assert.match(contractSource, /launchApprovedForRuntime: false/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeReleaseRequired: true/);
  assert.match(contractSource, /redacted: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 30 docs and manifest keep launch decision non-live', () => {
  assert.match(docSource, /redacted decision record only, not live/i);
  assert.match(docSource, /Runtime launch approved: no/);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Separate runtime release required: yes/);
  assert.match(manifestSource, /operator_launch_decision_record/);
});
