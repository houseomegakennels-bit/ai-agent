export type TelegramProductionCutoverDryRunStatus = 'dry_run_checklist_only' | 'redacted_reference_only' | 'blocked_until_operator_runtime_approval';

export interface TelegramProductionCutoverDryRunItem {
  itemId: string;
  label: string;
  redactedArtifactPlaceholder: string;
  status: TelegramProductionCutoverDryRunStatus;
  productionBotConnected: false;
  blocksTelegramCutover: true;
}

export const telegramProductionCutoverDryRunItems: TelegramProductionCutoverDryRunItem[] = [
  {
    itemId: 'telegram-operator-approval-reference',
    label: 'Operator approval reference for Telegram production cutover planning',
    redactedArtifactPlaceholder: 'REDACTED_TELEGRAM_OPERATOR_APPROVAL_REFERENCE',
    status: 'blocked_until_operator_runtime_approval',
    productionBotConnected: false,
    blocksTelegramCutover: true,
  },
  {
    itemId: 'telegram-bot-secret-proof-reference',
    label: 'Runtime-only bot secret proof reference stored outside Git',
    redactedArtifactPlaceholder: 'REDACTED_TELEGRAM_BOT_SECRET_PROOF_REFERENCE',
    status: 'redacted_reference_only',
    productionBotConnected: false,
    blocksTelegramCutover: true,
  },
  {
    itemId: 'telegram-webhook-shape-reference',
    label: 'Webhook shape reference without URL, token, secret, or live endpoint',
    redactedArtifactPlaceholder: 'REDACTED_TELEGRAM_WEBHOOK_SHAPE_REFERENCE',
    status: 'dry_run_checklist_only',
    productionBotConnected: false,
    blocksTelegramCutover: true,
  },
  {
    itemId: 'telegram-allowed-chat-proof-reference',
    label: 'Allowed chat proof reference without chat IDs or account identifiers',
    redactedArtifactPlaceholder: 'REDACTED_TELEGRAM_ALLOWED_CHAT_PROOF_REFERENCE',
    status: 'redacted_reference_only',
    productionBotConnected: false,
    blocksTelegramCutover: true,
  },
  {
    itemId: 'telegram-rollback-reference',
    label: 'Telegram cutover rollback reference mapped to Release 35 dry-run evidence',
    redactedArtifactPlaceholder: 'REDACTED_TELEGRAM_ROLLBACK_DRY_RUN_REFERENCE',
    status: 'dry_run_checklist_only',
    productionBotConnected: false,
    blocksTelegramCutover: true,
  },
];

export interface TelegramProductionCutoverDryRunChecklist {
  checklistId: 'release-36-telegram-production-cutover-dry-run';
  status: 'telegram_cutover_dry_run_only_not_connected';
  productionBotConnected: false;
  botTokenIncluded: false;
  webhookSecretIncluded: false;
  chatIdIncluded: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationApprovalRequired: true;
  cutoverItems: TelegramProductionCutoverDryRunItem[];
  blockedCutoverItemCount: number;
  summary: string;
}

export function buildTelegramProductionCutoverDryRunChecklist(
  cutoverItems: TelegramProductionCutoverDryRunItem[] = telegramProductionCutoverDryRunItems,
): TelegramProductionCutoverDryRunChecklist {
  const blockedCutoverItemCount = cutoverItems.filter((item) => item.blocksTelegramCutover).length;

  return {
    checklistId: 'release-36-telegram-production-cutover-dry-run',
    status: 'telegram_cutover_dry_run_only_not_connected',
    productionBotConnected: false,
    botTokenIncluded: false,
    webhookSecretIncluded: false,
    chatIdIncluded: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationApprovalRequired: true,
    cutoverItems,
    blockedCutoverItemCount,
    summary: `${blockedCutoverItemCount} Telegram production cutover dry-run checklist items block cutover; no production bot was connected.`,
  };
}
