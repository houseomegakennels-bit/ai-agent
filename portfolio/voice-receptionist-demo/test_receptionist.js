'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const { processCall } = require('./receptionist_engine');

const base = {
  CallSid: 'CA-DEMO-001',
  From: '+15550101010',
  SpeechResult: 'I need to book an appointment',
  caller_name: 'Jordan Example',
  requested_start: '2026-09-22T14:30:00-04:00',
};

const state = new Set();
const successful = processCall(base, state);
const tests = [
  ['successful write permits confirmation', () => assert.equal(successful.confirmationAllowed, true)],
  ['successful write returns mock calendar record', () => assert.equal(successful.calendarRecord.id, 'demo-ca-demo-001')],
  ['repeat request is blocked', () => assert.equal(processCall({ ...base, CallSid: 'CA-DEMO-002' }, state).status, 'duplicate_blocked')],
  ['calendar failure never confirms', () => assert.equal(processCall({ ...base, CallSid: 'CA-DEMO-003', requested_start: '2026-09-23T09:00:00-04:00', simulate_calendar_failure: true }, state).confirmationAllowed, false)],
  ['calendar failure goes to human review', () => assert.equal(processCall({ ...base, CallSid: 'CA-DEMO-004', requested_start: '2026-09-23T10:00:00-04:00', simulate_calendar_failure: true }, state).status, 'human_review')],
  ['missing booking details are requested', () => assert.deepEqual(processCall({ CallSid: 'CA-DEMO-005', From: '+15550101011', SpeechResult: 'Book an appointment' }, state).missing, ['caller_name', 'requested_start'])],
  ['human request transfers without action', () => assert.equal(processCall({ CallSid: 'CA-DEMO-006', From: '+15550101012', SpeechResult: 'I want a real person' }, state).status, 'human_transfer')],
  ['emergency language escalates', () => assert.equal(processCall({ CallSid: 'CA-DEMO-007', From: '+15550101013', SpeechResult: 'This is an emergency, I cannot breathe' }, state).status, 'emergency_escalation')],
  ['general question becomes a message', () => assert.equal(processCall({ CallSid: 'CA-DEMO-008', From: '+15550101014', SpeechResult: 'What time do you close?' }, state).status, 'message_captured')],
  ['invalid payload requires review', () => assert.equal(processCall({}, state).status, 'human_review')],
  ['Twilio-style fields normalize correctly', () => assert.equal(successful.call.provider, 'twilio-mock')],
  ['demo never claims a live provider call', () => assert.equal(successful.liveProviderCalled, false)],
];

let passed = 0;
for (const [name, test] of tests) {
  try {
    test();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    console.error(error.stack);
    process.exitCode = 1;
  }
}

const workflow = JSON.parse(fs.readFileSync('voice_receptionist_demo.workflow.json', 'utf8'));
assert.equal(workflow.meta.demonstrationProject, true);
assert.equal(workflow.nodes.length, 4);
console.log('PASS: workflow export parses and is explicitly labeled');
passed += 1;

console.log(`\n${passed}/${tests.length + 1} acceptance tests passed.`);
if (passed !== tests.length + 1) process.exitCode = 1;
