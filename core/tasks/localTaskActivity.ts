import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskActivityKind = 'task_created' | 'task_updated' | 'note_previewed' | 'timeline_reviewed' | 'bulk_selection_previewed';
export type LocalTaskActivityFilter = 'all' | 'needs_attention' | 'recent_changes';

export interface LocalTaskActivityEvent {
  eventId: string;
  taskId: string;
  kind: LocalTaskActivityKind;
  label: string;
  occurredAtLabel: string;
  actorLabel: 'local_mock_adapter' | 'operator_preview';
  requiresOperatorAction: boolean;
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export interface LocalTaskActivityInput {
  filter: LocalTaskActivityFilter;
  limit: number;
}

export interface LocalTaskActivityResult {
  status: 'success' | 'empty' | 'validation_error';
  filter: LocalTaskActivityFilter;
  events: LocalTaskActivityEvent[];
  groupedByTask: Array<{ taskId: string; taskTitle: string; events: LocalTaskActivityEvent[] }>;
  errors: string[];
  summary: string;
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export const localTaskActivityFilters: LocalTaskActivityFilter[] = ['all', 'needs_attention', 'recent_changes'];

export const mockLocalTaskActivityEvents: LocalTaskActivityEvent[] = [
  {
    eventId: 'local-activity-release-20-note-previewed',
    taskId: 'local-task-release-12-review',
    kind: 'note_previewed',
    label: 'Release 20 note preview was prepared locally.',
    occurredAtLabel: 'Local mock recent change',
    actorLabel: 'operator_preview',
    requiresOperatorAction: true,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
  {
    eventId: 'local-activity-release-19-timeline-reviewed',
    taskId: 'local-task-release-12-review',
    kind: 'timeline_reviewed',
    label: 'Release 19 daily focus preview was reviewed locally.',
    occurredAtLabel: 'Local mock earlier change',
    actorLabel: 'local_mock_adapter',
    requiresOperatorAction: true,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
  {
    eventId: 'local-activity-controller-status-updated',
    taskId: 'local-task-controller-status',
    kind: 'task_updated',
    label: 'Controller status task stayed completed in local mock memory.',
    occurredAtLabel: 'Local mock earlier change',
    actorLabel: 'local_mock_adapter',
    requiresOperatorAction: false,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
];

export function validateLocalTaskActivityInput(input: LocalTaskActivityInput): string[] {
  const errors: string[] = [];

  if (!localTaskActivityFilters.includes(input.filter)) {
    errors.push('Activity feed filter is not allowed for local mock preview.');
  }

  if (!Number.isInteger(input.limit) || input.limit < 1 || input.limit > 20) {
    errors.push('Activity feed limit must be an integer from 1 to 20.');
  }

  return errors;
}

export function buildLocalTaskActivityFeedInMemory(
  input: LocalTaskActivityInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
  events: LocalTaskActivityEvent[] = mockLocalTaskActivityEvents,
): LocalTaskActivityResult {
  const errors = validateLocalTaskActivityInput(input);
  if (errors.length > 0) {
    return buildLocalTaskActivityResult('validation_error', input.filter, [], tasks, errors);
  }

  const filteredEvents = events
    .filter((event) => {
      if (input.filter === 'needs_attention') {
        return event.requiresOperatorAction;
      }

      if (input.filter === 'recent_changes') {
        return ['note_previewed', 'timeline_reviewed', 'task_updated'].includes(event.kind);
      }

      return true;
    })
    .slice(0, input.limit);

  return buildLocalTaskActivityResult(filteredEvents.length === 0 ? 'empty' : 'success', input.filter, filteredEvents, tasks, []);
}

function buildLocalTaskActivityResult(
  status: LocalTaskActivityResult['status'],
  filter: LocalTaskActivityFilter,
  events: LocalTaskActivityEvent[],
  tasks: LocalTaskModel[],
  errors: string[],
): LocalTaskActivityResult {
  const groupedByTask = tasks
    .map((task) => ({
      taskId: task.taskId,
      taskTitle: task.title,
      events: events.filter((event) => event.taskId === task.taskId),
    }))
    .filter((group) => group.events.length > 0);

  const summary =
    status === 'validation_error'
      ? 'Local activity feed needs a safe filter and limit.'
      : `${events.length} local mock activity event${events.length === 1 ? '' : 's'} match ${filter}.`;

  return {
    status,
    filter,
    events,
    groupedByTask,
    errors,
    summary,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  };
}
