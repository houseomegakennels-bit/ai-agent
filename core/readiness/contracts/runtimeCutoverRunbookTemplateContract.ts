export type RuntimeCutoverPreconditionStatus = 'required_placeholder' | 'blocked_until_runtime_release';

export interface RuntimeCutoverPrecondition {
  preconditionId: string;
  label: string;
  status: RuntimeCutoverPreconditionStatus;
  evidencePlaceholder: string;
  blocksCutover: true;
}

export const runtimeCutoverPreconditions: RuntimeCutoverPrecondition[] = [
  {
    preconditionId: 'operator-runtime-approval',
    label: 'Operator approves a separate runtime implementation release',
    status: 'blocked_until_runtime_release',
    evidencePlaceholder: 'REDACTED_OPERATOR_RUNTIME_APPROVAL_REFERENCE',
    blocksCutover: true,
  },
  {
    preconditionId: 'runtime-secret-injection-proof',
    label: 'Runtime-only secret injection proof exists outside Git',
    status: 'blocked_until_runtime_release',
    evidencePlaceholder: 'REDACTED_RUNTIME_SECRET_PROOF_REFERENCE',
    blocksCutover: true,
  },
  {
    preconditionId: 'deployment-target-proof',
    label: 'Deployment target metadata is redacted and approved outside Git',
    status: 'required_placeholder',
    evidencePlaceholder: 'REDACTED_DEPLOYMENT_TARGET_REFERENCE',
    blocksCutover: true,
  },
  {
    preconditionId: 'rollback-proof',
    label: 'Rollback procedure and restore proof are complete',
    status: 'required_placeholder',
    evidencePlaceholder: 'REDACTED_ROLLBACK_PROOF_REFERENCE',
    blocksCutover: true,
  },
  {
    preconditionId: 'telegram-cutover-proof',
    label: 'Telegram production bot cutover proof is approved outside Git',
    status: 'blocked_until_runtime_release',
    evidencePlaceholder: 'REDACTED_TELEGRAM_CUTOVER_REFERENCE',
    blocksCutover: true,
  },
  {
    preconditionId: 'paid-api-budget-proof',
    label: 'Paid API budget approval remains explicit and separate',
    status: 'blocked_until_runtime_release',
    evidencePlaceholder: 'REDACTED_BUDGET_APPROVAL_REFERENCE',
    blocksCutover: true,
  },
];

export interface RuntimeCutoverRunbookTemplate {
  runbookId: 'release-31-runtime-cutover-runbook-template';
  status: 'template_only_not_live';
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationRequired: true;
  preconditions: RuntimeCutoverPrecondition[];
  blockedPreconditionCount: number;
  summary: string;
}

export function buildRuntimeCutoverRunbookTemplate(
  preconditions: RuntimeCutoverPrecondition[] = runtimeCutoverPreconditions,
): RuntimeCutoverRunbookTemplate {
  const blockedPreconditionCount = preconditions.filter((precondition) => precondition.blocksCutover).length;

  return {
    runbookId: 'release-31-runtime-cutover-runbook-template',
    status: 'template_only_not_live',
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationRequired: true,
    preconditions,
    blockedPreconditionCount,
    summary: `${blockedPreconditionCount} runtime cutover preconditions remain blocking; this runbook is a redacted template and cannot start deployment.`,
  };
}
