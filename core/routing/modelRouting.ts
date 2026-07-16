export type ModelRoute = 'no-ai-deterministic' | 'free-model' | 'codex-cloud' | 'codex-cli-codespace' | 'pause-for-operator';
export type TaskRisk = 'safe' | 'approval_required' | 'blocked';

export interface ModelRoutePolicy {
  route: ModelRoute;
  purpose: string;
  paidApiAllowed: false;
  requiresOperatorApproval: boolean;
  implementedRuntime: false;
}

export const releaseTwoModelRoutes: ModelRoutePolicy[] = [
  {
    route: 'no-ai-deterministic',
    purpose: 'Handle deterministic commands without LLM usage whenever possible.',
    paidApiAllowed: false,
    requiresOperatorApproval: false,
    implementedRuntime: false,
  },
  {
    route: 'free-model',
    purpose: 'Use a future free/cheap provider only after provider health and budget policy pass.',
    paidApiAllowed: false,
    requiresOperatorApproval: false,
    implementedRuntime: false,
  },
  {
    route: 'codex-cloud',
    purpose: 'Use Codex Cloud when capability is available and task policy allows repository work.',
    paidApiAllowed: false,
    requiresOperatorApproval: true,
    implementedRuntime: false,
  },
  {
    route: 'codex-cli-codespace',
    purpose: 'Fallback to Codex CLI in Codespaces when Codex Cloud is unavailable and budget policy allows startup.',
    paidApiAllowed: false,
    requiresOperatorApproval: true,
    implementedRuntime: false,
  },
  {
    route: 'pause-for-operator',
    purpose: 'Stop and notify the operator when safe/free routing is unavailable or insufficient.',
    paidApiAllowed: false,
    requiresOperatorApproval: true,
    implementedRuntime: false,
  },
];

export function paidFallbackIsDisabled(routes: ModelRoutePolicy[]): boolean {
  return routes.every((route) => route.paidApiAllowed === false);
}

export function chooseRoute(capabilities: { deterministic: boolean; freeModelHealthy: boolean; codexCloudAvailable: boolean; codespaceAvailable: boolean }): ModelRoute {
  if (capabilities.deterministic) return 'no-ai-deterministic';
  if (capabilities.freeModelHealthy) return 'free-model';
  if (capabilities.codexCloudAvailable) return 'codex-cloud';
  if (capabilities.codespaceAvailable) return 'codex-cli-codespace';
  return 'pause-for-operator';
}
