import { LocalTaskModel, LocalTaskState, mockLocalTasks } from './localTaskModel';

export type LocalTaskUpdateAction = 'mark_completed' | 'mark_awaiting_user' | 'mark_queued' | 'mark_failed';

export interface LocalTaskUpdateInput {
  taskId: string;
  action: LocalTaskUpdateAction;
}

export interface LocalTaskUpdateResult {
  status: 'success' | 'validation_error' | 'not_found';
  action: LocalTaskUpdateAction;
  task?: LocalTaskModel;
  tasks: LocalTaskModel[];
  errors: string[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
}

const updateStateByAction: Record<LocalTaskUpdateAction, Extract<LocalTaskState, 'queued' | 'awaiting_user' | 'completed' | 'failed'>> = {
  mark_completed: 'completed',
  mark_awaiting_user: 'awaiting_user',
  mark_queued: 'queued',
  mark_failed: 'failed',
};

export function validateLocalTaskUpdate(input: LocalTaskUpdateInput): string[] {
  const errors: string[] = [];

  if (input.taskId.trim().length === 0) {
    errors.push('Task id is required for local update.');
  }

  if (!Object.hasOwn(updateStateByAction, input.action)) {
    errors.push('Task update action is not allowed for local mock updates.');
  }

  return errors;
}

export function updateLocalTaskInMemory(
  input: LocalTaskUpdateInput,
  existingTasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskUpdateResult {
  const errors = validateLocalTaskUpdate(input);

  if (errors.length > 0) {
    return {
      status: 'validation_error',
      action: input.action,
      tasks: existingTasks,
      errors,
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
    };
  }

  const target = existingTasks.find((task) => task.taskId === input.taskId);
  if (!target) {
    return {
      status: 'not_found',
      action: input.action,
      tasks: existingTasks,
      errors: ['Task was not found in local mock memory.'],
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
    };
  }

  const nextState = updateStateByAction[input.action];
  const task: LocalTaskModel = {
    ...target,
    state: nextState,
    updatedAtLabel: 'Updated in local mock memory',
    requiresOperatorAction: nextState === 'awaiting_user',
    secretsIncluded: false,
    productionActionAllowed: false,
  };

  return {
    status: 'success',
    action: input.action,
    task,
    tasks: existingTasks.map((candidate) => (candidate.taskId === input.taskId ? task : candidate)),
    errors: [],
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
  };
}
