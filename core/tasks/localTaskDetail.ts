import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskAuditEventType = 'created' | 'state_changed' | 'operator_note' | 'validation_checked';

export interface LocalTaskAuditEvent {
  eventId: string;
  taskId: string;
  eventType: LocalTaskAuditEventType;
  label: string;
  occurredAtLabel: string;
  actor: 'local_mock_adapter' | 'operator_preview';
  secretsIncluded: false;
  liveEndpointUsed: false;
  persistenceEnabled: false;
}

export interface LocalTaskDetail {
  task: LocalTaskModel;
  description: string;
  auditTrail: LocalTaskAuditEvent[];
  safeActionSummary: string;
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export interface LocalTaskDetailInput {
  taskId: string;
}

export interface LocalTaskDetailResult {
  status: 'success' | 'validation_error' | 'not_found';
  detail?: LocalTaskDetail;
  errors: string[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
}

export function validateLocalTaskDetailInput(input: LocalTaskDetailInput): string[] {
  const errors: string[] = [];
  const normalizedTaskId = input.taskId.trim();

  if (normalizedTaskId.length === 0) {
    errors.push('Task selection is required for local detail preview.');
  }

  if (normalizedTaskId.length > 96) {
    errors.push('Task selection must be 96 characters or fewer for iPhone review.');
  }

  if (normalizedTaskId.includes('://')) {
    errors.push('Task selection must be a local mock task id, not a live URL.');
  }

  return errors;
}

function buildMockAuditTrail(task: LocalTaskModel): LocalTaskAuditEvent[] {
  return [
    {
      eventId: `${task.taskId}-created`,
      taskId: task.taskId,
      eventType: 'created',
      label: `${task.title} was added to local mock memory.`,
      occurredAtLabel: task.updatedAtLabel,
      actor: 'local_mock_adapter',
      secretsIncluded: false,
      liveEndpointUsed: false,
      persistenceEnabled: false,
    },
    {
      eventId: `${task.taskId}-validation`,
      taskId: task.taskId,
      eventType: 'validation_checked',
      label: 'Safety flags confirmed: no persistence, no live endpoint, no secrets.',
      occurredAtLabel: 'Local validation only',
      actor: 'local_mock_adapter',
      secretsIncluded: false,
      liveEndpointUsed: false,
      persistenceEnabled: false,
    },
    {
      eventId: `${task.taskId}-operator-preview`,
      taskId: task.taskId,
      eventType: task.requiresOperatorAction ? 'operator_note' : 'state_changed',
      label: task.requiresOperatorAction ? 'Operator attention is required before any future action.' : `Task is currently ${task.state} in mock data.`,
      occurredAtLabel: 'Command-interface preview',
      actor: 'operator_preview',
      secretsIncluded: false,
      liveEndpointUsed: false,
      persistenceEnabled: false,
    },
  ];
}

export function getLocalTaskDetailInMemory(
  input: LocalTaskDetailInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskDetailResult {
  const errors = validateLocalTaskDetailInput(input);

  if (errors.length > 0) {
    return {
      status: 'validation_error',
      errors,
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
    };
  }

  const task = tasks.find((candidate) => candidate.taskId === input.taskId.trim());

  if (!task) {
    return {
      status: 'not_found',
      errors: ['Task was not found in local mock memory.'],
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
    };
  }

  return {
    status: 'success',
    detail: {
      task,
      description: `${task.title} is available for local-only detail preview on iPhone.`,
      auditTrail: buildMockAuditTrail(task),
      safeActionSummary: 'Detail preview is read-only mock data. No persistence, live endpoint, secret, or production action is enabled.',
      persistenceEnabled: false,
      liveEndpointUsed: false,
      secretsIncluded: false,
      productionActionAllowed: false,
    },
    errors: [],
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
  };
}
