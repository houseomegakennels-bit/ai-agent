import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/localDeploymentPackagePreviewContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/local-deployment-package-preview.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 34 local deployment package preview references Release 33 boundary items', () => {
  assert.match(contractSource, /localDeploymentPackagePreviewItems/);
  assert.match(contractSource, /runtime-entrypoint-shape/);
  assert.match(contractSource, /environment-contract-shape/);
  assert.match(contractSource, /dry-run-package-layout/);
  assert.match(contractSource, /runtime-observability-shape/);
  assert.match(contractSource, /operator-cutover-approval-gate/);
  assert.match(contractSource, /REDACTED_LOCAL_PREVIEW_RUNTIME_README_REFERENCE/);
  assert.match(contractSource, /REDACTED_LOCAL_PREVIEW_ENV_EXAMPLE_REFERENCE/);
  assert.match(contractSource, /REDACTED_LOCAL_PREVIEW_PACKAGE_LAYOUT_REFERENCE/);
  assert.match(contractSource, /REDACTED_LOCAL_PREVIEW_OBSERVABILITY_REFERENCE/);
  assert.match(contractSource, /REDACTED_LOCAL_PREVIEW_CUTOVER_GATES_REFERENCE/);
});

test('Release 34 preview cannot create deployment automation or start runtime work', () => {
  assert.match(contractSource, /status: 'local_only_preview_not_deployable'/);
  assert.match(contractSource, /runtimeServicesImplemented: false/);
  assert.match(contractSource, /deploymentAutomationCreated: false/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 34 docs and manifest keep local deployment package preview non-live', () => {
  assert.match(docSource, /local-only package preview, not deployable/i);
  assert.match(docSource, /Deployment automation created: no/);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(docSource, /Commands that start, mutate, probe, or validate live infrastructure/);
  assert.match(manifestSource, /local_deployment_package_preview/);
  assert.match(manifestSource, /local_preview_contract_only/);
});
