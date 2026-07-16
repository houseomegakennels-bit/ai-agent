import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskSortKey = 'updated_desc' | 'updated_asc' | 'title_asc' | 'state_asc' | 'attention_first';

export interface LocalTaskSearchSortInput {
  query: string;
  sort: LocalTaskSortKey;
}

export interface LocalTaskSearchSortResult {
  status: 'success' | 'empty' | 'validation_error';
  query: string;
  sort: LocalTaskSortKey;
  tasks: LocalTaskModel[];
  resultCount: number;
  errors: string[];
  availableSorts: LocalTaskSortKey[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
}

export const localTaskSortKeys: LocalTaskSortKey[] = ['updated_desc', 'updated_asc', 'title_asc', 'state_asc', 'attention_first'];

export function validateLocalTaskSearchSort(input: LocalTaskSearchSortInput): string[] {
  const errors: string[] = [];
  const normalizedQuery = input.query.trim();

  if (normalizedQuery.length > 64) {
    errors.push('Task search query must be 64 characters or fewer for iPhone review.');
  }

  if (normalizedQuery.includes('://')) {
    errors.push('Task search query must be local text, not a live URL.');
  }

  if (!localTaskSortKeys.includes(input.sort)) {
    errors.push('Task sort is not allowed for local mock search.');
  }

  return errors;
}

export function searchAndSortLocalTasksInMemory(
  input: LocalTaskSearchSortInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskSearchSortResult {
  const errors = validateLocalTaskSearchSort(input);
  const normalizedQuery = input.query.trim().toLocaleLowerCase();

  if (errors.length > 0) {
    return buildLocalTaskSearchSortResult('validation_error', input.query, input.sort, [], errors);
  }

  const searchedTasks = normalizedQuery.length === 0
    ? tasks
    : tasks.filter((task) => [task.taskId, task.title, task.state, task.project]
      .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));

  const sortedTasks = sortLocalTasks(searchedTasks, input.sort);

  return buildLocalTaskSearchSortResult(sortedTasks.length === 0 ? 'empty' : 'success', input.query, input.sort, sortedTasks, []);
}

export function sortLocalTasks(tasks: LocalTaskModel[], sort: LocalTaskSortKey): LocalTaskModel[] {
  const copy = [...tasks];

  if (sort === 'attention_first') {
    return copy.sort((a, b) => Number(b.requiresOperatorAction) - Number(a.requiresOperatorAction) || a.title.localeCompare(b.title));
  }

  if (sort === 'title_asc') {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === 'state_asc') {
    return copy.sort((a, b) => a.state.localeCompare(b.state) || a.title.localeCompare(b.title));
  }

  if (sort === 'updated_asc') {
    return copy.reverse();
  }

  return copy;
}

function buildLocalTaskSearchSortResult(
  status: LocalTaskSearchSortResult['status'],
  query: string,
  sort: LocalTaskSortKey,
  tasks: LocalTaskModel[],
  errors: string[],
): LocalTaskSearchSortResult {
  return {
    status,
    query: query.trim(),
    sort,
    tasks,
    resultCount: tasks.length,
    errors,
    availableSorts: localTaskSortKeys,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
  };
}
