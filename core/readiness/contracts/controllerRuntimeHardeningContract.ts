export type ControllerRuntimeHardeningStatus = 'planned_not_live' | 'dry_run_passed';

export interface ControllerRuntimeHardeningCheck {
  checkId: string;
  label: string;
  status: ControllerRuntimeHardeningStatus;
  evidence: string;
  blocksLiveTraffic: true;
}

export const controllerRuntimeHardeningChecklist: ControllerRuntimeHardeningCheck[] = [
  {
    checkId: 'local-health-shape',
    label: 'Controller health response shape matches the local contract',
    status: 'dry_run_passed',
    evidence: 'Source-level dry-run check only; no FastAPI server or live endpoint was started.',
    blocksLiveTraffic: true,
  },
  {
    checkId: 'readiness-shape',
    label: 'Controller readiness response shape stays local-only',
    status: 'dry_run_passed',
    evidence: 'Source-level dry-run check only; no controller VPS or public URL was contacted.',
    blocksLiveTraffic: true,
  },
  {
    checkId: 'runtime-secret-boundary',
    label: 'Runtime secret reads remain outside source control',
    status: 'planned_not_live',
    evidence: 'Future deployment must use external runtime secret injection with redacted evidence.',
    blocksLiveTraffic: true,
  },
  {
    checkId: 'rollback-health-proof',
    label: 'Rollback health proof is documented before any deployment',
    status: 'planned_not_live',
    evidence: 'Future release must prove rollback health checks before production traffic.',
    blocksLiveTraffic: true,
  },
];

export interface ControllerRuntimeDryRunProof {
  proofId: string;
  healthPath: '/health';
  readyPath: '/ready';
  serverStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  productionTrafficAllowed: false;
  summary: string;
}

export function buildControllerRuntimeDryRunProof(
  checks: ControllerRuntimeHardeningCheck[] = controllerRuntimeHardeningChecklist,
): ControllerRuntimeDryRunProof {
  const passed = checks.filter((check) => check.status === 'dry_run_passed').length;
  const planned = checks.filter((check) => check.status === 'planned_not_live').length;

  return {
    proofId: 'controller-runtime-hardening-dry-run-release-25',
    healthPath: '/health',
    readyPath: '/ready',
    serverStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    productionTrafficAllowed: false,
    summary: `${passed} controller checks passed as source dry-runs; ${planned} remain planned before live traffic.`,
  };
}
