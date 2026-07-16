import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const modes = readFileSync('apps/command-interface/shared-ui/jarvis/interfaceModes.ts', 'utf8');
const auth = readFileSync('apps/command-interface/shared-ui/jarvis/miniAppAuthContract.ts', 'utf8');
const live = readFileSync('apps/command-interface/shared-ui/jarvis/liveUpdateContract.ts', 'utf8');
const voice = readFileSync('apps/command-interface/shared-ui/jarvis/voiceAndNotificationContracts.ts', 'utf8');
const docs = readFileSync('docs/interface/release-1a/jarvis-command-interface.md', 'utf8');

test('Release 1A defines all required interface modes', () => {
  for (const mode of ['basic', 'advanced', 'command', 'operations', 'trade', 'system']) {
    assert.match(modes, new RegExp(`mode: '${mode}'`));
  }
});

test('all modes keep Emergency Stop visible and phone-first', () => {
  assert.match(modes, /alwaysShowEmergencyStop: true/g);
  assert.match(modes, /phoneFirst: true/g);
});

test('Telegram Mini App authentication is server-side and does not trust display names', () => {
  assert.match(auth, /validatesSignedInitDataServerSide: true/);
  assert.match(auth, /enforcesAllowedTelegramUserIdServerSide: true/);
  assert.match(auth, /trustsDisplayName: false/);
  assert.match(auth, /implementedRuntime: false/);
});

test('live updates do not keep webhook requests open', () => {
  assert.match(live, /server-sent-events/);
  assert.match(live, /short-polling-fallback/);
  assert.match(live, /keepsWebhookOpen: false/g);
});

test('voice commands require transcript review and confirmation', () => {
  assert.match(voice, /rawVoiceCanExecuteDestructiveAction: false/);
  assert.match(voice, /requiresTranscriptReview: true/);
  assert.match(voice, /requiresConfirmationForPaidSecurityDeploymentTrading: true/);
});

test('Release 1A docs keep runtime integrations out of scope', () => {
  assert.match(docs, /No production Telegram Mini App deployment/);
  assert.match(docs, /No real passkey session runtime/);
  assert.match(docs, /No push notification provider connection/);
});
