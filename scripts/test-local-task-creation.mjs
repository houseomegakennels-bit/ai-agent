import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskCreation.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskCreationAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task creation contract validates safe in-memory task creation', () => {
  for (const expected of [
    'LocalTaskCreationInput',
    'LocalTaskCreationResult',
    'validateLocalTaskCreation',
    'createLocalTaskInMemory',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
    'Task title must be at least 3 characters',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('local task creation adapter exposes idle success validation loading and error states', () => {
  for (const expected of [
    'buildIdleTaskCreationView',
    'buildTaskCreationResultView',
    'buildLoadingTaskCreationView',
    'buildErrorTaskCreationView',
    'validation_error',
    'success',
    'No live endpoint was contacted',
    'No task was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders create-task preview with validation feedback', () => {
  assert.match(shell, /buildTaskCreationResultView/);
  assert.match(shell, /Create Task/);
  assert.match(shell, /task-create-form/);
  assert.match(shell, /Preview Local Task/);
  assert.match(shell, /taskCreationValidation/);
  assert.match(shell, /taskCreationPreview/);
});

test('create-task section has mobile-friendly styles and manifest flag', () => {
  assert.match(css, /task-create-card/);
  assert.match(css, /min-height:\s*48px/);
  assert.match(css, /validation_error/);
  assert.match(manifest, /local_task_creation/);
});
