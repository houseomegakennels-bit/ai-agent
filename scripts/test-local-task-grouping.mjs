import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskFilters.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskGroupingAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task filter contract defines filters groups counts and safe flags', () => {
  for (const expected of [
    'LocalTaskFilterKey',
    'needs_attention',
    'LocalTaskGroupKey',
    'filterLocalTasksInMemory',
    'groupLocalTasks',
    'counts',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('task grouping adapter exposes ready empty loading error and validation states', () => {
  for (const expected of [
    'buildTaskGroupingView',
    'buildLoadingTaskGroupingView',
    'buildErrorTaskGroupingView',
    'validation_error',
    'empty',
    'ready',
    'No live endpoint was contacted',
    'No task data was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders task filters and grouped sections', () => {
  assert.match(shell, /buildTaskGroupingView/);
  assert.match(shell, /Task Filters/);
  assert.match(shell, /task-filter-tabs/);
  assert.match(shell, /taskGroupingView\.result\?\.groups\.map/);
  assert.match(shell, /attentionGroupingView/);
  assert.match(shell, /emptyGroupingView/);
});

test('task grouping section has mobile-friendly styles and manifest flag', () => {
  assert.match(css, /task-group-card/);
  assert.match(css, /task-filter-tabs/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /task-groups/);
  assert.match(manifest, /local_task_grouping/);
});
