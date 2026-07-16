import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const model = readFileSync('core/tasks/localTaskModel.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskList.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');

test('local task model defines safe mock task fields and states', () => {
  for (const expected of ['LocalTaskModel', 'queued', 'running', 'awaiting_user', 'completed', 'failed', 'empty', 'loading', 'error', 'secretsIncluded: false', 'productionActionAllowed: false']) {
    assert.match(model, new RegExp(expected));
  }
});

test('mock task list adapter includes ready, empty, loading, and error states', () => {
  for (const expected of ['buildMockTaskListView', 'buildEmptyTaskListView', 'buildLoadingTaskListView', 'buildErrorTaskListView', 'No live task action was attempted']) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders local task list and task states', () => {
  assert.match(shell, /buildMockTaskListView/);
  assert.match(shell, /Local Tasks/);
  assert.match(shell, /taskListView\.summary/);
  assert.match(shell, /taskListView\.tasks\.map/);
  assert.match(shell, /task\.state/);
});

test('task list has mobile-friendly card styles', () => {
  assert.match(css, /task-list-card/);
  assert.match(css, /task-card/);
  assert.match(css, /border-radius:\s*24px/);
});
