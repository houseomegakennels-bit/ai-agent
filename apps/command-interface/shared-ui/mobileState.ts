export type ShellMode = 'basic' | 'advanced';
export type SystemState = 'idle' | 'working' | 'waiting' | 'error' | 'completed' | 'emergency';

export interface HumanActionItem {
  id: string;
  label: string;
  priority: 'normal' | 'high' | 'critical';
}

export interface MobileShellState {
  mode: ShellMode;
  lowBandwidth: boolean;
  reducedMotion: boolean;
  currentProject: string;
  systemState: SystemState;
  humanActions: HumanActionItem[];
}

export const defaultMobileShellState: MobileShellState = {
  mode: 'basic',
  lowBandwidth: false,
  reducedMotion: false,
  currentProject: 'Blackspire Helix Command Core',
  systemState: 'idle',
  humanActions: [
    {
      id: 'release-2-review',
      label: 'Review Release -2 mobile framework handoff',
      priority: 'high',
    },
  ],
};

export function summarizeNeedsAttention(state: MobileShellState): string {
  if (state.humanActions.length === 0) {
    return 'No operator action required';
  }

  const criticalCount = state.humanActions.filter((item) => item.priority === 'critical').length;
  if (criticalCount > 0) {
    return `${criticalCount} critical action${criticalCount === 1 ? '' : 's'} required`;
  }

  return `${state.humanActions.length} action${state.humanActions.length === 1 ? '' : 's'} pending`;
}

export function canQueueOfflineAction(action: 'draft_task' | 'approve_deploy' | 'emergency_stop'): boolean {
  return action === 'draft_task';
}
