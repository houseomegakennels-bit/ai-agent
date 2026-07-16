import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/productionHealthReadinessSmokeTestContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/production-health-readiness-smoke-test.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 37 production health/readiness smoke test defines redacted evidence shapes', () => {
  assert.match(contractSource, /productionHealthReadinessSmokeChecks/);
  assert.match(contractSource, /controller-health-response-shape/);
  assert.match(contractSource, /controller-readiness-response-shape/);
  assert.match(contractSource, /telegram-webhook-health-placeholder/);
  assert.match(contractSource, /operator-mobile-smoke-proof-placeholder/);
  assert.match(contractSource, /rollback-health-gate-placeholder/);
  assert.match(contractSource, /REDACTED_CONTROLLER_HEALTH_RESPONSE_SHAPE_FIXTURE/);
  assert.match(contractSource, /REDACTED_CONTROLLER_READINESS_RESPONSE_SHAPE_FIXTURE/);
  assert.match(contractSource, /REDACTED_TELEGRAM_WEBHOOK_HEALTH_PLACEHOLDER/);
  assert.match(contractSource, /REDACTED_OPERATOR_MOBILE_SMOKE_PROOF_PLACEHOLDER/);
  assert.match(contractSource, /REDACTED_ROLLBACK_HEALTH_GATE_PLACEHOLDER/);
});

test('Release 37 smoke test cannot contact live production infrastructure', () => {
  assert.match(contractSource, /status: 'production_health_readiness_smoke_test_not_executed'/);
  assert.match(contractSource, /healthEndpointContacted: false/);
  assert.match(contractSource, /readinessEndpointContacted: false/);
  assert.match(contractSource, /telegramWebhookContacted: false/);
  assert.match(contractSource, /productionUrlIncluded: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /botTokenIncluded: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|curl\s|ping\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}|[0-9]{6,}:[A-Za-z0-9_-]{20,}/i);
});

test('Release 37 docs and manifest keep smoke testing non-live', () => {
  assert.match(docSource, /production health\/readiness smoke-test contract only, not executed/i);
  assert.match(docSource, /Production health endpoint contacted: no/);
  assert.match(docSource, /Production readiness endpoint contacted: no/);
  assert.match(docSource, /Production URL included: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(manifestSource, /production_health_readiness_smoke_test/);
  assert.match(manifestSource, /redacted_smoke_test_contract_only/);
});
