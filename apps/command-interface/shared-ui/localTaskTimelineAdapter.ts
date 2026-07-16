import { buildLocalTaskDailyFocusInMemory, LocalTaskDailyFocusInput, LocalTaskDailyFocusResult } from '../../../core/tasks/localTaskTimeline';
import { LocalTaskModel, mockLocalTasks } from '../../../core/tasks/localTaskModel';

export type LocalTaskTimelineViewState = 'ready' | 'empty' | 'validation_error' | 'loading' | 'error';

export interface LocalTaskTimelineView {
  state: LocalTaskTimelineViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  result?: LocalTaskDailyFocusResult;
}

export function buildTaskTimelineView(
  input: LocalTaskDailyFocusInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskTimelineView {
  const result = buildLocalTaskDailyFocusInMemory(input, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix daily focus preview',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No timeline was persisted and no live endpoint was contacted.',
      result,
    };
  }

  if (result.status === 'empty') {
    return {
      state: 'empty',
      titleLabel: 'No local tasks in focus',
      helperText: `No mock tasks are available for ${result.focusDateLabel}.`,
      operatorMessage: 'Empty state is local-only mock data for iPhone review.',
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Daily focus preview',
    helperText: result.dailySummary,
    operatorMessage: 'Timeline and daily focus use in-memory mock data only.',
    result,
  };
}

export function buildLoadingTaskTimelineView(): LocalTaskTimelineView {
  return {
    state: 'loading',
    titleLabel: 'Loading daily focus',
    helperText: 'Preparing local mock timeline buckets for iPhone review.',
    operatorMessage: 'Loading state is mocked locally; no live endpoint is contacted.',
  };
}

export function buildErrorTaskTimelineView(): LocalTaskTimelineView {
  return {
    state: 'error',
    titleLabel: 'Daily focus unavailable',
    helperText: 'Local task timeline preview could not be prepared.',
    operatorMessage: 'Error state is local-only and does not expose secrets or production actions.',
  };
}
