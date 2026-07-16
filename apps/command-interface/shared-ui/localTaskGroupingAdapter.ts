import {
  LocalTaskFilterInput,
  LocalTaskFilterResult,
  filterLocalTasksInMemory,
  localTaskFilterKeys,
} from '../../../core/tasks/localTaskFilters';
import { LocalTaskModel } from '../../../core/tasks/localTaskModel';

export type LocalTaskGroupingViewState = 'ready' | 'empty' | 'validation_error' | 'loading' | 'error';

export interface LocalTaskGroupingView {
  state: LocalTaskGroupingViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  availableFilters: typeof localTaskFilterKeys;
  result?: LocalTaskFilterResult;
}

export function buildLoadingTaskGroupingView(): LocalTaskGroupingView {
  return {
    state: 'loading',
    titleLabel: 'Grouping local tasks',
    helperText: 'Preparing local mock task groups without contacting live services.',
    operatorMessage: 'No live endpoint was contacted.',
    availableFilters: localTaskFilterKeys,
  };
}

export function buildErrorTaskGroupingView(): LocalTaskGroupingView {
  return {
    state: 'error',
    titleLabel: 'Task groups unavailable',
    helperText: 'Local mock task grouping could not be prepared.',
    operatorMessage: 'No task data was persisted and no live service was contacted.',
    availableFilters: localTaskFilterKeys,
  };
}

export function buildTaskGroupingView(input: LocalTaskFilterInput, tasks?: LocalTaskModel[]): LocalTaskGroupingView {
  const result = filterLocalTasksInMemory(input, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix task filter',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task data was persisted and no live endpoint was contacted.',
      availableFilters: localTaskFilterKeys,
      result,
    };
  }

  if (result.status === 'empty') {
    return {
      state: 'empty',
      titleLabel: 'No matching local tasks',
      helperText: `Filter ${input.filter} has no local mock matches.`,
      operatorMessage: 'Empty state was produced locally without contacting production services.',
      availableFilters: localTaskFilterKeys,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Local task groups',
    helperText: `${result.tasks.length} local mock task${result.tasks.length === 1 ? '' : 's'} match ${input.filter}.`,
    operatorMessage: 'Task grouping uses in-memory mock data only.',
    availableFilters: localTaskFilterKeys,
    result,
  };
}
