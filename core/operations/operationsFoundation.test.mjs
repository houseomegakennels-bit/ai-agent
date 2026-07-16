import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('core/operations/operationsFoundation.ts', 'utf8');
const docs = readFileSync('docs/operations/release-0-operations-foundation.md', 'utf8');

test('Release 0 defines all operations foundation capabilities as contracts', () => {
  for (const expected of [
    'secret-vault-contract',
    'offline-recovery-key-contract',
    'diagnostics-contract',
    'backup-contract',
    'restore-contract',
    'safe-update-contract',
    'rollback-contract',
    'emergency-stop-contract',
    'external-uptime-monitor-contract',
  ]) {
    assert.match(source, new RegExp(expected));
  }
});

test('Release 0 explicitly avoids runtime implementation', () => {
  assert.match(source, /implementedRuntime: false/g);
  assert.match(source, /allOperationsItemsAreContractsOnly/);
});

test('operations docs forbid real secrets and production deployment', () => {
  assert.match(docs, /Do not enter real secrets/);
  assert.match(docs, /No production deployment/);
  assert.match(docs, /No live infrastructure/);
});
