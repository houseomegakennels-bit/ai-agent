import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/tasks/localTaskNotes.ts', 'utf8');
const adapterSource = readFileSync('apps/command-interface/shared-ui/localTaskNotesAdapter.ts', 'utf8');
const shellSource = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const buildSource = readFileSync('scripts/build-command-interface.mjs', 'utf8');

test('Release 20 task notes contract remains local-only and in-memory', () => {
  assert.match(contractSource, /LocalTaskNoteDraftInput/);
  assert.match(contractSource, /previewLocalTaskNoteInMemory/);
  assert.match(contractSource, /listLocalTaskNotesInMemory/);
  assert.match(contractSource, /persistenceEnabled: false/);
  assert.match(contractSource, /liveEndpointUsed: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /productionActionAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|localStorage|indexedDB|sqlite|postgres|mongodb/i);
});

test('Release 20 notes adapter exposes preview, empty, loading, error, validation, and not-found states', () => {
  assert.match(adapterSource, /LocalTaskNotesViewState = 'ready' \| 'empty' \| 'validation_error' \| 'not_found' \| 'loading' \| 'error'/);
  assert.match(adapterSource, /buildTaskNotesPreviewView/);
  assert.match(adapterSource, /buildTaskNotesListView/);
  assert.match(adapterSource, /buildLoadingTaskNotesView/);
  assert.match(adapterSource, /buildErrorTaskNotesView/);
});

test('Release 20 command interface renders task note previews for phone review', () => {
  assert.match(shellSource, /Task Notes/);
  assert.match(shellSource, /task-notes-card/);
  assert.match(shellSource, /task-notes-state-row/);
  assert.match(shellSource, /task-notes-list/);
  assert.match(shellSource, /Confirm Release 19 approval/);
  assert.match(buildSource, /Draft local note preview/);
  assert.match(buildSource, /task-note/);
});
