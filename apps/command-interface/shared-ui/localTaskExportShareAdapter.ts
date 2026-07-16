import {
  buildLocalTaskExportSharePackageInMemory,
  LocalTaskExportShareInput,
  LocalTaskExportShareResult,
  localTaskExportShareFormats,
} from '../../../core/tasks/localTaskExportShare';
import { LocalTaskModel, mockLocalTasks } from '../../../core/tasks/localTaskModel';

export type LocalTaskExportShareViewState = 'ready' | 'empty_selection' | 'validation_error' | 'not_found' | 'loading' | 'error';

export interface LocalTaskExportShareView {
  state: LocalTaskExportShareViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  availableFormats: typeof localTaskExportShareFormats;
  result?: LocalTaskExportShareResult;
}

export function buildTaskExportShareView(
  input: LocalTaskExportShareInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskExportShareView {
  const result = buildLocalTaskExportSharePackageInMemory(input, tasks);

  if (result.status === 'empty_selection') {
    return {
      state: 'empty_selection',
      titleLabel: 'Select tasks to export',
      helperText: result.summary,
      operatorMessage: 'Empty export state is local-only; nothing is persisted or sent.',
      availableFormats: localTaskExportShareFormats,
      result,
    };
  }

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix export preview',
      helperText: result.summary,
      operatorMessage: 'Validation happened locally. No export was persisted and no live endpoint was contacted.',
      availableFormats: localTaskExportShareFormats,
      result,
    };
  }

  if (result.status === 'not_found') {
    return {
      state: 'not_found',
      titleLabel: 'Task selection not found',
      helperText: result.summary,
      operatorMessage: 'Not-found state is local-only and does not contact a controller API.',
      availableFormats: localTaskExportShareFormats,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Export/share preview',
    helperText: result.summary,
    operatorMessage: 'Package preview is in-memory only. No Telegram bridge, persistence, live endpoint, secret, or production action is enabled.',
    availableFormats: localTaskExportShareFormats,
    result,
  };
}

export function buildLoadingTaskExportShareView(): LocalTaskExportShareView {
  return {
    state: 'loading',
    titleLabel: 'Preparing export preview',
    helperText: 'Packaging local mock tasks for iPhone review.',
    operatorMessage: 'Loading state is mocked locally; no file is written and no network call is made.',
    availableFormats: localTaskExportShareFormats,
  };
}

export function buildErrorTaskExportShareView(): LocalTaskExportShareView {
  return {
    state: 'error',
    titleLabel: 'Export preview unavailable',
    helperText: 'Local export/share preview could not be prepared.',
    operatorMessage: 'Error state is local-only and does not expose secrets or production actions.',
    availableFormats: localTaskExportShareFormats,
  };
}
