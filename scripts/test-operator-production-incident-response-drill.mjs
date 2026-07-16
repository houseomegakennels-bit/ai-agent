import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const contractSource = readFileSync('core/readiness/contracts/operatorProductionIncidentResponseDrillContract.ts', 'utf8');
const docSource = readFileSync('docs/go-live/operator-production-incident-response-drill.md', 'utf8');
const manifestSource = readFileSync('BUILD_MANIFEST.json', 'utf8');

test('Release 38 incident response drill defines iPhone-first redacted evidence', () => {
  assert.match(contractSource, /operatorIncidentResponseDrillSteps/);
  assert.match(contractSource, /operator-incident-intake-proof/);
  assert.match(contractSource, /operator-escalation-path-proof/);
  assert.match(contractSource, /service-degradation-triage-proof/);
  assert.match(contractSource, /emergency-stop-confirmation-proof/);
  assert.match(contractSource, /operator-post-incident-handoff-proof/);
  assert.match(contractSource, /REDACTED_OPERATOR_INCIDENT_INTAKE_PROOF/);
  assert.match(contractSource, /REDACTED_OPERATOR_ESCALATION_PATH_PROOF/);
  assert.match(contractSource, /REDACTED_SERVICE_DEGRADATION_TRIAGE_PROOF/);
  assert.match(contractSource, /REDACTED_EMERGENCY_STOP_CONFIRMATION_PROOF/);
  assert.match(contractSource, /REDACTED_OPERATOR_POST_INCIDENT_HANDOFF_PROOF/);
  assert.match(contractSource, /iphoneOperable: true/);
});

test('Release 38 incident response drill cannot execute runtime incident actions', () => {
  assert.match(contractSource, /status: 'operator_incident_response_drill_not_executed'/);
  assert.match(contractSource, /liveEndpointContacted: false/);
  assert.match(contractSource, /productionUrlIncluded: false/);
  assert.match(contractSource, /serverIpIncluded: false/);
  assert.match(contractSource, /secretsIncluded: false/);
  assert.match(contractSource, /telegramProductionBotConnected: false/);
  assert.match(contractSource, /paidApiEnabled: false/);
  assert.match(contractSource, /brokerIntegrationEnabled: false/);
  assert.match(contractSource, /tradingIntegrationEnabled: false/);
  assert.match(contractSource, /runtimeActionExecuted: false/);
  assert.match(contractSource, /runtimeImplementationApprovalRequired: true/);
  assert.doesNotMatch(contractSource, /fetch\(|ssh\s|rsync|scp\s|kubectl|docker\s+push|docker\s+compose\s+up|docker\s+run|systemctl|pm2\s|curl\s|ping\s|https?:\/\/|[0-9]{1,3}(\.[0-9]{1,3}){3}|[0-9]{6,}:[A-Za-z0-9_-]{20,}/i);
});

test('Release 38 docs and manifest keep incident response drill non-live', () => {
  assert.match(docSource, /operator production incident response drill contract only, not executed/i);
  assert.match(docSource, /iPhone-first drill: yes/);
  assert.match(docSource, /Live endpoint contacted: no/);
  assert.match(docSource, /Runtime incident action executed: no/);
  assert.match(docSource, /Runtime implementation approval required: yes/);
  assert.match(manifestSource, /operator_production_incident_response_drill/);
  assert.match(manifestSource, /redacted_incident_drill_contract_only/);
});
