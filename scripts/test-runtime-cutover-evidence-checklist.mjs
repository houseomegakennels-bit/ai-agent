import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/runtimeCutoverEvidenceChecklistContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/runtime-cutover-evidence-checklist.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 32 runtime cutover evidence checklist maps each runbook precondition to redacted proof', () => {
  assert.match(contractSource, /runtimeCutoverEvidenceItems/);
  assert.match(contractSource, /operator-runtime-approval/);
  assert.match(contractSource, /runtime-secret-injection-proof/);
  assert.match(contractSource, /deployment-target-proof/);
  assert.match(contractSource, /rollback-proof/);
  assert.match(contractSource, /telegram-cutover-proof/);
  assert.match(contractSource, /paid-api-budget-proof/);
  assert.match(contractSource, /REDACTED_OPERATOR_RUNTIME_APPROVAL_REFERENCE/);
  assert.match(contractSource, /REDACTED_RUNTIME_SECRET_PROOF_REFERENCE/);
  assert.match(contractSource, /REDACTED_DEPLOYMENT_TARGET_REFERENCE/);
  assert.match(contractSource, /REDACTED_ROLLBACK_PROOF_REFERENCE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_CUTOVER_REFERENCE/);
  assert.match(contractSource, /REDACTED_BUDGET_APPROVAL_REFERENCE/);
});

test('Release 32 checklist remains evidence-only and cannot start deployment', () => {
  assert.match(contractSource, /status: 'evidence_checklist_only_not_live'/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationRequired: true/);
  assert.match(contractSource, /allEvidenceSatisfied: false/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 32 docs and manifest keep evidence checklist non-live', () => {
  assert.match(docSource, /redacted evidence checklist only, not live/i);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Runtime implementation release required: yes/);
  assert.match(docSource, /Store sensitive proof outside Git/);
  assert.match(manifestSource, /runtime_cutover_evidence_checklist/);
  assert.match(manifestSource, /redacted_evidence_checklist_contract_only/);
});
