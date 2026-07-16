import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const adapter = readFileSync('apps/command-interface/shared-ui/localControllerApi.ts', 'utf8');
const apiMain = readFileSync('apps/controller-api/src/controller_api/main.py', 'utf8');

test('local controller API adapter mirrors health and ready endpoint contract', () => {
  assert.match(apiMain, /@app\.get\('\/health'/);
  assert.match(apiMain, /@app\.get\('\/ready'/);
  assert.match(adapter, /LocalControllerHealthResponse/);
  assert.match(adapter, /schema_version: '1.0'/);
  assert.match(adapter, /service: 'controller-api'/);
});

test('mock adapter is local-only and does not expose runtime services or secrets', () => {
  assert.match(adapter, /environment: 'local'/);
  assert.match(adapter, /runtime_services: false/);
  assert.match(adapter, /secrets_loaded: false/);
  assert.match(adapter, /Local mock adapter/);
});

test('mock adapter defines offline and error status handling', () => {
  assert.match(adapter, /buildOfflineControllerStatus/);
  assert.match(adapter, /buildErrorControllerStatus/);
  assert.match(adapter, /Offline fallback/);
  assert.match(adapter, /Error fallback/);
  assert.match(adapter, /No live action was attempted/);
});

test('command shell status panel reads the local controller adapter', () => {
  assert.match(shell, /buildMockControllerStatus/);
  assert.match(shell, /Controller \$\{controllerStatus\.health\.status\}/);
  assert.match(shell, /Ready \$\{controllerStatus\.ready\.status\}/);
  assert.match(shell, /controllerStatus\.connectionLabel/);
  assert.match(shell, /controllerStatus\.operatorMessage/);
});
