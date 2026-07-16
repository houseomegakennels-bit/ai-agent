export type ProductionAuditEvidenceRetentionStatus = 'redacted_review_only' | 'retention_policy_shape_only' | 'blocked_until_runtime_approval';

export interface ProductionAuditEvidenceRetentionItem {
  itemId: string;
  label: string;
  redactedEvidencePlaceholder: string;
  status: ProductionAuditEvidenceRetentionStatus;
  retentionPolicyDays: number;
  liveLogRead: false;
  productionStorageAccessed: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  blocksRetentionApproval: true;
}

export const productionAuditEvidenceRetentionItems: ProductionAuditEvidenceRetentionItem[] = [
  {
    itemId: 'audit-log-redaction-policy-review',
    label: 'Audit log redaction policy review without live log access',
    redactedEvidencePlaceholder: 'REDACTED_AUDIT_LOG_REDACTION_POLICY_REVIEW',
    status: 'retention_policy_shape_only',
    retentionPolicyDays: 30,
    liveLogRead: false,
    productionStorageAccessed: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksRetentionApproval: true,
  },
  {
    itemId: 'operator-evidence-retention-schedule-review',
    label: 'Operator evidence retention schedule review for iPhone handoff packages',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_EVIDENCE_RETENTION_SCHEDULE_REVIEW',
    status: 'redacted_review_only',
    retentionPolicyDays: 90,
    liveLogRead: false,
    productionStorageAccessed: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksRetentionApproval: true,
  },
  {
    itemId: 'support-bundle-redaction-checklist-review',
    label: 'Support bundle redaction checklist review without support bundle export',
    redactedEvidencePlaceholder: 'REDACTED_SUPPORT_BUNDLE_REDACTION_CHECKLIST_REVIEW',
    status: 'redacted_review_only',
    retentionPolicyDays: 14,
    liveLogRead: false,
    productionStorageAccessed: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksRetentionApproval: true,
  },
  {
    itemId: 'audit-access-review-placeholder',
    label: 'Audit access review placeholder without account IDs or live permissions',
    redactedEvidencePlaceholder: 'REDACTED_AUDIT_ACCESS_REVIEW_PLACEHOLDER',
    status: 'blocked_until_runtime_approval',
    retentionPolicyDays: 30,
    liveLogRead: false,
    productionStorageAccessed: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksRetentionApproval: true,
  },
  {
    itemId: 'evidence-deletion-proof-placeholder',
    label: 'Evidence deletion proof placeholder without deleting production evidence',
    redactedEvidencePlaceholder: 'REDACTED_EVIDENCE_DELETION_PROOF_PLACEHOLDER',
    status: 'blocked_until_runtime_approval',
    retentionPolicyDays: 0,
    liveLogRead: false,
    productionStorageAccessed: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksRetentionApproval: true,
  },
];

export interface ProductionAuditEvidenceRetentionReviewPlan {
  planId: 'release-39-production-audit-evidence-retention-review';
  status: 'production_audit_evidence_retention_review_not_executed';
  iphoneReviewable: true;
  liveLogRead: false;
  productionStorageAccessed: false;
  liveEndpointContacted: false;
  productionUrlIncluded: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotConnected: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationApprovalRequired: true;
  retentionItems: ProductionAuditEvidenceRetentionItem[];
  blockedRetentionApprovalCount: number;
  summary: string;
}

export function buildProductionAuditEvidenceRetentionReviewPlan(
  retentionItems: ProductionAuditEvidenceRetentionItem[] = productionAuditEvidenceRetentionItems,
): ProductionAuditEvidenceRetentionReviewPlan {
  const blockedRetentionApprovalCount = retentionItems.filter((item) => item.blocksRetentionApproval).length;

  return {
    planId: 'release-39-production-audit-evidence-retention-review',
    status: 'production_audit_evidence_retention_review_not_executed',
    iphoneReviewable: true,
    liveLogRead: false,
    productionStorageAccessed: false,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotConnected: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationApprovalRequired: true,
    retentionItems,
    blockedRetentionApprovalCount,
    summary: `${blockedRetentionApprovalCount} audit/evidence retention review items remain redacted and non-live; no production logs or storage were accessed.`,
  };
}
