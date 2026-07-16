export type KnowledgeArea = 'memory' | 'skills' | 'documentation' | 'prompts' | 'research' | 'decisions';

export interface KnowledgeEntryContract {
  sourceRequired: true;
  dateRequired: true;
  projectScopeRequired: true;
  confidenceRequired: true;
  sensitivityRequired: true;
  expirationOrReviewDateRequired: true;
  editDeleteControlsRequired: true;
}

export interface KnowledgeSystemContract {
  areas: KnowledgeArea[];
  storageMode: 'git-tracked-markdown-v1';
  vectorDatabaseAllowed: false;
  runtimeMemoryStoreImplemented: false;
  entryContract: KnowledgeEntryContract;
}

export const releaseEightKnowledgeSystemContract: KnowledgeSystemContract = {
  areas: ['memory', 'skills', 'documentation', 'prompts', 'research', 'decisions'],
  storageMode: 'git-tracked-markdown-v1',
  vectorDatabaseAllowed: false,
  runtimeMemoryStoreImplemented: false,
  entryContract: {
    sourceRequired: true,
    dateRequired: true,
    projectScopeRequired: true,
    confidenceRequired: true,
    sensitivityRequired: true,
    expirationOrReviewDateRequired: true,
    editDeleteControlsRequired: true,
  },
};
