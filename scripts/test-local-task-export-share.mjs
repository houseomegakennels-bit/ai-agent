import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/tasks/localTaskExportShare.ts', 'utf8');
const adapterSource = readFileSync('apps/command-interface/shared-ui/localTaskExportShareAdapter.ts', 'utf8');
const shellSource = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const buildSource = readFileSync('scripts/build-command-interface.mjs', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 22 export share contract remains local-only and in-memory', () => {
  assert.match(contractSource, /LocalTaskExportSharePackage/);
  assert.match(contractSource, /buildLocalTaskExportSharePackageInMemory/);
  assert.match(contractSource, /summary_markdown/);
  assert.match(contractSource, /telegramBridgeUsed: false/);
  assert.match(contractSource, /persistenceEnabled: false/);
  assert.match(contractSource, /liveEndpointUsed: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /productionActionAllowed: false/);
  assert.doesNotMatch(contractSource, /fetch\(|localStorage|indexedDB|sqlite|postgres|mongodb|TelegramBot|webhook/i);
});

test('Release 22 export share adapter exposes phone review states', () => {
  assert.match(adapterSource, /LocalTaskExportShareViewState = 'ready' \| 'empty_selection' \| 'validation_error' \| 'not_found' \| 'loading' \| 'error'/);
  assert.match(adapterSource, /buildTaskExportShareView/);
  assert.match(adapterSource, /buildLoadingTaskExportShareView/);
  assert.match(adapterSource, /buildErrorTaskExportShareView/);
  assert.match(adapterSource, /No export was persisted and no live endpoint was contacted/);
});

test('Release 22 command interface renders export share preview and manifest flag', () => {
  assert.match(shellSource, /Export \/ Share/);
  assert.match(shellSource, /task-export-card/);
  assert.match(shellSource, /task-export-package/);
  assert.match(buildSource, /Export\/share preview/);
  assert.match(buildSource, /Telegram bridge used: no/);
  assert.match(manifestSource, /local_task_export_share/);
});
