import {
  LocalTaskBulkSelectionInput,
  LocalTaskBulkSelectionResult,
  localTaskBulkPreviewActions,
  previewLocalTaskBulkSelectionInMemory,
} from '../../../core/tasks/localTaskBulkSelection';
import { LocalTaskModel } from '../../../core/tasks/localTaskModel';

export type LocalTaskBulkSelectionViewState = 'ready' | 'empty_selection' | 'validation_error' | 'not_found' | 'loading' | 'error';

export interface LocalTaskBulkSelectionView {
  state: LocalTaskBulkSelectionViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  allowedActions: typeof localTaskBulkPreviewActions;
  result?: LocalTaskBulkSelectionResult;
}

export function buildLoadingTaskBulkSelectionView(): LocalTaskBulkSelectionView {
  return {
    state: 'loading',
    titleLabel: 'Preparing bulk preview',
    helperText: 'Preparing local mock task selection without contacting live services.',
    operatorMessage: 'No live endpoint was contacted.',
    allowedActions: localTaskBulkPreviewActions,
  };
}

export function buildErrorTaskBulkSelectionView(): LocalTaskBulkSelectionView {
  return {
    state: 'error',
    titleLabel: 'Bulk preview unavailable',
    helperText: 'Local mock task bulk-selection preview could not be prepared.',
    operatorMessage: 'No task data was persisted and no live service was contacted.',
    allowedActions: localTaskBulkPreviewActions,
  };
}

export function buildTaskBulkSelectionView(input: LocalTaskBulkSelectionInput, tasks?: LocalTaskModel[]): LocalTaskBulkSelectionView {
  const result = previewLocalTaskBulkSelectionInMemory(input, tasks);

  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix bulk selection',
      helperText: result.errors.join(' '),
      operatorMessage: 'Validation happened locally. No task data was persisted and no live endpoint was contacted.',
      allowedActions: localTaskBulkPreviewActions,
      result,
    };
  }

  if (result.status === 'not_found') {
    return {
      state: 'not_found',
      titleLabel: 'Selection not found',
      helperText: result.errors.join(' '),
      operatorMessage: 'The lookup used local mock memory only.',
      allowedActions: localTaskBulkPreviewActions,
      result,
    };
  }

  if (result.status === 'empty_selection') {
    return {
      state: 'empty_selection',
      titleLabel: 'No tasks selected',
      helperText: result.previewMessage,
      operatorMessage: 'Empty selection was produced locally without contacting production services.',
      allowedActions: localTaskBulkPreviewActions,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: 'Bulk selection preview',
    helperText: result.previewMessage,
    operatorMessage: 'Bulk selection preview uses in-memory mock data only.',
    allowedActions: localTaskBulkPreviewActions,
    result,
  };
}
