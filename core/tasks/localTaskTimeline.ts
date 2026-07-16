import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskTimelineBucketKey = 'needs_attention_today' | 'active_today' | 'completed_today' | 'blocked_or_failed';

export interface LocalTaskDailyFocusInput {
  focusDateLabel: string;
  includeCompleted: boolean;
}

export interface LocalTaskTimelineBucket {
  key: LocalTaskTimelineBucketKey;
  label: string;
  tasks: LocalTaskModel[];
  emptyMessage: string;
}

export interface LocalTaskDailyFocusResult {
  status: 'success' | 'empty' | 'validation_error';
  focusDateLabel: string;
  includeCompleted: boolean;
  buckets: LocalTaskTimelineBucket[];
  recommendedTaskIds: string[];
  dailySummary: string;
  errors: string[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

const bucketMetadata: Record<LocalTaskTimelineBucketKey, { label: string; emptyMessage: string }> = {
  needs_attention_today: {
    label: 'Needs attention today',
    emptyMessage: 'No local mock tasks need operator attention for this focus window.',
  },
  active_today: {
    label: 'Active today',
    emptyMessage: 'No queued, running, or awaiting-user local mock tasks are active for this focus window.',
  },
  completed_today: {
    label: 'Completed today',
    emptyMessage: 'Completed local mock tasks are hidden or unavailable for this focus window.',
  },
  blocked_or_failed: {
    label: 'Blocked or failed',
    emptyMessage: 'No local mock tasks are blocked or failed for this focus window.',
  },
};

export function validateLocalTaskDailyFocus(input: LocalTaskDailyFocusInput): string[] {
  const errors: string[] = [];
  const label = input.focusDateLabel.trim();

  if (label.length === 0) {
    errors.push('Focus date label is required for the local timeline preview.');
  }

  if (label.length > 64) {
    errors.push('Focus date label must be 64 characters or fewer.');
  }

  if (label.includes('://')) {
    errors.push('Focus date label cannot include live URLs or endpoints.');
  }

  return errors;
}

export function buildLocalTaskDailyFocusInMemory(
  input: LocalTaskDailyFocusInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskDailyFocusResult {
  const errors = validateLocalTaskDailyFocus(input);
  const focusDateLabel = input.focusDateLabel.trim();

  if (errors.length > 0) {
    return buildLocalTaskDailyFocusResult('validation_error', focusDateLabel, input.includeCompleted, [], errors);
  }

  const buckets = groupLocalTasksForDailyFocus(tasks, input.includeCompleted);
  const totalBucketedTasks = buckets.reduce((total, bucket) => total + bucket.tasks.length, 0);
  const recommendedTaskIds = buckets
    .flatMap((bucket) => bucket.tasks)
    .filter((task, index, allTasks) => allTasks.findIndex((candidate) => candidate.taskId === task.taskId) === index)
    .slice(0, 2)
    .map((task) => task.taskId);

  return buildLocalTaskDailyFocusResult(
    totalBucketedTasks === 0 ? 'empty' : 'success',
    focusDateLabel,
    input.includeCompleted,
    buckets,
    [],
    recommendedTaskIds,
  );
}

export function groupLocalTasksForDailyFocus(tasks: LocalTaskModel[], includeCompleted: boolean): LocalTaskTimelineBucket[] {
  const grouped: Record<LocalTaskTimelineBucketKey, LocalTaskModel[]> = {
    needs_attention_today: tasks.filter((task) => task.requiresOperatorAction),
    active_today: tasks.filter((task) => ['queued', 'running', 'awaiting_user'].includes(task.state)),
    completed_today: includeCompleted ? tasks.filter((task) => task.state === 'completed') : [],
    blocked_or_failed: tasks.filter((task) => task.state === 'failed'),
  };

  return (Object.keys(bucketMetadata) as LocalTaskTimelineBucketKey[]).map((key) => ({
    key,
    label: bucketMetadata[key].label,
    tasks: grouped[key],
    emptyMessage: bucketMetadata[key].emptyMessage,
  }));
}

function buildLocalTaskDailyFocusResult(
  status: LocalTaskDailyFocusResult['status'],
  focusDateLabel: string,
  includeCompleted: boolean,
  buckets: LocalTaskTimelineBucket[],
  errors: string[],
  recommendedTaskIds: string[] = [],
): LocalTaskDailyFocusResult {
  const totalTasks = buckets.reduce((total, bucket) => total + bucket.tasks.length, 0);
  const dailySummary =
    status === 'validation_error'
      ? 'Local daily focus preview needs a safe focus label.'
      : `${totalTasks} local mock task${totalTasks === 1 ? '' : 's'} are in ${focusDateLabel}'s focus preview.`;

  return {
    status,
    focusDateLabel,
    includeCompleted,
    buckets,
    recommendedTaskIds,
    dailySummary,
    errors,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  };
}
