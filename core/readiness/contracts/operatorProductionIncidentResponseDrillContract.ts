export type OperatorIncidentDrillStatus = 'redacted_drill_only' | 'iphone_escalation_evidence_only' | 'blocked_until_runtime_approval';

export interface OperatorIncidentResponseDrillStep {
  stepId: string;
  label: string;
  redactedEvidencePlaceholder: string;
  status: OperatorIncidentDrillStatus;
  iphoneOperable: true;
  liveEndpointContacted: false;
  productionUrlIncluded: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  runtimeActionExecuted: false;
  blocksIncidentReadiness: true;
}

export const operatorIncidentResponseDrillSteps: OperatorIncidentResponseDrillStep[] = [
  {
    stepId: 'operator-incident-intake-proof',
    label: 'Operator incident intake proof for iPhone-first acknowledgement and severity capture',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_INCIDENT_INTAKE_PROOF',
    status: 'iphone_escalation_evidence_only',
    iphoneOperable: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    runtimeActionExecuted: false,
    blocksIncidentReadiness: true,
  },
  {
    stepId: 'operator-escalation-path-proof',
    label: 'Operator escalation path proof without phone numbers, chat IDs, or live contacts',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_ESCALATION_PATH_PROOF',
    status: 'redacted_drill_only',
    iphoneOperable: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    runtimeActionExecuted: false,
    blocksIncidentReadiness: true,
  },
  {
    stepId: 'service-degradation-triage-proof',
    label: 'Service degradation triage proof using redacted symptoms and dry-run actions only',
    redactedEvidencePlaceholder: 'REDACTED_SERVICE_DEGRADATION_TRIAGE_PROOF',
    status: 'redacted_drill_only',
    iphoneOperable: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    runtimeActionExecuted: false,
    blocksIncidentReadiness: true,
  },
  {
    stepId: 'emergency-stop-confirmation-proof',
    label: 'Emergency Stop confirmation proof without issuing live stop commands',
    redactedEvidencePlaceholder: 'REDACTED_EMERGENCY_STOP_CONFIRMATION_PROOF',
    status: 'blocked_until_runtime_approval',
    iphoneOperable: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    runtimeActionExecuted: false,
    blocksIncidentReadiness: true,
  },
  {
    stepId: 'operator-post-incident-handoff-proof',
    label: 'Post-incident handoff proof for iPhone review and evidence packaging',
    redactedEvidencePlaceholder: 'REDACTED_OPERATOR_POST_INCIDENT_HANDOFF_PROOF',
    status: 'iphone_escalation_evidence_only',
    iphoneOperable: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    runtimeActionExecuted: false,
    blocksIncidentReadiness: true,
  },
];

export interface OperatorProductionIncidentResponseDrillPlan {
  planId: 'release-38-operator-production-incident-response-drill';
  status: 'operator_incident_response_drill_not_executed';
  iphoneFirst: true;
  liveEndpointContacted: false;
  productionUrlIncluded: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotConnected: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeActionExecuted: false;
  runtimeImplementationApprovalRequired: true;
  drillSteps: OperatorIncidentResponseDrillStep[];
  blockedReadinessCount: number;
  summary: string;
}

export function buildOperatorProductionIncidentResponseDrillPlan(
  drillSteps: OperatorIncidentResponseDrillStep[] = operatorIncidentResponseDrillSteps,
): OperatorProductionIncidentResponseDrillPlan {
  const blockedReadinessCount = drillSteps.filter((step) => step.blocksIncidentReadiness).length;

  return {
    planId: 'release-38-operator-production-incident-response-drill',
    status: 'operator_incident_response_drill_not_executed',
    iphoneFirst: true,
    liveEndpointContacted: false,
    productionUrlIncluded: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotConnected: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeActionExecuted: false,
    runtimeImplementationApprovalRequired: true,
    drillSteps,
    blockedReadinessCount,
    summary: `${blockedReadinessCount} operator incident response drill steps remain evidence-only; no runtime incident action was executed.`,
  };
}
