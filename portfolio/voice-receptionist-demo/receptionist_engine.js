'use strict';

function clean(value) {
  return String(value ?? '').trim();
}

function normalizePayload(raw = {}) {
  const body = raw.body && typeof raw.body === 'object' ? raw.body : raw;
  return {
    provider: clean(body.provider || (body.CallSid ? 'twilio-mock' : 'elevenlabs-mock')),
    callId: clean(body.call_id || body.CallSid || body.conversation_id),
    caller: clean(body.caller || body.From || body.phone_number),
    transcript: clean(body.transcript || body.SpeechResult || body.user_transcript),
    intent: clean(body.intent).toLowerCase(),
    callerName: clean(body.caller_name || body.name),
    requestedStart: clean(body.requested_start || body.appointment_start),
    simulateCalendarFailure: body.simulate_calendar_failure === true,
  };
}

function slug(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function bookingKey(call) {
  return `booking:${slug(call.caller)}:${slug(call.requestedStart)}`;
}

function processCall(raw, state = new Set()) {
  const call = normalizePayload(raw);
  const words = call.transcript.toLowerCase();
  const emergency = /\b(emergency|can't breathe|cannot breathe|chest pain|suicide|kill myself|fire)\b/i.test(words);
  const wantsHuman = call.intent === 'human' || /\b(human|representative|real person|operator)\b/i.test(words);
  const wantsBooking = call.intent === 'book_appointment' || /\b(book|schedule|appointment)\b/i.test(words);
  const base = { demonstration: true, liveProviderCalled: false, call };

  if (!call.callId || !call.caller || !call.transcript) {
    return { ...base, status: 'human_review', reason: 'INVALID_OR_INCOMPLETE_CALL_PAYLOAD', confirmationAllowed: false };
  }
  if (emergency) {
    return { ...base, status: 'emergency_escalation', reason: 'EMERGENCY_LANGUAGE_DETECTED', confirmationAllowed: false, response: 'If this is an emergency, call local emergency services now.' };
  }
  if (wantsHuman) {
    return { ...base, status: 'human_transfer', reason: 'CALLER_REQUESTED_HUMAN', confirmationAllowed: false, response: 'I will route this request to a person.' };
  }
  if (!wantsBooking) {
    return { ...base, status: 'message_captured', reason: 'NO_BOOKING_ACTION_REQUESTED', confirmationAllowed: false, response: 'I can take a message or help collect appointment details.' };
  }

  const missing = [];
  if (!call.callerName) missing.push('caller_name');
  if (!call.requestedStart) missing.push('requested_start');
  if (missing.length) {
    return { ...base, status: 'needs_information', reason: 'MISSING_BOOKING_FIELDS', missing, confirmationAllowed: false, response: `I still need: ${missing.join(', ')}.` };
  }

  const key = bookingKey(call);
  if (state.has(key)) {
    return { ...base, status: 'duplicate_blocked', reason: 'IDEMPOTENCY_KEY_ALREADY_SEEN', idempotencyKey: key, confirmationAllowed: false, response: 'This request is already being handled.' };
  }
  if (call.simulateCalendarFailure) {
    return { ...base, status: 'human_review', reason: 'CALENDAR_WRITE_FAILED', idempotencyKey: key, confirmationAllowed: false, response: 'I could not confirm that appointment. A person will review the request.' };
  }

  const record = { id: `demo-${slug(call.callId)}`, start: call.requestedStart, callerName: call.callerName, caller: call.caller };
  state.add(key);
  return { ...base, status: 'booked', reason: 'MOCK_CALENDAR_RECORD_CREATED', idempotencyKey: key, confirmationAllowed: true, calendarRecord: record, response: `Your demonstration appointment is confirmed for ${call.requestedStart}.` };
}

module.exports = { bookingKey, normalizePayload, processCall };
