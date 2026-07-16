export type RollbackRestoreDryRunEvidenceStatus = 'dry_run_evidence_required' | 'redacted_reference_only' | 'blocked_until_runtime_approval';

export interface RollbackRestoreDryRunEvidenceItem {
  evidenceId: string;
  release34PreviewItemId: string;
  label: string;
  redactedEvidencePlaceholder: string;
  status: RollbackRestoreDryRunEvidenceStatus;
  commandExecutionAllowed: false;
  blocksRuntimeCutover: true;
}

export const rollbackRestoreDryRunEvidenceItems: RollbackRestoreDryRunEvidenceItem[] = [
  {
    evidenceId: 'rollback-plan-reference',
    release34PreviewItemId: 'preview-package-layout',
    label: 'Redacted rollback plan reference for the local deployment package preview',
    redactedEvidencePlaceholder: 'REDACTED_ROLLBACK_PLAN_DRY_RUN_REFERENCE',
    status: 'dry_run_evidence_required',
    commandExecutionAllowed: false,
    blocksRuntimeCutover: true,
  },
  {
    evidenceId: 'restore-proof-reference',
    release34PreviewItemId: 'preview-env-example',
    label: 'Redacted restore proof reference with placeholder environment keys only',
    redactedEvidencePlaceholder: 'REDACTED_RESTORE_PROOF_DRY_RUN_REFERENCE',
    status: 'dry_run_evidence_required',
    commandExecutionAllowed: false,
    blocksRuntimeCutover: true,
  },
  {
    evidenceId: 'emergency-stop-reference',
    release34PreviewItemId: 'preview-cutover-gates',
    label: 'Emergency-stop dry-run evidence reference that preserves operator approval gates',
    redactedEvidencePlaceholder: 'REDACTED_EMERGENCY_STOP_DRY_RUN_REFERENCE',
    status: 'blocked_until_runtime_approval',
    commandExecutionAllowed: false,
    blocksRuntimeCutover: true,
  },
  {
    evidenceId: 'observability-recovery-reference',
    release34PreviewItemId: 'preview-observability-contract',
    label: 'Observability recovery proof reference without live telemetry sinks',
    redactedEvidencePlaceholder: 'REDACTED_OBSERVABILITY_RECOVERY_DRY_RUN_REFERENCE',
    status: 'redacted_reference_only',
    commandExecutionAllowed: false,
    blocksRuntimeCutover: true,
  },
  {
    evidenceId: 'operator-rollback-approval-reference',
    release34PreviewItemId: 'preview-cutover-gates',
    label: 'Operator rollback approval reference required before any runtime cutover',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_ROLLBACK_APPROVAL_REFERENCE',
    status: 'blocked_until_runtime_approval',
    commandExecutionAllowed: false,
    blocksRuntimeCutover: true,
  },
];

export interface RollbackRestoreDryRunEvidence {
  evidenceBundleId: 'release-35-rollback-restore-dry-run-evidence';
  status: 'dry_run_evidence_only_not_executed';
  infrastructureCommandsExecuted: false;
  runtimeServicesImplemented: false;
  deploymentAutomationCreated: false;
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationApprovalRequired: true;
  evidenceItems: RollbackRestoreDryRunEvidenceItem[];
  blockedEvidenceItemCount: number;
  summary: string;
}

export function buildRollbackRestoreDryRunEvidence(
  evidenceItems: RollbackRestoreDryRunEvidenceItem[] = rollbackRestoreDryRunEvidenceItems,
): RollbackRestoreDryRunEvidence {
  const blockedEvidenceItemCount = evidenceItems.filter((item) => item.blocksRuntimeCutover).length;

  return {
    evidenceBundleId: 'release-35-rollback-restore-dry-run-evidence',
    status: 'dry_run_evidence_only_not_executed',
    infrastructureCommandsExecuted: false,
    runtimeServicesImplemented: false,
    deploymentAutomationCreated: false,
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationApprovalRequired: true,
    evidenceItems,
    blockedEvidenceItemCount,
    summary: `${blockedEvidenceItemCount} rollback and restore dry-run evidence items block runtime cutover; no infrastructure commands were executed.`,
  };
}
