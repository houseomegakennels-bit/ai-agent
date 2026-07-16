import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskExportShareFormat = 'summary_markdown' | 'handoff_json' | 'iphone_text';
export type LocalTaskExportShareStatus = 'success' | 'empty_selection' | 'validation_error' | 'not_found';

export const localTaskExportShareFormats: LocalTaskExportShareFormat[] = ['summary_markdown', 'handoff_json', 'iphone_text'];

export interface LocalTaskExportShareInput {
  taskIds: string[];
  format: LocalTaskExportShareFormat;
  includeNotes: boolean;
  includeActivity: boolean;
}

export interface LocalTaskExportSharePackage {
  packageId: string;
  format: LocalTaskExportShareFormat;
  title: string;
  bodyPreview: string;
  taskIds: string[];
  taskCount: number;
  createdAtLabel: 'Local mock preview';
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
  telegramBridgeUsed: false;
}

export interface LocalTaskExportShareResult {
  status: LocalTaskExportShareStatus;
  format: LocalTaskExportShareFormat;
  selectedTasks: LocalTaskModel[];
  package?: LocalTaskExportSharePackage;
  errors: string[];
  summary: string;
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
  telegramBridgeUsed: false;
}

function validateExportShareInput(input: LocalTaskExportShareInput): string[] {
  const errors: string[] = [];

  if (!localTaskExportShareFormats.includes(input.format)) {
    errors.push('Choose a supported local export format.');
  }

  if (input.taskIds.length === 0) {
    errors.push('Select at least one local mock task before export preview.');
  }

  if (input.taskIds.length > 10) {
    errors.push('Export preview is limited to 10 local mock tasks on iPhone.');
  }

  if (input.taskIds.some((taskId) => taskId.includes('://') || taskId.trim().length < 3)) {
    errors.push('Task selections must be local mock task IDs, not links or external references.');
  }

  return errors;
}

function renderBodyPreview(tasks: LocalTaskModel[], input: LocalTaskExportShareInput): string {
  const taskLines = tasks.map((task) => `- ${task.title} [${task.state}]`).join('\n');
  const extras = [
    input.includeNotes ? 'notes: included as mock summary' : 'notes: excluded',
    input.includeActivity ? 'activity: included as mock summary' : 'activity: excluded',
  ].join('; ');

  if (input.format === 'handoff_json') {
    return JSON.stringify({ tasks: tasks.map((task) => task.taskId), extras, mode: 'local_mock_preview' }, null, 2);
  }

  if (input.format === 'iphone_text') {
    return `Helix local task handoff\n${taskLines}\n${extras}`;
  }

  return `# Helix Local Task Export\n${taskLines}\n\n${extras}`;
}

export function buildLocalTaskExportSharePackageInMemory(
  input: LocalTaskExportShareInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskExportShareResult {
  const validationErrors = validateExportShareInput(input);

  if (input.taskIds.length === 0) {
    return buildResult('empty_selection', input, [], validationErrors);
  }

  if (validationErrors.length > 0) {
    return buildResult('validation_error', input, [], validationErrors);
  }

  const selectedTasks = tasks.filter((task) => input.taskIds.includes(task.taskId));
  if (selectedTasks.length !== input.taskIds.length) {
    return buildResult('not_found', input, selectedTasks, ['One or more selected mock tasks were not found locally.']);
  }

  return buildResult('success', input, selectedTasks, []);
}

function buildResult(
  status: LocalTaskExportShareStatus,
  input: LocalTaskExportShareInput,
  selectedTasks: LocalTaskModel[],
  errors: string[],
): LocalTaskExportShareResult {
  const summary =
    status === 'success'
      ? `${selectedTasks.length} local mock task${selectedTasks.length === 1 ? '' : 's'} packaged for ${input.format}.`
      : errors.join(' ');

  const exportPackage =
    status === 'success'
      ? {
          packageId: `local-export-${input.format}-${selectedTasks.length}`,
          format: input.format,
          title: `Local ${input.format.replace(/_/g, ' ')} preview`,
          bodyPreview: renderBodyPreview(selectedTasks, input),
          taskIds: selectedTasks.map((task) => task.taskId),
          taskCount: selectedTasks.length,
          createdAtLabel: 'Local mock preview' as const,
          persistenceEnabled: false as const,
          liveEndpointUsed: false as const,
          secretsIncluded: false as const,
          productionActionAllowed: false as const,
          telegramBridgeUsed: false as const,
        }
      : undefined;

  return {
    status,
    format: input.format,
    selectedTasks,
    package: exportPackage,
    errors,
    summary,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
    telegramBridgeUsed: false,
  };
}
