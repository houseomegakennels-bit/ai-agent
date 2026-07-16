import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contract = readFileSync('core/tasks/localTaskDetail.ts', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localTaskDetailAdapter.ts', 'utf8');
const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const buildScript = readFileSync('scripts/build-command-interface.mjs', 'utf8');
const manifest = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('local task detail contract defines read-only detail and audit trail safe flags', () => {
  for (const expected of [
    'LocalTaskDetail',
    'LocalTaskAuditEvent',
    'getLocalTaskDetailInMemory',
    'validateLocalTaskDetailInput',
    'auditTrail',
    'safeActionSummary',
    'persistenceEnabled: false',
    'liveEndpointUsed: false',
    'secretsIncluded: false',
    'productionActionAllowed: false',
  ]) {
    assert.match(contract, new RegExp(expected));
  }
});

test('task detail adapter exposes ready validation not-found loading and error states', () => {
  for (const expected of [
    'buildTaskDetailView',
    'buildLoadingTaskDetailView',
    'buildErrorTaskDetailView',
    'validation_error',
    'not_found',
    'ready',
    'No live endpoint was contacted',
    'No task data was persisted',
  ]) {
    assert.match(adapter, new RegExp(expected));
  }
});

test('command shell renders task detail preview and mock audit trail', () => {
  assert.match(shell, /buildTaskDetailView/);
  assert.match(shell, /Task Detail/);
  assert.match(shell, /task-detail-panel/);
  assert.match(shell, /task-audit-list/);
  assert.match(shell, /auditTrail\.map/);
});

test('task detail section has mobile styles static build markup and manifest flag', () => {
  assert.match(css, /task-detail-card/);
  assert.match(css, /task-detail-state-row/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(buildScript, /task-detail-card/);
  assert.match(manifest, /local_task_detail/);
});
