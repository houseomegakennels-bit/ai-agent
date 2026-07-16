export type GoLiveReadinessStatus = 'not_ready' | 'ready_after_operator_gates';

export interface GoLiveReadinessGate {
  gateId: string;
  label: string;
  status: GoLiveReadinessStatus;
  blocksGoLive: boolean;
  evidenceRequired: string;
}

export const goLiveReadinessGates: GoLiveReadinessGate[] = [
  {
    gateId: 'operator-production-approval',
    label: 'Operator explicitly approves production deployment scope',
    status: 'not_ready',
    blocksGoLive: true,
    evidenceRequired: 'Signed release report and rollback plan reviewed outside source control.',
  },
  {
    gateId: 'runtime-secret-provisioning',
    label: 'Runtime secrets are provisioned outside Git and never logged',
    status: 'not_ready',
    blocksGoLive: true,
    evidenceRequired: 'Redacted environment checklist with no secret values committed.',
  },
  {
    gateId: 'telegram-bridge-runtime',
    label: 'Telegram bridge runtime is implemented and tested with placeholders first',
    status: 'not_ready',
    blocksGoLive: true,
    evidenceRequired: 'Dry-run bridge test evidence without tokens, chat IDs, or live URLs.',
  },
  {
    gateId: 'controller-deployment-target',
    label: 'Controller deployment target, rollback, and health checks are approved',
    status: 'not_ready',
    blocksGoLive: true,
    evidenceRequired: 'Deployment checklist with server identifiers redacted from Markdown.',
  },
];

export function summarizeGoLiveReadiness(gates: GoLiveReadinessGate[] = goLiveReadinessGates): string {
  const blockers = gates.filter((gate) => gate.blocksGoLive && gate.status === 'not_ready').length;
  if (blockers > 0) {
    return `${blockers} go-live gate${blockers === 1 ? '' : 's'} still block production launch.`;
  }

  return 'All go-live gates are ready after explicit operator approval.';
}
