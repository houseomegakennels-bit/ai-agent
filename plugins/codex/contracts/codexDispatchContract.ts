export type CodexRoute = 'codex-cloud-capability-test' | 'codex-cli-codespace-fallback' | 'open-model-coding-fallback' | 'pause-and-notify-operator';

export interface CodexDispatchContract {
  route: CodexRoute;
  requiresCapabilityCheck: true;
  realCredentialInRepoAllowed: false;
  canApproveOwnPullRequest: false;
  canSpendMoneyWithoutApproval: false;
  implementedRuntime: false;
}

export const codexDispatchRoutes: CodexDispatchContract[] = [
  {
    route: 'codex-cloud-capability-test',
    requiresCapabilityCheck: true,
    realCredentialInRepoAllowed: false,
    canApproveOwnPullRequest: false,
    canSpendMoneyWithoutApproval: false,
    implementedRuntime: false,
  },
  {
    route: 'codex-cli-codespace-fallback',
    requiresCapabilityCheck: true,
    realCredentialInRepoAllowed: false,
    canApproveOwnPullRequest: false,
    canSpendMoneyWithoutApproval: false,
    implementedRuntime: false,
  },
  {
    route: 'open-model-coding-fallback',
    requiresCapabilityCheck: true,
    realCredentialInRepoAllowed: false,
    canApproveOwnPullRequest: false,
    canSpendMoneyWithoutApproval: false,
    implementedRuntime: false,
  },
  {
    route: 'pause-and-notify-operator',
    requiresCapabilityCheck: true,
    realCredentialInRepoAllowed: false,
    canApproveOwnPullRequest: false,
    canSpendMoneyWithoutApproval: false,
    implementedRuntime: false,
  },
];

export function codexRoutesAreSafe(routes: CodexDispatchContract[]): boolean {
  return routes.every((route) => !route.realCredentialInRepoAllowed && !route.canApproveOwnPullRequest && !route.canSpendMoneyWithoutApproval && !route.implementedRuntime);
}
