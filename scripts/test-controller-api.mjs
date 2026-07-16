import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const main = readFileSync('apps/controller-api/src/controller_api/main.py', 'utf8');
const health = readFileSync('apps/controller-api/src/controller_api/health.py', 'utf8');
const readme = readFileSync('apps/controller-api/README.md', 'utf8');
const contract = readFileSync('core/controller/controllerApiContract.ts', 'utf8');

test('controller API defines local-only FastAPI health and ready endpoints', () => {
  assert.match(main, /FastAPI/);
  assert.match(main, /@app\.get\('\/health'/);
  assert.match(main, /@app\.get\('\/ready'/);
  assert.match(main, /response_model=HealthResponse/);
});

test('typed health response is local and does not load secrets or runtime services', () => {
  for (const expected of ['HealthResponse', 'schema_version', 'controller-api', "'environment': 'local'", "'runtime_services': False", "'secrets_loaded': False"]) {
    assert.match(health, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('Release 10 contract forbids production deployment, paid APIs, and secrets', () => {
  for (const expected of ['runtimeServicesImplemented: false', 'secretsRequired: false', 'productionDeploymentAllowed: false', 'paidApisAllowed: false']) {
    assert.match(contract, new RegExp(expected));
  }
});

test('controller README documents local-only forbidden scope', () => {
  for (const expected of ['No production deployment', 'No real secrets', 'No live endpoints', 'No paid APIs', 'No Telegram production bot', 'No GitHub tokens', 'No server IPs', 'No broker or trading integrations']) {
    assert.match(readme, new RegExp(expected));
  }
});
