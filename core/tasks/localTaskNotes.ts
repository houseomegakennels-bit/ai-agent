import { LocalTaskModel, mockLocalTasks } from './localTaskModel';

export type LocalTaskNoteKind = 'operator_note' | 'release_annotation' | 'safety_note';

export interface LocalTaskNoteDraftInput {
  taskId: string;
  body: string;
  kind: LocalTaskNoteKind;
}

export interface LocalTaskNotePreview {
  noteId: string;
  taskId: string;
  body: string;
  kind: LocalTaskNoteKind;
  authorLabel: 'local_operator_preview';
  createdAtLabel: 'Local mock preview';
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export interface LocalTaskNotePreviewResult {
  status: 'success' | 'empty' | 'validation_error' | 'not_found';
  notes: LocalTaskNotePreview[];
  selectedTask?: LocalTaskModel;
  errors: string[];
  operatorMessage: string;
  persistenceEnabled: false;
  liveEndpointUsed: false;
  secretsIncluded: false;
  productionActionAllowed: false;
}

export const localTaskNoteKinds: LocalTaskNoteKind[] = ['operator_note', 'release_annotation', 'safety_note'];

export const mockLocalTaskNotes: LocalTaskNotePreview[] = [
  {
    noteId: 'local-note-release-12-approval',
    taskId: 'local-task-release-12-review',
    body: 'Operator should confirm Release 12 acceptance before any future runtime work.',
    kind: 'release_annotation',
    authorLabel: 'local_operator_preview',
    createdAtLabel: 'Local mock preview',
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
  {
    noteId: 'local-note-controller-status',
    taskId: 'local-task-controller-status',
    body: 'Controller status remains a local mock panel with no live endpoint attached.',
    kind: 'safety_note',
    authorLabel: 'local_operator_preview',
    createdAtLabel: 'Local mock preview',
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  },
];

export function validateLocalTaskNoteDraft(input: LocalTaskNoteDraftInput): string[] {
  const errors: string[] = [];
  const taskId = input.taskId.trim();
  const body = input.body.trim();

  if (taskId.length === 0) {
    errors.push('Task id is required for a local note preview.');
  }

  if (taskId.includes('://')) {
    errors.push('Task id cannot include live URLs or endpoints.');
  }

  if (body.length < 3) {
    errors.push('Note body must be at least 3 characters.');
  }

  if (body.length > 240) {
    errors.push('Note body must be 240 characters or fewer.');
  }

  if (body.includes('://')) {
    errors.push('Note body cannot include live URLs or endpoints.');
  }

  if (!localTaskNoteKinds.includes(input.kind)) {
    errors.push('Note kind is not allowed for local mock annotations.');
  }

  return errors;
}

export function previewLocalTaskNoteInMemory(
  input: LocalTaskNoteDraftInput,
  tasks: LocalTaskModel[] = mockLocalTasks,
  existingNotes: LocalTaskNotePreview[] = mockLocalTaskNotes,
): LocalTaskNotePreviewResult {
  const errors = validateLocalTaskNoteDraft(input);
  if (errors.length > 0) {
    return buildLocalTaskNoteResult('validation_error', [], errors, 'Validation happened locally. No note was persisted.');
  }

  const selectedTask = tasks.find((task) => task.taskId === input.taskId.trim());
  if (!selectedTask) {
    return buildLocalTaskNoteResult('not_found', [], ['Task was not found in local mock memory.'], 'No note was persisted or sent.');
  }

  const draftNote: LocalTaskNotePreview = {
    noteId: `local-note-preview-${selectedTask.taskId}`,
    taskId: selectedTask.taskId,
    body: input.body.trim(),
    kind: input.kind,
    authorLabel: 'local_operator_preview',
    createdAtLabel: 'Local mock preview',
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  };

  const notes = [draftNote, ...existingNotes.filter((note) => note.taskId === selectedTask.taskId)];
  return buildLocalTaskNoteResult('success', notes, [], 'Local note preview uses in-memory mock data only.', selectedTask);
}

export function listLocalTaskNotesInMemory(
  taskId: string,
  tasks: LocalTaskModel[] = mockLocalTasks,
  existingNotes: LocalTaskNotePreview[] = mockLocalTaskNotes,
): LocalTaskNotePreviewResult {
  const safeTaskId = taskId.trim();
  if (safeTaskId.length === 0 || safeTaskId.includes('://')) {
    return buildLocalTaskNoteResult('validation_error', [], ['Select a safe local task id for note preview.'], 'Validation happened locally.');
  }

  const selectedTask = tasks.find((task) => task.taskId === safeTaskId);
  if (!selectedTask) {
    return buildLocalTaskNoteResult('not_found', [], ['Task was not found in local mock memory.'], 'No note lookup was sent.');
  }

  const notes = existingNotes.filter((note) => note.taskId === selectedTask.taskId);
  return buildLocalTaskNoteResult(
    notes.length === 0 ? 'empty' : 'success',
    notes,
    [],
    notes.length === 0 ? 'No local notes exist for this mock task.' : 'Local notes are mock annotations only.',
    selectedTask,
  );
}

function buildLocalTaskNoteResult(
  status: LocalTaskNotePreviewResult['status'],
  notes: LocalTaskNotePreview[],
  errors: string[],
  operatorMessage: string,
  selectedTask?: LocalTaskModel,
): LocalTaskNotePreviewResult {
  return {
    status,
    notes,
    selectedTask,
    errors,
    operatorMessage,
    persistenceEnabled: false,
    liveEndpointUsed: false,
    secretsIncluded: false,
    productionActionAllowed: false,
  };
}
