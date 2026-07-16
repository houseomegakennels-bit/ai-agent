import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/rollbackRestoreDryRunEvidenceContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/rollback-restore-dry-run-evidence.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 35 rollback and restore dry-run evidence references Release 34 preview items', () => {
  assert.match(contractSource, /rollbackRestoreDryRunEvidenceItems/);
  assert.match(contractSource, /preview-package-layout/);
  assert.match(contractSource, /preview-env-example/);
  assert.match(contractSource, /preview-cutover-gates/);
  assert.match(contractSource, /preview-observability-contract/);
  assert.match(contractSource, /REDACTED_ROLLBACK_PLAN_DRY_RUN_REFERENCE/);
  assert.match(contractSource, /REDACTED_RESTORE_PROOF_DRY_RUN_REFERENCE/);
  assert.match(contractSource, /REDACTED_EMERGENCY_STOP_DRY_RUN_REFERENCE/);
  assert.match(contractSource, /REDACTED_OBSERVABILITY_RECOVERY_DRY_RUN_REFERENCE/);
  assert.match(contractSource, /REDACTED_OPERATOR_ROLLBACK_APPROVAL_REFERENCE/);
});

test('Release 35 dry-run evidence cannot execute infrastructure or start runtime work', () => {
  assert.match(contractSource, /status: 'dry_run_evidence_only_not_executed'/);
  assert.match(contractSource, /infrastructureCommandsExecuted: false/);
  assert.match(contractSource, /commandExecutionAllowed: false/);
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
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|curl\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 35 docs and manifest keep rollback evidence dry-run only', () => {
  assert.match(docSource, /dry-run evidence only, not executed/i);
  assert.match(docSource, /Infrastructure commands executed: no/);
  assert.match(docSource, /Deployment started: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(docSource, /No infrastructure command may be executed/);
  assert.match(manifestSource, /rollback_restore_dry_run_evidence/);
  assert.match(manifestSource, /dry_run_evidence_contract_only/);
});
