import {
  LocalTaskUpdateAction,
  LocalTaskUpdateInput,
  LocalTaskUpdateResult,
  updateLocalTaskInMemory,
} from '../../../core/tasks/localTaskUpdate';
import { LocalTaskModel } from '../../../core/tasks/localTaskModel';

export type LocalTaskUpdateViewState = 'idle' | 'success' | 'validation_error' | 'not_found' | 'loading' | 'error';

export interface LocalTaskUpdateView {
  state: LocalTaskUpdateViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  allowedActions: LocalTaskUpdateAction[];
  result?: LocalTaskUpdateResult;
}

export const localTaskUpdateActions: LocalTaskUpdateAction[] = [
  'mark_completed',
  'mark_awaiting_user',
  'mark_queued',
  'mark_failed',
];

export function buildIdleTaskUpdateView(): LocalTaskUpdateView {
  return {
    state: 'idle',
    titleLabel: 'Update local mock task',
    helperText: 'Choose a mock action to preview a task state change in memory.',
    operatorMessage: 'No persistence, live endpoint, secret, or production action is enabled.',
    allowedActions: localTaskUpdateActions,
  };
}

export function buildLoadingTaskUpdateView(): LocalTaskUpdateView {
  return {
    state: 'loading',
    titleLabel: 'Updating local mock task',
    helperText: 'Simulating local-only task update without contacting live services.',
    operatorMessage: 'No live endpoint was contacted.',
    allowedActions: localTaskUpdateActions,
  };
}

export function buildErrorTaskUpdateView(): LocalTaskUpdateView {
  return {
    state: 'error',
    titleLabel: 'Task update unavailable',
    helperText: 'The local update adapter could not produce a mock task update preview.',
    operatorMessage: 'No task was persisted and no live service was contacted.',
    allowedActions: localTaskUpdateActions,
  };
}

export function buildTaskUpdateResultView(input: LocalTaskUpdateInput, tasks?: LocalTaskModel[]): LocalTaskUpdateView {
  const result = updateLocalTaskInMemory(input, tasks);

  if (result.status === 'validation_error' || result.status === 'not_found') {
    return {
      state: result.status,
      titleLabel: result.status === 'not_found' ? 'Task not found' : 'Fix task update',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task was persisted and no live endpoint was contacted.',
      allowedActions: localTaskUpdateActions,
      result,
    };
  }

  return {
    state: 'success',
    titleLabel: 'Local task update previewed',
    helperText: `${result.task?.title} is now ${result.task?.state} in local mock memory.`,
    operatorMessage: 'Task update exists only in mock memory for this release.',
    allowedActions: localTaskUpdateActions,
    result,
  };
}
