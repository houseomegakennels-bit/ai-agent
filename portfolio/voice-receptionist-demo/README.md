# AI Voice Receptionist Safety Demonstration

This is a synthetic demonstration project prepared by Carlos Pearson / Blackspire Helix Group for technical evaluation. It is **not** a paid client deployment, a live phone line, or evidence of production experience with Twilio or ElevenLabs.

## What it demonstrates

- Normalizes mock Twilio-style and ElevenLabs-style call payloads.
- Separates emergency language, human-transfer requests, appointment requests, and general messages.
- Refuses to claim an appointment is booked until a simulated calendar write succeeds.
- Creates a deterministic idempotency key and blocks a repeated booking request.
- Routes missing details and failed writes to human review.
- Produces an audit-friendly decision object without using credentials or external services.

## Files

- `voice_receptionist_demo.workflow.json` — importable n8n workflow using built-in nodes only.
- `receptionist_engine.js` — standalone version of the decision logic.
- `test_receptionist.js` — deterministic acceptance tests.
- `test_results.txt` — captured results from the test run.
- `sample_calls.json` — fictional input examples.

## Run the tests

```bash
node test_receptionist.js
```

## Safety behavior

The demonstration never sends email, changes a real calendar, places a phone call, or touches customer data. Emergency language is escalated rather than handled by the assistant. A booking is confirmed only after the mock calendar adapter returns a created record. Missing fields, duplicate requests, and simulated write failures are surfaced explicitly.

## Production limits

A real installation would still require approved accounts and credentials, provider-specific webhook verification, Twilio/ElevenLabs configuration, a real calendar or CRM adapter, time-zone rules, consent and recording disclosures, retry policy, monitoring, privacy review, and live acceptance testing. The included workflow uses workflow static data for a small idempotency demonstration; production deployments should use a durable database with an agreed retention policy.
