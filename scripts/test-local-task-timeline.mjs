import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/tasks/localTaskTimeline.ts', 'utf8');
const adapterSource = readFileSync('apps/command-interface/shared-ui/localTaskTimelineAdapter.ts', 'utf8');
const shellSource = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const buildSource = readFileSync('scripts/build-command-interface.mjs', 'utf8');

test('Release 19 task timeline contract remains local-only and in-memory', () => {
  assert.match(contractSource, /LocalTaskDailyFocusInput/);
  assert.match(contractSource, /buildLocalTaskDailyFocusInMemory/);
  assert.match(contractSource, /groupLocalTasksForDailyFocus/);
  assert.match(contractSource, /persistenceEnabled: false/);
  assert.match(contractSource, /liveEndpointUsed: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /productionActionAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|localStorage|indexedDB|sqlite|postgres|mongodb/i);
});

test('Release 19 timeline adapter exposes ready, empty, loading, error, and validation states', () => {
  assert.match(adapterSource, /LocalTaskTimelineViewState = 'ready' \| 'empty' \| 'validation_error' \| 'loading' \| 'error'/);
  assert.match(adapterSource, /buildTaskTimelineView/);
  assert.match(adapterSource, /buildLoadingTaskTimelineView/);
  assert.match(adapterSource, /buildErrorTaskTimelineView/);
  assert.match(adapterSource, /No timeline was persisted and no live endpoint was contacted/);
});

test('Release 19 command interface renders daily focus buckets for phone review', () => {
  assert.match(shellSource, /Daily Focus/);
  assert.match(shellSource, /task-timeline-card/);
  assert.match(shellSource, /task-timeline-state-row/);
  assert.match(shellSource, /task-timeline-buckets/);
  assert.match(shellSource, /Recommended next/);
  assert.match(buildSource, /Daily focus preview/);
  assert.match(buildSource, /task-timeline-bucket/);
});
