export type RuntimeCutoverEvidenceStatus = 'missing_redacted_evidence' | 'redacted_placeholder_ready' | 'blocked_until_runtime_release';

export interface RuntimeCutoverEvidenceItem {
  evidenceId: string;
  runbookPreconditionId: string;
  label: string;
  requiredProofPlaceholder: string;
  status: RuntimeCutoverEvidenceStatus;
  sensitiveStorage: 'outside_git_required';
  blocksCutover: true;
}

export const runtimeCutoverEvidenceItems: RuntimeCutoverEvidenceItem[] = [
  {
    evidenceId: 'operator-runtime-approval-evidence',
    runbookPreconditionId: 'operator-runtime-approval',
    label: 'Operator approval reference for a separate runtime implementation release',
    requiredProofPlaceholder: 'REDACTED_OPERATOR_RUNTIME_APPROVAL_REFERENCE',
    status: 'blocked_until_runtime_release',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
  {
    evidenceId: 'runtime-secret-injection-evidence',
    runbookPreconditionId: 'runtime-secret-injection-proof',
    label: 'Runtime-only secret injection proof reference stored outside Git',
    requiredProofPlaceholder: 'REDACTED_RUNTIME_SECRET_PROOF_REFERENCE',
    status: 'blocked_until_runtime_release',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
  {
    evidenceId: 'deployment-target-evidence',
    runbookPreconditionId: 'deployment-target-proof',
    label: 'Redacted deployment target approval reference without live URLs or server IPs',
    requiredProofPlaceholder: 'REDACTED_DEPLOYMENT_TARGET_REFERENCE',
    status: 'missing_redacted_evidence',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
  {
    evidenceId: 'rollback-restore-evidence',
    runbookPreconditionId: 'rollback-proof',
    label: 'Rollback, restore, and emergency-stop proof reference',
    requiredProofPlaceholder: 'REDACTED_ROLLBACK_PROOF_REFERENCE',
    status: 'missing_redacted_evidence',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
  {
    evidenceId: 'telegram-cutover-evidence',
    runbookPreconditionId: 'telegram-cutover-proof',
    label: 'Telegram production cutover approval reference without bot tokens or chat IDs',
    requiredProofPlaceholder: 'REDACTED_TELEGRAM_CUTOVER_REFERENCE',
    status: 'blocked_until_runtime_release',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
  {
    evidenceId: 'paid-api-budget-evidence',
    runbookPreconditionId: 'paid-api-budget-proof',
    label: 'Paid API budget approval reference with explicit cost-control proof',
    requiredProofPlaceholder: 'REDACTED_BUDGET_APPROVAL_REFERENCE',
    status: 'blocked_until_runtime_release',
    sensitiveStorage: 'outside_git_required',
    blocksCutover: true,
  },
];

export interface RuntimeCutoverEvidenceChecklist {
  checklistId: 'release-32-runtime-cutover-evidence-checklist';
  status: 'evidence_checklist_only_not_live';
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationRequired: true;
  allEvidenceSatisfied: false;
  evidenceItems: RuntimeCutoverEvidenceItem[];
  totalEvidenceItemCount: number;
  blockedEvidenceItemCount: number;
  summary: string;
}

export function buildRuntimeCutoverEvidenceChecklist(
  evidenceItems: RuntimeCutoverEvidenceItem[] = runtimeCutoverEvidenceItems,
): RuntimeCutoverEvidenceChecklist {
  const blockedEvidenceItemCount = evidenceItems.filter((item) => item.blocksCutover).length;

  return {
    checklistId: 'release-32-runtime-cutover-evidence-checklist',
    status: 'evidence_checklist_only_not_live',
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationRequired: true,
    allEvidenceSatisfied: false,
    evidenceItems,
    totalEvidenceItemCount: evidenceItems.length,
    blockedEvidenceItemCount,
    summary: `${blockedEvidenceItemCount} runtime cutover evidence items remain blocking; this checklist is redacted evidence planning only and cannot start deployment.`,
  };
}
