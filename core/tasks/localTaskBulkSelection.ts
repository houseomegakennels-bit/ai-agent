import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskBulkPreviewAction = 'review_selected' | 'mark_selected_queued' | 'clear_selection';

export interface LocalTaskBulkSelectionInput {
  selectedTaskIds: string[];
  action: LocalTaskBulkPreviewAction;
}

export interface LocalTaskBulkSelectionResult {
  status: 'success' | 'empty_selection' | 'validation_error' | 'not_found';
  action: LocalTaskBulkPreviewAction;
  selectedTasks: LocalTaskModel[];
  selectedCount: number;
  previewMessage: string;
  errors: string[];
  allowedActions: LocalTaskBulkPreviewAction[];
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export const localTaskBulkPreviewActions: LocalTaskBulkPreviewAction[] = ['review_selected', 'mark_selected_queued', 'clear_selection'];

export function validateLocalTaskBulkSelection(input: LocalTaskBulkSelectionInput): string[] {
  const errors: string[] = [];
  const uniqueIds = new Set(input.selectedTaskIds.map((taskId) => taskId.trim()).filter(Boolean));

  if (!localTaskBulkPreviewActions.includes(input.action)) {
    errors.push('Bulk preview action is not allowed for local mock tasks.');
  }

  if (input.selectedTaskIds.some((taskId) => taskId.includes('://'))) {
    errors.push('Bulk selection ids must be local mock task ids, not live URLs.');
  }

  if (uniqueIds.size > 5) {
    errors.push('Bulk selection preview supports 5 local mock tasks or fewer for iPhone review.');
  }

  return errors;
}

export function previewLocalTaskBulkSelectionInMemory(
  input: LocalTaskBulkSelectionInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskBulkSelectionResult {
  const errors = validateLocalTaskBulkSelection(input);
  const selectedIds = [...new Set(input.selectedTaskIds.map((taskId) => taskId.trim()).filter(Boolean))];

  if (errors.length > 0) {
    return buildBulkSelectionResult('validation_error', input.action, [], errors, 'Fix local bulk selection before preview.');
  }

  if (selectedIds.length === 0 || input.action === 'clear_selection') {
    return buildBulkSelectionResult('empty_selection', input.action, [], [], 'No local mock tasks are selected.');
  }

  const selectedTasks = tasks.filter((task) => selectedIds.includes(task.taskId));

  if (selectedTasks.length !== selectedIds.length) {
    return buildBulkSelectionResult('not_found', input.action, selectedTasks, ['One or more selected tasks were not found in local mock memory.'], 'Selection was checked locally only.');
  }

  const previewMessage = input.action === 'mark_selected_queued'
    ? `${selectedTasks.length} local mock task${selectedTasks.length === 1 ? '' : 's'} would be previewed as queued.`
    : `${selectedTasks.length} local mock task${selectedTasks.length === 1 ? '' : 's'} selected for local review preview.`;

  return buildBulkSelectionResult('success', input.action, selectedTasks, [], previewMessage);
}

function buildBulkSelectionResult(
  status: LocalTaskBulkSelectionResult['status'],
  action: LocalTaskBulkPreviewAction,
  selectedTasks: LocalTaskModel[],
  errors: string[],
  previewMessage: string,
): LocalTaskBulkSelectionResult {
  return {
    status,
    action,
    selectedTasks,
    selectedCount: selectedTasks.length,
    previewMessage,
    errors,
    allowedActions: localTaskBulkPreviewActions,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  };
}
