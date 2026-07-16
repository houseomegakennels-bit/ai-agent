import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/runtimeCutoverRunbookTemplateContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/runtime-cutover-runbook-template.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 31 runtime cutover runbook defines redacted preconditions only', () => {
  assert.match(contractSource, /runtimeCutoverPreconditions/);
  assert.match(contractSource, /operator-runtime-approval/);
  assert.match(contractSource, /runtime-secret-injection-proof/);
  assert.match(contractSource, /deployment-target-proof/);
  assert.match(contractSource, /rollback-proof/);
  assert.match(contractSource, /telegram-cutover-proof/);
  assert.match(contractSource, /paid-api-budget-proof/);
  assert.match(contractSource, /REDACTED_/);
  assert.match(contractSource, /buildRuntimeCutoverRunbookTemplate/);
});

test('Release 31 runtime cutover runbook cannot start deployment', () => {
  assert.match(contractSource, /status: 'template_only_not_live'/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 31 docs and manifest keep runbook template non-live', () => {
  assert.match(docSource, /template only, not live/i);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Runtime implementation release required: yes/);
  assert.match(manifestSource, /runtime_cutover_runbook_template/);
});
