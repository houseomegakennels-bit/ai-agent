import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const shell = readFileSync('apps/command-interface/shared-ui/HelixCommandShell.tsx', 'utf8');
const state = readFileSync('apps/command-interface/shared-ui/mobileState.ts', 'utf8');
const css = readFileSync('apps/command-interface/shared-ui/styles.css', 'utf8');
const manifest = readFileSync('apps/command-interface/public/manifest.webmanifest', 'utf8');

test('mobile shell defaults to Basic Mode and the approved project', () => {
  assert.match(state, /mode:\s*'basic'/);
  assert.match(state, /currentProject:\s*'Blackspire Helix Command Core'/);
});

test('human-action queue and emergency controls are visible in shell source', () => {
  assert.match(shell, /Needs Your Attention/);
  assert.match(shell, /Start Guided Review/);
  assert.match(shell, /Emergency Stop/);
  assert.match(shell, /Low-bandwidth mode/);
  assert.match(shell, /Explain this screen/);
});

test('offline safety only allows draft task queueing', () => {
  assert.match(state, /return action === 'draft_task'/);
});

test('mobile CSS includes touch target, focus, responsive, and reduced-motion rules', () => {
  assert.match(css, /min-height:\s*48px/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /max-width:\s*430px/);
});

test('PWA manifest is installable scaffold metadata', () => {
  const parsed = JSON.parse(manifest);
  assert.equal(parsed.display, 'standalone');
  assert.equal(parsed.short_name, 'Helix');
});
