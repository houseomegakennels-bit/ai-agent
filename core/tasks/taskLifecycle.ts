export type TaskState =
  | 'received'
  | 'validated'
  | 'awaiting_approval'
  | 'queued'
  | 'starting_environment'
  | 'running'
  | 'awaiting_user'
  | 'analyzing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'timed_out';

export interface DurableTaskContract {
  taskId: string;
  project: string;
  state: TaskState;
  idempotencyKey: string;
  auditRequired: true;
  costEstimateRequired: true;
  secretValuesAllowed: false;
}

export const requiredTaskFields = [
  'taskId',
  'project',
  'repository',
  'branch',
  'files',
  'instruction',
  'modelRoute',
  'codespace',
  'approvals',
  'runtime',
  'costEstimate',
  'outputs',
  'errors',
  'retryCount',
  'auditTrail',
  'idempotencyKey',
] as const;

export function canTransitionTask(from: TaskState, to: TaskState): boolean {
  const allowed: Record<TaskState, TaskState[]> = {
    received: ['validated', 'failed', 'cancelled'],
    validated: ['awaiting_approval', 'queued', 'failed', 'cancelled'],
    awaiting_approval: ['queued', 'cancelled', 'timed_out'],
    queued: ['starting_environment', 'running', 'cancelled', 'timed_out'],
    starting_environment: ['running', 'failed', 'timed_out'],
    running: ['awaiting_user', 'analyzing', 'completed', 'failed', 'timed_out'],
    awaiting_user: ['running', 'cancelled', 'timed_out'],
    analyzing: ['completed', 'failed'],
    completed: [],
    failed: [],
    cancelled: [],
    timed_out: [],
  };

  return allowed[from].includes(to);
}
