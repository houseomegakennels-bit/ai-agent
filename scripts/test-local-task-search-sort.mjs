import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskSearchSort.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskSearchSortAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const buildScript = readFileSync('scripts/build-command-interface.mjs', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task search/sort contract defines safe query and sort controls', () => {
  for (const expected of [
    'LocalTaskSortKey',
    'localTaskSortKeys',
    'validateLocalTaskSearchSort',
    'searchAndSortLocalTasksInMemory',
    'sortLocalTasks',
    'attention_first',
    'resultCount',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('task search/sort adapter exposes ready empty loading error and validation states', () => {
  for (const expected of [
    'buildTaskSearchSortView',
    'buildLoadingTaskSearchSortView',
    'buildErrorTaskSearchSortView',
    'validation_error',
    'empty',
    'ready',
    'No live endpoint was contacted',
    'No task data was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders task search and sort controls', () => {
  assert.match(shell, /buildTaskSearchSortView/);
  assert.match(shell, /Search & Sort/);
  assert.match(shell, /task-search-form/);
  assert.match(shell, /task-search-results/);
  assert.match(shell, /availableSorts\.map/);
});

test('task search section has mobile styles static build markup and manifest flag', () => {
  assert.match(css, /task-search-card/);
  assert.match(css, /task-search-state-row/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(buildScript, /task-search-card/);
  assert.match(manifest, /local_task_search_sort/);
});
