export type ProductionHealthReadinessSmokeStatus = 'redacted_fixture_only' | 'dry_run_smoke_shape_only' | 'blocked_until_runtime_approval';

export interface ProductionHealthReadinessSmokeCheck {
  checkId: string;
  label: string;
  redactedEvidencePlaceholder: string;
  status: ProductionHealthReadinessSmokeStatus;
  liveEndpointContacted: false;
  productionUrlIncluded: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  blocksProductionValidation: true;
}

export const productionHealthReadinessSmokeChecks: ProductionHealthReadinessSmokeCheck[] = [
  {
    checkId: 'controller-health-response-shape',
    label: 'Controller /health response shape fixture without endpoint contact',
    redactedEvidencePlaceholder: 'REDACTED_CONTROLLER_HEALTH_RESPONSE_SHAPE_FIXTURE',
    status: 'dry_run_smoke_shape_only',
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksProductionValidation: true,
  },
  {
    checkId: 'controller-readiness-response-shape',
    label: 'Controller /ready response shape fixture without endpoint contact',
    redactedEvidencePlaceholder: 'REDACTED_CONTROLLER_READINESS_RESPONSE_SHAPE_FIXTURE',
    status: 'dry_run_smoke_shape_only',
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksProductionValidation: true,
  },
  {
    checkId: 'telegram-webhook-health-placeholder',
    label: 'Telegram webhook health placeholder with no production bot or webhook URL',
    redactedEvidencePlaceholder: 'REDACTED_TELEGRAM_WEBHOOK_HEALTH_PLACEHOLDER',
    status: 'redacted_fixture_only',
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksProductionValidation: true,
  },
  {
    checkId: 'operator-mobile-smoke-proof-placeholder',
    label: 'Operator mobile smoke proof placeholder for future iPhone validation',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_MOBILE_SMOKE_PROOF_PLACEHOLDER',
    status: 'blocked_until_runtime_approval',
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksProductionValidation: true,
  },
  {
    checkId: 'rollback-health-gate-placeholder',
    label: 'Rollback health gate placeholder tied to dry-run evidence only',
    redactedEvidencePlaceholder: 'REDACTED_ROLLBACK_HEALTH_GATE_PLACEHOLDER',
    status: 'redacted_fixture_only',
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    blocksProductionValidation: true,
  },
];

export interface ProductionHealthReadinessSmokeTestPlan {
  planId: 'release-37-production-health-readiness-smoke-test';
  status: 'production_health_readiness_smoke_test_not_executed';
  healthEndpointContacted: false;
  readinessEndpointContacted: false;
  telegramWebhookContacted: false;
  productionUrlIncluded: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  botTokenIncluded: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeImplementationApprovalRequired: true;
  smokeChecks: ProductionHealthReadinessSmokeCheck[];
  blockedValidationCount: number;
  summary: string;
}

export function buildProductionHealthReadinessSmokeTestPlan(
  smokeChecks: ProductionHealthReadinessSmokeCheck[] = productionHealthReadinessSmokeChecks,
): ProductionHealthReadinessSmokeTestPlan {
  const blockedValidationCount = smokeChecks.filter((check) => check.blocksProductionValidation).length;

  return {
    planId: 'release-37-production-health-readiness-smoke-test',
    status: 'production_health_readiness_smoke_test_not_executed',
    healthEndpointContacted: false,
    readinessEndpointContacted: false,
    telegramWebhookContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    botTokenIncluded: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeImplementationApprovalRequired: true,
    smokeChecks,
    blockedValidationCount,
    summary: `${blockedValidationCount} production health/readiness smoke-test gates remain dry-run only; no live endpoint was contacted.`,
  };
}
