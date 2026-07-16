export type CodespaceLifecycleAction =
  | 'validate-permissions'
  | 'start-safe-codespace'
  | 'wait-for-ready'
  | 'dispatch-worker'
  | 'monitor-runtime'
  | 'stop-codespace'
  | 'cleanup-orphans'
  | 'enforce-budget'
  | 'cleanup-storage'
  | 'recover-stalled-task';

export interface CodespaceLifecycleContract {
  action: CodespaceLifecycleAction;
  purpose: string;
  requiresOperatorApproval: boolean;
  realCredentialInRepoAllowed: false;
  implementedRuntime: false;
}

export const releaseFourCodespaceLifecycle: CodespaceLifecycleContract[] = [
  { action: 'validate-permissions', purpose: 'Verify future GitHub/Codespaces permissions before starting work.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'start-safe-codespace', purpose: 'Start a Codespace only after task, project, budget, and policy checks pass.', requiresOperatorApproval: true, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'wait-for-ready', purpose: 'Wait for worker readiness with bounded retries.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'dispatch-worker', purpose: 'Dispatch a scoped worker task without production secrets.', requiresOperatorApproval: true, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'monitor-runtime', purpose: 'Track runtime and stop on budget or timeout limits.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'stop-codespace', purpose: 'Stop Codespaces automatically after task completion or failure.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'cleanup-orphans', purpose: 'Find and stop orphaned Codespaces.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'enforce-budget', purpose: 'Block starts and notify the operator when budget thresholds are exceeded.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'cleanup-storage', purpose: 'Delete expired task storage and old Codespace artifacts according to retention policy.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { action: 'recover-stalled-task', purpose: 'Detect stalled Codespace tasks and move them to a safe operator-visible state.', requiresOperatorApproval: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
];

export function allCodespaceContractsAreRuntimeFree(items: CodespaceLifecycleContract[]): boolean {
  return items.every((item) => item.implementedRuntime === false && item.realCredentialInRepoAllowed === false);
}
