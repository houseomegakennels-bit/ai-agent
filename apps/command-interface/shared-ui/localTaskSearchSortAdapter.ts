import {
  LocalTaskSearchSortInput,
  LocalTaskSearchSortResult,
  localTaskSortKeys,
  searchAndSortLocalTasksInMemory,
} from '../../../core/tasks/localTaskSearchSort';
import { LocalTaskModel } from '../../../core/tasks/localTaskModel';

export type LocalTaskSearchSortViewState = 'ready' | 'empty' | 'validation_error' | 'loading' | 'error';

export interface LocalTaskSearchSortView {
  state: LocalTaskSearchSortViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  availableSorts: typeof localTaskSortKeys;
  result?: LocalTaskSearchSortResult;
}

export function buildLoadingTaskSearchSortView(): LocalTaskSearchSortView {
  return {
    state: 'loading',
    titleLabel: 'Searching local tasks',
    helperText: 'Preparing local mock search results without contacting live services.',
    operatorMessage: 'No live endpoint was contacted.',
    availableSorts: localTaskSortKeys,
  };
}

export function buildErrorTaskSearchSortView(): LocalTaskSearchSortView {
  return {
    state: 'error',
    titleLabel: 'Task search unavailable',
    helperText: 'Local mock task search could not be prepared.',
    operatorMessage: 'No task data was persisted and no live service was contacted.',
    availableSorts: localTaskSortKeys,
  };
}

export function buildTaskSearchSortView(input: LocalTaskSearchSortInput, tasks?: LocalTaskModel[]): LocalTaskSearchSortView {
  const result = searchAndSortLocalTasksInMemory(input, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix task search',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task data was persisted and no live endpoint was contacted.',
      availableSorts: localTaskSortKeys,
      result,
    };
  }

  if (result.status === 'empty') {
    return {
      state: 'empty',
      titleLabel: 'No local task matches',
      helperText: `Search ${result.query || 'all local tasks'} returned no mock tasks.`,
      operatorMessage: 'Empty search state was produced locally without contacting production services.',
      availableSorts: localTaskSortKeys,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Search local tasks',
    helperText: `${result.resultCount} local mock task${result.resultCount === 1 ? '' : 's'} match search ${result.query || 'all'}.`,
    operatorMessage: 'Task search and sort use in-memory mock data only.',
    availableSorts: localTaskSortKeys,
    result,
  };
}
