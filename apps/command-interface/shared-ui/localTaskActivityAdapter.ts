import {
  buildLocalTaskActivityFeedInMemory,
  LocalTaskActivityInput,
  LocalTaskActivityResult,
  localTaskActivityFilters,
} from '../../../core/tasks/localTaskActivity';
import { LocalTaskModel, mockLocalTasks } from '../../../core/tasks/localTaskModel';

export type LocalTaskActivityViewState = 'ready' | 'empty' | 'validation_error' | 'loading' | 'error';

export interface LocalTaskActivityView {
  state: LocalTaskActivityViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  availableFilters: typeof localTaskActivityFilters;
  result?: LocalTaskActivityResult;
}

export function buildTaskActivityView(
  input: LocalTaskActivityInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskActivityView {
  const result = buildLocalTaskActivityFeedInMemory(input, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix activity feed preview',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No activity was persisted and no live endpoint was contacted.',
      availableFilters: localTaskActivityFilters,
      result,
    };
  }

  if (result.status === 'empty') {
    return {
      state: 'empty',
      titleLabel: 'No local activity yet',
      helperText: `No mock activity events match ${result.filter}.`,
      operatorMessage: 'Empty activity state is local-only mock data for iPhone review.',
      availableFilters: localTaskActivityFilters,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Recent local activity',
    helperText: result.summary,
    operatorMessage: 'Activity feed and recent changes use in-memory mock data only.',
    availableFilters: localTaskActivityFilters,
    result,
  };
}

export function buildLoadingTaskActivityView(): LocalTaskActivityView {
  return {
    state: 'loading',
    titleLabel: 'Loading activity feed',
    helperText: 'Preparing local mock recent changes for iPhone review.',
    operatorMessage: 'Loading state is mocked locally; no live endpoint is contacted.',
    availableFilters: localTaskActivityFilters,
  };
}

export function buildErrorTaskActivityView(): LocalTaskActivityView {
  return {
    state: 'error',
    titleLabel: 'Activity feed unavailable',
    helperText: 'Local activity preview could not be prepared.',
    operatorMessage: 'Error state is local-only and does not expose secrets or production actions.',
    availableFilters: localTaskActivityFilters,
  };
}
