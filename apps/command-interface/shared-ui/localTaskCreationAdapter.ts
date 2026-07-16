import {
  LocalTaskCreationInput,
  LocalTaskCreationResult,
  createLocalTaskInMemory,
} from '../../../core/tasks/localTaskCreation';

export type LocalTaskCreationViewState = 'idle' | 'success' | 'validation_error' | 'loading' | 'error';

export interface LocalTaskCreationView {
  state: LocalTaskCreationViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  result?: LocalTaskCreationResult;
}

export function buildIdleTaskCreationView(): LocalTaskCreationView {
  return {
    state: 'idle',
    titleLabel: 'Create local mock task',
    helperText: 'Enter a short task title to preview in-memory task creation.',
    operatorMessage: 'No persistence, live endpoint, secret, or production action is enabled.',
  };
}

export function buildLoadingTaskCreationView(): LocalTaskCreationView {
  return {
    state: 'loading',
    titleLabel: 'Creating local mock task',
    helperText: 'Simulating local-only task creation without contacting live services.',
    operatorMessage: 'No live endpoint was contacted.',
  };
}

export function buildErrorTaskCreationView(): LocalTaskCreationView {
  return {
    state: 'error',
    titleLabel: 'Create task unavailable',
    helperText: 'The local creation adapter could not produce a mock task preview.',
    operatorMessage: 'No task was persisted and no live service was contacted.',
  };
}

export function buildTaskCreationResultView(input: LocalTaskCreationInput): LocalTaskCreationView {
  const result = createLocalTaskInMemory(input);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix task details',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task was persisted and no live endpoint was contacted.',
      result,
    };
  }

  return {
    state: 'success',
    titleLabel: 'Local task preview created',
    helperText: `${result.task?.title} is queued in memory for operator review.`,
    operatorMessage: 'Task exists only in mock memory for this release.',
    result,
  };
}
