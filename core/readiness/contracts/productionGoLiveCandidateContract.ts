export type ProductionGoLiveGateStatus = 'blocked' | 'requires_operator_approval' | 'contract_ready_not_live';

export interface ProductionGoLiveCandidateGate {
  gateId: string;
  label: string;
  status: ProductionGoLiveGateStatus;
  blocksLaunch: true;
  evidenceRequired: string;
}

export const productionGoLiveCandidateGates: ProductionGoLiveCandidateGate[] = [
  {
    gateId: 'operator-final-approval',
    label: 'Operator grants explicit final go-live approval',
    status: 'requires_operator_approval',
    blocksLaunch: true,
    evidenceRequired: 'Human approval captured outside secrets and committed only as redacted release evidence.',
  },
  {
    gateId: 'runtime-secret-injection',
    label: 'Runtime secrets are injected outside Git',
    status: 'blocked',
    blocksLaunch: true,
    evidenceRequired: 'Redacted proof that secret values are present only in the approved runtime environment.',
  },
  {
    gateId: 'telegram-runtime-cutover',
    label: 'Telegram production bridge cutover is separately approved',
    status: 'blocked',
    blocksLaunch: true,
    evidenceRequired: 'Dry-run fixture approval plus future runtime test without committed tokens or chat IDs.',
  },
  {
    gateId: 'controller-deploy-cutover',
    label: 'Controller deployment target and rollback are approved',
    status: 'blocked',
    blocksLaunch: true,
    evidenceRequired: 'Redacted deployment target metadata, rollback proof, and health/readiness proof.',
  },
  {
    gateId: 'cost-and-paid-api-control',
    label: 'Paid APIs remain disabled unless explicit budget approval exists',
    status: 'contract_ready_not_live',
    blocksLaunch: true,
    evidenceRequired: 'Budget/cost-control evidence before any paid provider can be enabled.',
  },
];

export interface ProductionGoLiveCandidateSummary {
  candidateId: 'release-28-production-go-live-candidate';
  launchApproved: false;
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  blockers: number;
  summary: string;
}

export function buildProductionGoLiveCandidateSummary(
  gates: ProductionGoLiveCandidateGate[] = productionGoLiveCandidateGates,
): ProductionGoLiveCandidateSummary {
  const blockers = gates.filter((gate) => gate.blocksLaunch).length;

  return {
    candidateId: 'release-28-production-go-live-candidate',
    launchApproved: false,
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    blockers,
    summary: `${blockers} production go-live gates still block launch until explicit operator approval and redacted evidence are complete.`,
  };
}
