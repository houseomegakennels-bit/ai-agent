import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/runtimeImplementationBoundaryContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/runtime-implementation-boundary.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 33 runtime implementation boundary defines dry-run package items only', () => {
  assert.match(contractSource, /runtimeImplementationBoundaryPackage/);
  assert.match(contractSource, /runtime-entrypoint-shape/);
  assert.match(contractSource, /environment-contract-shape/);
  assert.match(contractSource, /dry-run-package-layout/);
  assert.match(contractSource, /runtime-observability-shape/);
  assert.match(contractSource, /operator-cutover-approval-gate/);
  assert.match(contractSource, /REDACTED_RUNTIME_ENTRYPOINT_SHAPE_REFERENCE/);
  assert.match(contractSource, /REDACTED_RUNTIME_ENVIRONMENT_CONTRACT_REFERENCE/);
  assert.match(contractSource, /REDACTED_DRY_RUN_PACKAGE_LAYOUT_REFERENCE/);
  assert.match(contractSource, /REDACTED_RUNTIME_OBSERVABILITY_SHAPE_REFERENCE/);
  assert.match(contractSource, /REDACTED_OPERATOR_RUNTIME_APPROVAL_GATE_REFERENCE/);
});

test('Release 33 boundary cannot implement or deploy runtime services', () => {
  assert.match(contractSource, /status: 'boundary_and_dry_run_package_only_not_live'/);
  assert.match(contractSource, /runtimeServicesImplemented: false/);
  assert.match(contractSource, /deploymentStarted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotEnabled: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|systemctl|pm2\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 33 docs and manifest keep implementation boundary non-live', () => {
  assert.match(docSource, /boundary and dry-run package structure only, not live/i);
  assert.match(docSource, /Runtime services implemented: no/);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(docSource, /Running commands that start, mutate, probe, or validate live infrastructure/);
  assert.match(manifestSource, /runtime_implementation_boundary/);
  assert.match(manifestSource, /dry_run_boundary_contract_only/);
});
