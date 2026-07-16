import { LocalTaskModel, LocalTaskState, mockLocalTasks } from './localTaskModel';

export type LocalTaskFilterKey = 'all' | 'needs_attention' | 'queued' | 'awaiting_user' | 'completed' | 'failed';
export type LocalTaskGroupKey = 'needs_attention' | 'active' | 'done' | 'failed';

export interface LocalTaskFilterInput {
  filter: LocalTaskFilterKey;
}

export interface LocalTaskGroup {
  key: LocalTaskGroupKey;
  label: string;
  tasks: LocalTaskModel[];
  emptyMessage: string;
}

export interface LocalTaskFilterResult {
  status: 'success' | 'empty' | 'validation_error';
  filter: LocalTaskFilterKey;
  tasks: LocalTaskModel[];
  groups: LocalTaskGroup[];
  counts: Record<LocalTaskGroupKey, number>;
  errors: string[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
}

const stateFilters: Partial<Record<LocalTaskFilterKey, LocalTaskState>> = {
  queued: 'queued',
  awaiting_user: 'awaiting_user',
  completed: 'completed',
  failed: 'failed',
};

const groupMetadata: Record<LocalTaskGroupKey, { label: string; emptyMessage: string }> = {
  needs_attention: {
    label: 'Needs attention',
    emptyMessage: 'No local mock tasks need operator attention.',
  },
  active: {
    label: 'Active or queued',
    emptyMessage: 'No local mock tasks are active or queued.',
  },
  done: {
    label: 'Done',
    emptyMessage: 'No local mock tasks are complete.',
  },
  failed: {
    label: 'Failed',
    emptyMessage: 'No local mock tasks have failed.',
  },
};

export const localTaskFilterKeys: LocalTaskFilterKey[] = ['all', 'needs_attention', 'queued', 'awaiting_user', 'completed', 'failed'];

export function validateLocalTaskFilter(input: LocalTaskFilterInput): string[] {
  if (!localTaskFilterKeys.includes(input.filter)) {
    return ['Task filter is not allowed for local mock grouping.'];
  }

  return [];
}

export function filterLocalTasksInMemory(
  input: LocalTaskFilterInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskFilterResult {
  const errors = validateLocalTaskFilter(input);

  if (errors.length > 0) {
    return buildLocalTaskFilterResult('validation_error', input.filter, [], errors);
  }

  const filteredTasks = tasks.filter((task) => {
    if (input.filter === 'all') {
      return true;
    }

    if (input.filter === 'needs_attention') {
      return task.requiresOperatorAction;
    }

    return task.state === stateFilters[input.filter];
  });

  return buildLocalTaskFilterResult(filteredTasks.length === 0 ? 'empty' : 'success', input.filter, filteredTasks, []);
}

function buildLocalTaskFilterResult(
  status: LocalTaskFilterResult['status'],
  filter: LocalTaskFilterKey,
  tasks: LocalTaskModel[],
  errors: string[],
): LocalTaskFilterResult {
  const groups = groupLocalTasks(tasks);

  return {
    status,
    filter,
    tasks,
    groups,
    counts: groups.reduce((counts, group) => ({ ...counts, [group.key]: group.tasks.length }), {
      needs_attention: 0,
      active: 0,
      done: 0,
      failed: 0,
    }),
    errors,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
  };
}

export function groupLocalTasks(tasks: LocalTaskModel[]): LocalTaskGroup[] {
  const grouped: Record<LocalTaskGroupKey, LocalTaskModel[]> = {
    needs_attention: tasks.filter((task) => task.requiresOperatorAction),
    active: tasks.filter((task) => ['queued', 'running', 'awaiting_user'].includes(task.state)),
    done: tasks.filter((task) => task.state === 'completed'),
    failed: tasks.filter((task) => task.state === 'failed'),
  };

  return (Object.keys(groupMetadata) as LocalTaskGroupKey[]).map((key) => ({
    key,
    label: groupMetadata[key].label,
    tasks: grouped[key],
    emptyMessage: groupMetadata[key].emptyMessage,
  }));
}
