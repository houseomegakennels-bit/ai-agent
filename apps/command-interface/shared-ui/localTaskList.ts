import { LocalTaskModel, mockLocalTasks, summarizeLocalTaskState } from '../../../core/tasks/localTaskModel';

export type LocalTaskListViewState = 'ready' | 'empty' | 'loading' | 'error';

export interface LocalTaskListView {
  state: LocalTaskListViewState;
  tasks: LocalTaskModel[];
  summary: string;
  operatorMessage: string;
}

export function buildMockTaskListView(tasks: LocalTaskModel[] = mockLocalTasks): LocalTaskListView {
  if (tasks.length === 0) {
    return buildEmptyTaskListView();
  }

  return {
    state: 'ready',
    tasks,
    summary: summarizeLocalTaskState(tasks),
    operatorMessage: 'Local task list uses mock data only. No live task action was attempted.',
  };
}

export function buildEmptyTaskListView(): LocalTaskListView {
  return {
    state: 'empty',
    tasks: [],
    summary: 'No local tasks',
    operatorMessage: 'No mock tasks are currently available.',
  };
}

export function buildLoadingTaskListView(): LocalTaskListView {
  return {
    state: 'loading',
    tasks: [],
    summary: 'Loading local tasks',
    operatorMessage: 'Loading local mock task data without contacting production services.',
  };
}

export function buildErrorTaskListView(): LocalTaskListView {
  return {
    state: 'error',
    tasks: [],
    summary: 'Task list unavailable',
    operatorMessage: 'Local task list could not be read. No live task action was attempted.',
  };
}
