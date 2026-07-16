import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const hardeningSource = readFileSync(new URL('./productionHardeningContract.ts', import.meta.url), 'utf8');
const rollbackSource = readFileSync(new URL('./rollbackAndAcceptanceContract.ts', import.meta.url), 'utf8');
const previewSource = readFileSync(new URL('./previewAndSecurityContract.ts', import.meta.url), 'utf8');
const docs = readFileSync(new URL('../../../docs/hardening/release-9-production-hardening.md', import.meta.url), 'utf8');

test('Release 9 hardening contract includes all required drills and no deploy runtime', () => {
  for (const drill of ['restore_drill', 'failure_simulation', 'migration_safety', 'dependency_scan', 'security_review', 'preview_deploy', 'rollback_validation', 'production_acceptance']) {
    assert.match(hardeningSource, new RegExp(drill));
  }
  assert.match(hardeningSource, /productionDeployImplemented: false/);
  assert.match(hardeningSource, /realSecretsRequired: false/);
});

test('rollback and production acceptance contracts require approval and repository safety gates', () => {
  for (const requirement of ['rollbackPlanRequired', 'rollbackDrillEvidenceRequired', 'operatorApprovalRequiredBeforeProduction', 'noSecretsInRepository', 'noPaidApisEnabledSilently', 'iphoneOperationReviewed']) {
    assert.match(rollbackSource, new RegExp(requirement));
  }
});

test('preview and security contracts require isolation, disposable credentials, scans, and human approval', () => {
  for (const requirement of ['isolatedEnvironmentRequired', 'disposableCredentialsOnly', 'noProductionTraffic', 'secretScanRequired', 'containerHardeningReviewRequired', 'humanApprovalRequired']) {
    assert.match(previewSource, new RegExp(requirement));
  }
  assert.match(previewSource, /implementedRuntime: false/);
});

test('Release 9 docs forbid production deployment and real secrets', () => {
  assert.match(docs, /No production deployment is performed/);
  assert.match(docs, /No real secrets/);
  assert.match(docs, /operator approval/);
});
