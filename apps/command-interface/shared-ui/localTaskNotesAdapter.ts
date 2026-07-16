import {
  listLocalTaskNotesInMemory,
  LocalTaskNoteDraftInput,
  LocalTaskNotePreviewResult,
  localTaskNoteKinds,
  previewLocalTaskNoteInMemory,
} from '../../../core/tasks/localTaskNotes';
import { LocalTaskModel, mockLocalTasks } from '../../../core/tasks/localTaskModel';

export type LocalTaskNotesViewState = 'ready' | 'empty' | 'validation_error' | 'not_found' | 'loading' | 'error';

export interface LocalTaskNotesView {
  state: LocalTaskNotesViewState;
  titleLabel: string;
  helperText: string;
  operatorMessage: string;
  availableKinds: typeof localTaskNoteKinds;
  result?: LocalTaskNotePreviewResult;
}

export function buildTaskNotesPreviewView(
  input: LocalTaskNoteDraftInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
): LocalTaskNotesView {
  return buildTaskNotesViewFromResult(previewLocalTaskNoteInMemory(input, tasks), 'Draft local note preview');
}

export function buildTaskNotesListView(taskId: string, tasks: LocalTaskModel[] = mockLocalTasks): LocalTaskNotesView {
  return buildTaskNotesViewFromResult(listLocalTaskNotesInMemory(taskId, tasks), 'Local task annotations');
}

export function buildLoadingTaskNotesView(): LocalTaskNotesView {
  return {
    state: 'loading',
    titleLabel: 'Loading local notes',
    helperText: 'Preparing local mock annotations for phone review.',
    operatorMessage: 'Loading state is local-only; no live endpoint is contacted.',
    availableKinds: localTaskNoteKinds,
  };
}

export function buildErrorTaskNotesView(): LocalTaskNotesView {
  return {
    state: 'error',
    titleLabel: 'Task notes unavailable',
    helperText: 'Local note preview could not be prepared.',
    operatorMessage: 'Error state is mocked and does not expose secrets or production actions.',
    availableKinds: localTaskNoteKinds,
  };
}

function buildTaskNotesViewFromResult(result: LocalTaskNotePreviewResult, readyTitle: string): LocalTaskNotesView {
  if (result.status === 'validation_error') {
    return {
      state: 'validation_error',
      titleLabel: 'Fix task note preview',
      helperText: result.errors.join(' '),
      operatorMessage: result.operatorMessage,
      availableKinds: localTaskNoteKinds,
      result,
    };
  }

  if (result.status === 'not_found') {
    return {
      state: 'not_found',
      titleLabel: 'Task note target missing',
      helperText: result.errors.join(' '),
      operatorMessage: result.operatorMessage,
      availableKinds: localTaskNoteKinds,
      result,
    };
  }

  if (result.status === 'empty') {
    return {
      state: 'empty',
      titleLabel: 'No local notes yet',
      helperText: 'This mock task has no in-memory annotations.',
      operatorMessage: result.operatorMessage,
      availableKinds: localTaskNoteKinds,
      result,
    };
  }

  return {
    state: 'ready',
    titleLabel: readyTitle,
    helperText: `${result.notes.length} local mock annotation${result.notes.length === 1 ? '' : 's'} available.`,
    operatorMessage: result.operatorMessage,
    availableKinds: localTaskNoteKinds,
    result,
  };
}
