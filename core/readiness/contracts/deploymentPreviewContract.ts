export type DeploymentPreviewStatus = 'redacted_planned' | 'local_smoke_passed' | 'blocked_until_operator_approval';

export interface DeploymentPreviewTargetMetadata {
  targetId: 'redacted-controller-target';
  targetLabel: 'REDACTED_CONTROLLER_TARGET';
  serverIpIncluded: false;
  liveUrlIncluded: false;
  secretIncluded: false;
  productionTrafficAllowed: false;
}

export interface DeploymentPreviewSmokeCheck {
  checkId: string;
  label: string;
  status: DeploymentPreviewStatus;
  evidence: string;
  localOnly: true;
}

export const deploymentPreviewTarget: DeploymentPreviewTargetMetadata = {
  targetId: 'redacted-controller-target',
  targetLabel: 'REDACTED_CONTROLLER_TARGET',
  serverIpIncluded: false,
  liveUrlIncluded: false,
  secretIncluded: false,
  productionTrafficAllowed: false,
};

export const deploymentPreviewSmokeChecks: DeploymentPreviewSmokeCheck[] = [
  {
    checkId: 'static-command-interface-build',
    label: 'Static command-interface build can be produced locally',
    status: 'local_smoke_passed',
    evidence: 'npm run build creates local static preview artifacts only.',
    localOnly: true,
  },
  {
    checkId: 'environment-validation',
    label: 'Required scaffold paths validate before deployment planning',
    status: 'local_smoke_passed',
    evidence: './scripts/validate-environment.sh checks repository paths only.',
    localOnly: true,
  },
  {
    checkId: 'secret-scan',
    label: 'No configured secret patterns are present before deployment planning',
    status: 'local_smoke_passed',
    evidence: './scripts/validate-no-secrets.sh scans repository text only.',
    localOnly: true,
  },
  {
    checkId: 'operator-cutover-approval',
    label: 'Operator cutover approval is required before any deployment',
    status: 'blocked_until_operator_approval',
    evidence: 'Future release must provide approval and rollback evidence without secrets.',
    localOnly: true,
  },
];

export interface DeploymentPreviewEvidence {
  evidenceId: string;
  target: DeploymentPreviewTargetMetadata;
  checks: DeploymentPreviewSmokeCheck[];
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  productionTrafficAllowed: false;
  summary: string;
}

export function buildDeploymentPreviewEvidence(
  checks: DeploymentPreviewSmokeCheck[] = deploymentPreviewSmokeChecks,
): DeploymentPreviewEvidence {
  const localPassed = checks.filter((check) => check.status === 'local_smoke_passed').length;
  const blocked = checks.filter((check) => check.status === 'blocked_until_operator_approval').length;

  return {
    evidenceId: 'deployment-preview-release-27-redacted-local-smoke',
    target: deploymentPreviewTarget,
    checks,
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    productionTrafficAllowed: false,
    summary: `${localPassed} local smoke checks recorded; ${blocked} deployment gate remains blocked until operator approval.`,
  };
}
