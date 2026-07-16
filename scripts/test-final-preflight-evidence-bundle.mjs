import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/finalPreflightEvidenceBundleContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/final-preflight-evidence-bundle.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 29 final preflight bundle packages redacted evidence only', () => {
  assert.match(contractSource, /finalPreflightEvidenceItems/);
  assert.match(contractSource, /production-readiness-plan/);
  assert.match(contractSource, /secret-environment-wiring/);
  assert.match(contractSource, /controller-runtime-hardening/);
  assert.match(contractSource, /telegram-bridge-dry-run/);
  assert.match(contractSource, /deployment-preview-checklist/);
  assert.match(contractSource, /production-go-live-candidate/);
  assert.match(contractSource, /redacted: true/);
  assert.match(contractSource, /operatorReviewRequired: true/);
  assert.match(contractSource, /buildFinalPreflightEvidenceBundle/);
});

test('Release 29 final preflight bundle remains blocked and non-live', () => {
  assert.match(contractSource, /status: 'blocked_not_live'/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 29 docs and manifest describe redacted operator review only', () => {
  assert.match(docSource, /redacted evidence bundle only, not live/i);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Server IP included: no/);
  assert.match(docSource, /Secret value included: no/);
  assert.match(docSource, /Telegram production bot enabled: no/);
  assert.match(docSource, /Paid API enabled: no/);
  assert.match(docSource, /Operator approval required: yes/);
  assert.match(manifestSource, /final_preflight_evidence_bundle/);
});
