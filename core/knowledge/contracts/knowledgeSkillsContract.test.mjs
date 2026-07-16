import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const knowledge = readFileSync('core/knowledge/contracts/knowledgeSystemContract.ts', 'utf8');
const skills = readFileSync('core/skills/contracts/skillLifecycleContract.ts', 'utf8');
const prompts = readFileSync('core/knowledge/contracts/promptAndAdrContract.ts', 'utf8');
const docs = readFileSync('docs/knowledge/release-8-knowledge-and-skills.md', 'utf8');

test('Release 8 knowledge contract includes all required areas and no vector DB', () => {
  for (const expected of ['memory', 'skills', 'documentation', 'prompts', 'research', 'decisions']) {
    assert.match(knowledge, new RegExp(expected));
  }
  assert.match(knowledge, /vectorDatabaseAllowed: false/);
});

test('knowledge entries require source, date, scope, confidence, sensitivity, review date, and controls', () => {
  for (const expected of ['sourceRequired', 'dateRequired', 'projectScopeRequired', 'confidenceRequired', 'sensitivityRequired', 'expirationOrReviewDateRequired', 'editDeleteControlsRequired']) {
    assert.match(knowledge, new RegExp(`${expected}: true`));
  }
});

test('skill definition of done forbids placeholders as complete and requires tests/docs/rollback', () => {
  assert.match(skills, /unitTests: true/);
  assert.match(skills, /failureTests: true/);
  assert.match(skills, /documentation: true/);
  assert.match(skills, /rollbackPath: true/);
  assert.match(skills, /placeholdersAllowedAsComplete: false/);
});

test('prompt and ADR contracts require versioning and major choice records', () => {
  assert.match(prompts, /versionRequired: true/);
  assert.match(prompts, /rollbackPromptRequired: true/);
  assert.match(prompts, /requiredForMajorChoice: true/);
});

test('Release 8 docs keep vector database and runtime memory out of scope', () => {
  assert.match(docs, /No vector database/);
  assert.match(docs, /No runtime memory store/);
});
