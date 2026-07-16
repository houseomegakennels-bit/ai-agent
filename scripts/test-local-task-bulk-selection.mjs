import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskBulkSelection.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskBulkSelectionAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const buildScript = readFileSync('scripts/build-command-interface.mjs', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task bulk-selection contract defines safe preview actions and flags', () => {
  for (const expected of [
    'LocalTaskBulkPreviewAction',
    'localTaskBulkPreviewActions',
    'validateLocalTaskBulkSelection',
    'previewLocalTaskBulkSelectionInMemory',
    'selectedCount',
    'review_selected',
    'clear_selection',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
    'productionActionAllowed: false',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('task bulk-selection adapter exposes ready empty loading error validation and not-found states', () => {
  for (const expected of [
    'buildTaskBulkSelectionView',
    'buildLoadingTaskBulkSelectionView',
    'buildErrorTaskBulkSelectionView',
    'empty_selection',
    'validation_error',
    'not_found',
    'ready',
    'No live endpoint was contacted',
    'No task data was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders task bulk-selection controls and selected rows', () => {
  assert.match(shell, /buildTaskBulkSelectionView/);
  assert.match(shell, /Bulk Selection/);
  assert.match(shell, /task-bulk-actions/);
  assert.match(shell, /task-bulk-selection-list/);
  assert.match(shell, /selectedTasks\.map/);
});

test('task bulk-selection section has mobile styles static build markup and manifest flag', () => {
  assert.match(css, /task-bulk-card/);
  assert.match(css, /task-bulk-state-row/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(buildScript, /task-bulk-card/);
  assert.match(manifest, /local_task_bulk_selection/);
});
