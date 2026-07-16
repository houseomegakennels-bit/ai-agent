export type LocalDeploymentPackagePreviewStatus = 'local_preview_only' | 'redacted_reference_only' | 'blocked_until_runtime_approval';

export interface LocalDeploymentPackagePreviewItem {
  itemId: string;
  release33BoundaryItemId: string;
  label: string;
  previewArtifact: string;
  status: LocalDeploymentPackagePreviewStatus;
  localOnly: true;
  blocksDeployment: true;
}

export const localDeploymentPackagePreviewItems: LocalDeploymentPackagePreviewItem[] = [
  {
    itemId: 'preview-runtime-readme',
    release33BoundaryItemId: 'runtime-entrypoint-shape',
    label: 'Local preview README for the future runtime entrypoint shape',
    previewArtifact: 'REDACTED_LOCAL_PREVIEW_RUNTIME_README_REFERENCE',
    status: 'local_preview_only',
    localOnly: true,
    blocksDeployment: true,
  },
  {
    itemId: 'preview-env-example',
    release33BoundaryItemId: 'environment-contract-shape',
    label: 'Local preview environment example with placeholder keys only',
    previewArtifact: 'REDACTED_LOCAL_PREVIEW_ENV_EXAMPLE_REFERENCE',
    status: 'redacted_reference_only',
    localOnly: true,
    blocksDeployment: true,
  },
  {
    itemId: 'preview-package-layout',
    release33BoundaryItemId: 'dry-run-package-layout',
    label: 'Local preview package layout that contains no executable deployment script',
    previewArtifact: 'REDACTED_LOCAL_PREVIEW_PACKAGE_LAYOUT_REFERENCE',
    status: 'local_preview_only',
    localOnly: true,
    blocksDeployment: true,
  },
  {
    itemId: 'preview-observability-contract',
    release33BoundaryItemId: 'runtime-observability-shape',
    label: 'Local preview observability contract without live telemetry sinks',
    previewArtifact: 'REDACTED_LOCAL_PREVIEW_OBSERVABILITY_REFERENCE',
    status: 'redacted_reference_only',
    localOnly: true,
    blocksDeployment: true,
  },
  {
    itemId: 'preview-cutover-gates',
    release33BoundaryItemId: 'operator-cutover-approval-gate',
    label: 'Local preview cutover gates that keep operator runtime approval mandatory',
    previewArtifact: 'REDACTED_LOCAL_PREVIEW_CUTOVER_GATES_REFERENCE',
    status: 'blocked_until_runtime_approval',
    localOnly: true,
    blocksDeployment: true,
  },
];

export interface LocalDeploymentPackagePreview {
  previewId: 'release-34-local-deployment-package-preview';
  status: 'local_only_preview_not_deployable';
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
  previewItems: LocalDeploymentPackagePreviewItem[];
  blockedPreviewItemCount: number;
  summary: string;
}

export function buildLocalDeploymentPackagePreview(
  previewItems: LocalDeploymentPackagePreviewItem[] = localDeploymentPackagePreviewItems,
): LocalDeploymentPackagePreview {
  const blockedPreviewItemCount = previewItems.filter((item) => item.blocksDeployment).length;

  return {
    previewId: 'release-34-local-deployment-package-preview',
    status: 'local_only_preview_not_deployable',
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
    previewItems,
    blockedPreviewItemCount,
    summary: `${blockedPreviewItemCount} local deployment package preview items remain blocking; this package is local-only and not deployable.`,
  };
}
