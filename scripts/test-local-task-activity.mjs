import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/tasks/localTaskActivity.ts', 'utf8');
const adapterSource = readFileSync('apps/command-interface/shared-ui/localTaskActivityAdapter.ts', 'utf8');
const shellSource = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const buildSource = readFileSync('scripts/build-command-interface.mjs', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 21 task activity contract remains local-only and in-memory', () => {
  assert.match(contractSource, /LocalTaskActivityEvent/);
  assert.match(contractSource, /buildLocalTaskActivityFeedInMemory/);
  assert.match(contractSource, /groupedByTask/);
  assert.match(contractSource, /persistenceEnabled: false/);
  assert.match(contractSource, /liveEndpointUsed: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /productionActionAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|localStorage|indexedDB|sqlite|postgres|mongodb/i);
});

test('Release 21 activity adapter exposes ready empty loading error and validation states', () => {
  assert.match(adapterSource, /LocalTaskActivityViewState = 'ready' \| 'empty' \| 'validation_error' \| 'loading' \| 'error'/);
  assert.match(adapterSource, /buildTaskActivityView/);
  assert.match(adapterSource, /buildLoadingTaskActivityView/);
  assert.match(adapterSource, /buildErrorTaskActivityView/);
  assert.match(adapterSource, /No activity was persisted and no live endpoint was contacted/);
});

test('Release 21 command interface renders activity feed previews for phone review', () => {
  assert.match(shellSource, /Activity Feed/);
  assert.match(shellSource, /task-activity-card/);
  assert.match(shellSource, /task-activity-state-row/);
  assert.match(shellSource, /task-activity-list/);
  assert.match(buildSource, /Recent local activity/);
  assert.match(buildSource, /task-activity-event/);
  assert.match(manifestSource, /local_task_activity/);
});
