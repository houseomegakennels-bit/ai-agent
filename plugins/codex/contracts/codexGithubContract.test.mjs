import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const project = readFileSync('core/projects/projectRegistry.ts', 'utf8');
const github = readFileSync('plugins/github/contracts/githubWorkflowContract.ts', 'utf8');
const codex = readFileSync('plugins/codex/contracts/codexDispatchContract.ts', 'utf8');
const evaluation = readFileSync('evaluations/release-3-evaluation-contract.ts', 'utf8');
const docs = readFileSync('docs/github-codex/release-3-github-and-codex.md', 'utf8');

test('project registry uses AGENTS instructions and branch prefix without real credentials', () => {
  assert.match(project, /codexInstructions: 'AGENTS.md'/);
  assert.match(project, /workingBranchPrefix: 'telegram\/'/);
  assert.match(project, /realCredentialsAllowed: false/);
});

test('GitHub workflow requires PRs and blocks direct main push', () => {
  assert.match(github, /directMainPushAllowed: false/);
  assert.match(github, /pullRequestRequired: true/);
  assert.match(github, /humanReviewRequired: true/);
});

test('Codex dispatch routes require capability checks and cannot approve or spend', () => {
  for (const expected of ['codex-cloud-capability-test', 'codex-cli-codespace-fallback', 'open-model-coding-fallback', 'pause-and-notify-operator']) {
    assert.match(codex, new RegExp(expected));
  }
  assert.match(codex, /canApproveOwnPullRequest: false/g);
  assert.match(codex, /canSpendMoneyWithoutApproval: false/g);
});

test('Release 3 evaluation requires tests, PR, and human approval', () => {
  assert.match(evaluation, /requiresTests: true/);
  assert.match(evaluation, /requiresPullRequest: true/);
  assert.match(evaluation, /requiresHumanApprovalBeforeNextRelease: true/);
});

test('Release 3 docs forbid production credentials and runtime dispatch', () => {
  assert.match(docs, /No real GitHub private key/);
  assert.match(docs, /No runtime Codex dispatch/);
});
