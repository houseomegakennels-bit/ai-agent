export type LocalTaskState = 'queued' | 'running' | 'awaiting_user' | 'completed' | 'failed' | 'empty' | 'loading' | 'error';

export interface LocalTaskModel {
  taskId: string;
  title: string;
  project: 'Blackspire Helix Command Core';
  state: LocalTaskState;
  updatedAtLabel: string;
  requiresOperatorAction: boolean;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export const mockLocalTasks: LocalTaskModel[] = [
  {
    taskId: 'local-task-release-12-review',
    title: 'Review Release 12 local task list',
    project: 'Blackspire Helix Command Core',
    state: 'awaiting_user',
    updatedAtLabel: 'Local mock data',
    requiresOperatorAction: true,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
  {
    taskId: 'local-task-controller-status',
    title: 'Verify controller status panel',
    project: 'Blackspire Helix Command Core',
    state: 'completed',
    updatedAtLabel: 'Local mock data',
    requiresOperatorAction: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
];

export function summarizeLocalTaskState(tasks: LocalTaskModel[]): string {
  if (tasks.length === 0) {
    return 'No local tasks';
  }

  const actionable = tasks.filter((task) => task.requiresOperatorAction).length;
  if (actionable > 0) {
    return `${actionable} local task${actionable === 1 ? '' : 's'} need attention`;
  }

  return `${tasks.length} local task${tasks.length === 1 ? '' : 's'} tracked`;
}
