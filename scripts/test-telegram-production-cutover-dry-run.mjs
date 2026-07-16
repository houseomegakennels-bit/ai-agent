import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/telegramProductionCutoverDryRunContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/telegram-production-cutover-dry-run.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 36 Telegram production cutover dry-run defines redacted checklist artifacts', () => {
  assert.match(contractSource, /telegramProductionCutoverDryRunItems/);
  assert.match(contractSource, /telegram-operator-approval-reference/);
  assert.match(contractSource, /telegram-bot-secret-proof-reference/);
  assert.match(contractSource, /telegram-webhook-shape-reference/);
  assert.match(contractSource, /telegram-allowed-chat-proof-reference/);
  assert.match(contractSource, /telegram-rollback-reference/);
  assert.match(contractSource, /REDACTED_TELEGRAM_OPERATOR_APPROVAL_REFERENCE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_BOT_SECRET_PROOF_REFERENCE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_WEBHOOK_SHAPE_REFERENCE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_ALLOWED_CHAT_PROOF_REFERENCE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_ROLLBACK_DRY_RUN_REFERENCE/);
});

test('Release 36 dry-run cannot connect production Telegram or expose identifiers', () => {
  assert.match(contractSource, /status: 'telegram_cutover_dry_run_only_not_connected'/);
  assert.match(contractSource, /productionBotConnected: false/);
  assert.match(contractSource, /botTokenIncluded: false/);
  assert.match(contractSource, /webhookSecretIncluded: false/);
  assert.match(contractSource, /chatIdIncluded: false/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|curl\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}|[0-9]{6,}:[A-Za-z0-9_-]{20,}/i);
});

test('Release 36 docs and manifest keep Telegram cutover dry-run only', () => {
  assert.match(docSource, /Telegram production cutover dry-run only, not connected/i);
  assert.match(docSource, /Production Telegram bot connected: no/);
  assert.match(docSource, /Bot token included: no/);
  assert.match(docSource, /Chat ID included: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(manifestSource, /telegram_production_cutover_dry_run/);
  assert.match(manifestSource, /redacted_telegram_cutover_contract_only/);
});
