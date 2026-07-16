import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const wizard = readFileSync('apps/command-interface/shared-ui/setup/installWizard.ts', 'utf8');
const stuck = readFileSync('apps/command-interface/shared-ui/setup/StuckWorkflow.ts', 'utf8');

test('guided installation defines required phone-first setup steps', () => {
  for (const expected of ['admin-account', 'passkey', 'totp-recovery', 'telegram', 'github', 'final-diagnostics']) {
    assert.match(wizard, new RegExp(`id: '${expected}'`));
  }
});

test('wizard explains why, iPhone action, and verification for each step', () => {
  assert.match(wizard, /why:/);
  assert.match(wizard, /iphoneAction:/);
  assert.match(wizard, /verifies:/);
});

test('wizard progress is based only on verified required steps', () => {
  assert.match(wizard, /requiredSteps/);
  assert.match(wizard, /verifiedSteps/);
  assert.match(wizard, /Math\.round/);
});

test('stuck workflow redacts secrets and forbids secret values', () => {
  for (const forbidden of ['tokens', 'passwords', 'webhook secrets', 'private keys', 'secret vault values']) {
    assert.match(stuck, new RegExp(forbidden));
  }
});
