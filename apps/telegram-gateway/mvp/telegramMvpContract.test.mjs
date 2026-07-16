import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const telegram = readFileSync('apps/telegram-gateway/mvp/telegramMvpContract.ts', 'utf8');
const task = readFileSync('core/tasks/taskLifecycle.ts', 'utf8');
const docs = readFileSync('docs/telegram/release-1-fast-telegram-mvp.md', 'utf8');

test('Telegram MVP contract includes immediate acknowledgement and async processing', () => {
  assert.match(telegram, /acknowledge-under-one-second/);
  assert.match(telegram, /targetMs: 1000/);
  assert.match(telegram, /process-asynchronously/);
});

test('Telegram MVP contract does not require real secrets or runtime implementation', () => {
  assert.match(telegram, /requiresSecretValue: false/g);
  assert.match(telegram, /implementedRuntime: false/g);
  assert.match(docs, /Do not add real Telegram tokens/);
});

test('task lifecycle includes required states and idempotency fields', () => {
  for (const state of ['received', 'validated', 'awaiting_approval', 'queued', 'running', 'completed', 'failed', 'cancelled', 'timed_out']) {
    assert.match(task, new RegExp(`'${state}'`));
  }
  assert.match(task, /idempotencyKey/);
  assert.match(task, /auditTrail/);
});
