import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/telegramBridgeDryRunContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/telegram-bridge-dry-run.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 26 Telegram bridge contract uses local fixtures only', () => {
  assert.match(contractSource, /telegramBridgeDryRunFixtures/);
  assert.match(contractSource, /runTelegramBridgeDryRunFixture/);
  assert.match(contractSource, /tokenReadAttempted: false/);
  assert.match(contractSource, /chatIdReadAttempted: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /deploymentChanged: false/);
  assert.match(contractSource, /productionBotEnabled: false/);
  assert.doesNotMatch(contractSource, /fetch\(|Telegraf|TelegramBot|grammy|axios|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}/i);
});

test('Release 26 docs and manifest keep Telegram bridge non-live', () => {
  assert.match(docSource, /local fixture dry-run only, not live/i);
  assert.match(docSource, /No production bot token/);
  assert.match(docSource, /No real chat ID/);
  assert.match(docSource, /No live endpoint/);
  assert.match(manifestSource, /telegram_bridge_dry_run/);
});
