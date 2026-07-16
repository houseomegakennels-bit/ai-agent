import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const session = readFileSync('plugins/browser/contracts/browserSessionContract.ts', 'utf8');
const security = readFileSync('plugins/browser/contracts/browserSecurityContract.ts', 'utf8');
const docs = readFileSync('docs/browser/release-5-browser-prototype.md', 'utf8');

test('Release 5 browser contracts include takeover, reconnect, screenshots, downloads, security pause, and trace', () => {
  for (const expected of ['secure-mobile-takeover', 'reconnect-session', 'capture-screenshot', 'manage-download', 'pause-on-security-challenge', 'create-browser-trace']) {
    assert.match(session, new RegExp(expected));
  }
});

test('browser contracts forbid TradingView automation and credentials', () => {
  assert.match(session, /tradingViewAutomationAllowed: false/g);
  assert.match(session, /realCredentialInRepoAllowed: false/g);
  assert.match(session, /implementedRuntime: false/g);
});

test('browser security contract blocks public control ports, docker socket, secrets, CAPTCHA bypass, and fingerprint rotation', () => {
  for (const expected of ['publicControlPortAllowed: false', 'dockerSocketExposed: false', 'secretsMountedIntoBrowser: false', 'captchaBypassAllowed: false', 'proxyFingerprintRotationAllowed: false']) {
    assert.match(security, new RegExp(expected));
  }
});

test('Release 5 docs keep real browser runtime and TradingView automation out of scope', () => {
  assert.match(docs, /No browser worker is started/);
  assert.match(docs, /No TradingView automation/);
});
