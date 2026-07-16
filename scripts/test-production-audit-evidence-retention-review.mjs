import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/productionAuditEvidenceRetentionReviewContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/production-audit-evidence-retention-review.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 39 audit and evidence retention review defines redacted artifacts', () => {
  assert.match(contractSource, /productionAuditEvidenceRetentionItems/);
  assert.match(contractSource, /audit-log-redaction-policy-review/);
  assert.match(contractSource, /operator-evidence-retention-schedule-review/);
  assert.match(contractSource, /support-bundle-redaction-checklist-review/);
  assert.match(contractSource, /audit-access-review-placeholder/);
  assert.match(contractSource, /evidence-deletion-proof-placeholder/);
  assert.match(contractSource, /REDACTED_AUDIT_LOG_REDACTION_POLICY_REVIEW/);
  assert.match(contractSource, /REDACTED_OPERATOR_EVIDENCE_RETENTION_SCHEDULE_REVIEW/);
  assert.match(contractSource, /REDACTED_SUPPORT_BUNDLE_REDACTION_CHECKLIST_REVIEW/);
  assert.match(contractSource, /REDACTED_AUDIT_ACCESS_REVIEW_PLACEHOLDER/);
  assert.match(contractSource, /REDACTED_EVIDENCE_DELETION_PROOF_PLACEHOLDER/);
});

test('Release 39 audit review cannot access production logs or storage', () => {
  assert.match(contractSource, /status: 'production_audit_evidence_retention_review_not_executed'/);
  assert.match(contractSource, /iphoneReviewable: true/);
  assert.match(contractSource, /liveLogRead: false/);
  assert.match(contractSource, /productionStorageAccessed: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /productionUrlIncluded: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotConnected: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|curl\s|ping\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}|[0-9]{6,}:[A-Za-z0-9_-]{20,}/i);
});

test('Release 39 docs and manifest keep audit retention review non-live', () => {
  assert.match(docSource, /production audit and evidence retention review contract only, not executed/i);
  assert.match(docSource, /Live log read: no/);
  assert.match(docSource, /Production storage accessed: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(manifestSource, /production_audit_evidence_retention_review/);
  assert.match(manifestSource, /production_audit_evidence_retention_review_not_live/);
});
