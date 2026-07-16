import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskUpdate.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskUpdateAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task update contract defines allowed mock actions and safe result flags', () => {
  for (const expected of [
    'LocalTaskUpdateAction',
    'mark_completed',
    'mark_awaiting_user',
    'mark_queued',
    'mark_failed',
    'validateLocalTaskUpdate',
    'updateLocalTaskInMemory',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('local task update adapter exposes success validation not-found loading and error states', () => {
  for (const expected of [
    'buildIdleTaskUpdateView',
    'buildTaskUpdateResultView',
    'buildLoadingTaskUpdateView',
    'buildErrorTaskUpdateView',
    'not_found',
    'validation_error',
    'success',
    'No live endpoint was contacted',
    'No task was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders local task update controls and feedback states', () => {
  assert.match(shell, /buildTaskUpdateResultView/);
  assert.match(shell, /Update Task/);
  assert.match(shell, /task-actions/);
  assert.match(shell, /Mark Complete/);
  assert.match(shell, /Needs Review/);
  assert.match(shell, /taskUpdatePreview/);
  assert.match(shell, /taskUpdateValidation/);
});

test('task update section has mobile-friendly styles and manifest flag', () => {
  assert.match(css, /task-update-card/);
  assert.match(css, /task-update-actions/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /not_found/);
  assert.match(manifest, /local_task_update/);
});
