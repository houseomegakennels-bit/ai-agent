export type OperatorLaunchDecision = 'go_redacted_approval_only' | 'no_go_blocked' | 'defer_pending_evidence';

export interface OperatorLaunchDecisionInput {
  decision: OperatorLaunchDecision;
  operatorReference: string;
  evidenceBundleId: 'release-29-final-preflight-evidence-bundle';
  notes: string;
}

export interface OperatorLaunchDecisionRecord {
  recordId: 'release-30-operator-launch-decision-record';
  decision: OperatorLaunchDecision;
  launchApprovedForRuntime: false;
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  brokerIntegrationEnabled: false;
  tradingIntegrationEnabled: false;
  runtimeReleaseRequired: true;
  redacted: true;
  operatorReference: string;
  evidenceBundleId: 'release-29-final-preflight-evidence-bundle';
  summary: string;
}

const forbiddenDecisionTextPatterns = [
  'token',
  'secret',
  'password',
  'server ip',
  'live url',
  'webhook secret',
  'broker credential',
  'api key',
];

export function validateOperatorDecisionInput(input: OperatorLaunchDecisionInput): string[] {
  const findings: string[] = [];
  const text = `${input.operatorReference} ${input.notes}`.toLowerCase();

  for (const pattern of forbiddenDecisionTextPatterns) {
    if (text.includes(pattern)) {
      findings.push(`Remove prohibited sensitive wording before recording decision: ${pattern}`);
    }
  }

  if (!input.operatorReference.trim()) {
    findings.push('Operator reference is required and must remain redacted.');
  }

  if (input.evidenceBundleId !== 'release-29-final-preflight-evidence-bundle') {
    findings.push('Release 30 decision must reference the Release 29 final preflight evidence bundle.');
  }

  return findings;
}

export function buildOperatorLaunchDecisionRecord(
  input: OperatorLaunchDecisionInput,
): OperatorLaunchDecisionRecord {
  const findings = validateOperatorDecisionInput(input);
  const decision = findings.length === 0 ? input.decision : 'defer_pending_evidence';

  return {
    recordId: 'release-30-operator-launch-decision-record',
    decision,
    launchApprovedForRuntime: false,
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    brokerIntegrationEnabled: false,
    tradingIntegrationEnabled: false,
    runtimeReleaseRequired: true,
    redacted: true,
    operatorReference: input.operatorReference,
    evidenceBundleId: 'release-29-final-preflight-evidence-bundle',
    summary: findings.length === 0
      ? `Operator decision ${decision} is captured as redacted review metadata only; runtime launch remains blocked until a separate approved runtime release.`
      : `Operator decision deferred because ${findings.length} redaction or evidence issue(s) must be resolved before review can continue.`,
  };
}
