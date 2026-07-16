import { LocalTaskModel, LocalTaskState, mockLocalTasks } from './localTaskModel';

export interface LocalTaskCreationInput {
  title: string;
  state?: Extract<LocalTaskState, 'queued' | 'awaiting_user'>;
}

export interface LocalTaskCreationResult {
  status: 'success' | 'validation_error';
  task?: LocalTaskModel;
  tasks: LocalTaskModel[];
  errors: string[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
}

const allowedCreationStates: LocalTaskCreationInput['state'][] = ['queued', 'awaiting_user'];

export function validateLocalTaskCreation(input: LocalTaskCreationInput): string[] {
  const errors: string[] = [];
  const normalizedTitle = input.title.trim();

  if (normalizedTitle.length < 3) {
    errors.push('Task title must be at least 3 characters.');
  }

  if (normalizedTitle.length > 80) {
    errors.push('Task title must be 80 characters or fewer for iPhone review.');
  }

  if (input.state && !allowedCreationStates.includes(input.state)) {
    errors.push('Task state must be queued or awaiting_user for local creation.');
  }

  return errors;
}

export function createLocalTaskInMemory(
  input: LocalTaskCreationInput,
  existingTasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskCreationResult {
  const errors = validateLocalTaskCreation(input);

  if (errors.length > 0) {
    return {
      status: 'validation_error',
      tasks: existingTasks,
      errors,
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
    };
  }

  const task: LocalTaskModel = {
    taskId: `local-task-created-${existingTasks.length + 1}`,
    title: input.title.trim(),
    project: 'Blackspire Helix Command Core',
    state: input.state ?? 'queued',
    updatedAtLabel: 'In-memory mock data',
    requiresOperatorAction: input.state === 'awaiting_user',
    secretsIncluded: false,
    productionActionAllowed: false,
  };

  return {
    status: 'success',
    task,
    tasks: [task, ...existingTasks],
    errors: [],
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
  };
}
