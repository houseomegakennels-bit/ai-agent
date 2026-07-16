export type FinalPreflightEvidenceStatus = 'redacted_ready_for_review' | 'blocked_not_live';

export interface FinalPreflightEvidenceItem {
  itemId: string;
  label: string;
  sourcePath: string;
  status: FinalPreflightEvidenceStatus;
  redacted: true;
  operatorReviewRequired: true;
}

export const finalPreflightEvidenceItems: FinalPreflightEvidenceItem[] = [
  {
    itemId: 'production-readiness-plan',
    label: 'Production readiness plan summary',
    sourcePath: 'docs/go-live/production-readiness-plan.md',
    status: 'redacted_ready_for_review',
    redacted: true,
    operatorReviewRequired: true,
  },
  {
    itemId: 'secret-environment-wiring',
    label: 'Secret and environment wiring placeholder rules',
    sourcePath: 'docs/go-live/secret-environment-wiring.md',
    status: 'blocked_not_live',
    redacted: true,
    operatorReviewRequired: true,
  },
  {
    itemId: 'controller-runtime-hardening',
    label: 'Controller runtime hardening dry-run proof',
    sourcePath: 'docs/go-live/controller-runtime-hardening.md',
    status: 'redacted_ready_for_review',
    redacted: true,
    operatorReviewRequired: true,
  },
  {
    itemId: 'telegram-bridge-dry-run',
    label: 'Telegram bridge dry-run fixture evidence',
    sourcePath: 'docs/go-live/telegram-bridge-dry-run.md',
    status: 'blocked_not_live',
    redacted: true,
    operatorReviewRequired: true,
  },
  {
    itemId: 'deployment-preview-checklist',
    label: 'Deployment preview checklist evidence',
    sourcePath: 'docs/go-live/deployment-preview-checklist.md',
    status: 'blocked_not_live',
    redacted: true,
    operatorReviewRequired: true,
  },
  {
    itemId: 'production-go-live-candidate',
    label: 'Production go-live candidate blocker summary',
    sourcePath: 'docs/go-live/production-go-live-candidate.md',
    status: 'blocked_not_live',
    redacted: true,
    operatorReviewRequired: true,
  },
];

export interface FinalPreflightEvidenceBundle {
  bundleId: 'release-29-final-preflight-evidence-bundle';
  status: 'blocked_not_live';
  deploymentStarted: false;
  liveEndpointContacted: false;
  serverIpIncluded: false;
  secretsIncluded: false;
  telegramProductionBotEnabled: false;
  paidApiEnabled: false;
  operatorApprovalRequired: true;
  items: FinalPreflightEvidenceItem[];
  itemCount: number;
  blockedItemCount: number;
  summary: string;
}

export function buildFinalPreflightEvidenceBundle(
  items: FinalPreflightEvidenceItem[] = finalPreflightEvidenceItems,
): FinalPreflightEvidenceBundle {
  const blockedItemCount = items.filter((item) => item.status === 'blocked_not_live').length;

  return {
    bundleId: 'release-29-final-preflight-evidence-bundle',
    status: 'blocked_not_live',
    deploymentStarted: false,
    liveEndpointContacted: false,
    serverIpIncluded: false,
    secretsIncluded: false,
    telegramProductionBotEnabled: false,
    paidApiEnabled: false,
    operatorApprovalRequired: true,
    items,
    itemCount: items.length,
    blockedItemCount,
    summary: `${items.length} redacted preflight evidence items are packaged for operator review; ${blockedItemCount} still block launch until explicit approval and runtime-only proof exist.`,
  };
}
