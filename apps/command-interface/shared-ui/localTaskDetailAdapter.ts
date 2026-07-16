import { getLocalTaskDetailInMemory, LocalTaskDetailResult } from '../../../core/tasks/localTaskDetail';
import { LocalTaskModel } from '../../../core/tasks/localTaskModel';

export type LocalTaskDetailViewState = 'ready' | 'validation_error' | 'not_found' | 'loading' | 'error';

export interface LocalTaskDetailView {
  state: LocalTaskDetailViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  result?: LocalTaskDetailResult;
}

export function buildLoadingTaskDetailView(): LocalTaskDetailView {
  return {
    state: 'loading',
    titleLabel: 'Loading local task detail',
    helperText: 'Preparing a read-only task preview from local mock memory.',
    operatorMessage: 'No live endpoint was contacted.',
  };
}

export function buildErrorTaskDetailView(): LocalTaskDetailView {
  return {
    state: 'error',
    titleLabel: 'Task detail unavailable',
    helperText: 'Local mock task detail could not be prepared.',
    operatorMessage: 'No task data was persisted and no live service was contacted.',
  };
}

export function buildTaskDetailView(taskId: string, tasks?: LocalTaskModel[]): LocalTaskDetailView {
  const result = getLocalTaskDetailInMemory({ taskId }, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Select a local task',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task data was persisted and no live endpoint was contacted.',
      result,
    };
  }

  if (result.status === 'not_found') {
    return {
      state: 'not_found',
      titleLabel: 'Task detail not found',
      helperText: result.errors.join(' '),
      operatorMessage: 'The lookup used local mock memory only.',
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: result.detail?.task.title ?? 'Local task detail',
    helperText: result.detail?.description ?? 'Local detail preview is ready.',
    operatorMessage: result.detail?.safeActionSummary ?? 'No live endpoint was contacted.',
    result,
  };
}
