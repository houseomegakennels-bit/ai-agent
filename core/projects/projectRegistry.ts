export interface ProjectRegistryEntry {
  project: string;
  repository: string;
  defaultBranch: 'main';
  workingBranchPrefix: string;
  codexInstructions: 'AGENTS.md';
  permissionMode: 'work';
  browserProfile: 'default' | 'trading';
  realCredentialsAllowed: false;
}

export const defaultProjectRegistryEntry: ProjectRegistryEntry = {
  project: 'blackspire-helix-command-core',
  repository: 'blackspire-helix/helix-command-core',
  defaultBranch: 'main',
  workingBranchPrefix: 'telegram/',
  codexInstructions: 'AGENTS.md',
  permissionMode: 'work',
  browserProfile: 'default',
  realCredentialsAllowed: false,
};

export function isValidWorkingBranch(entry: ProjectRegistryEntry, branch: string): boolean {
  return branch.startsWith(entry.workingBranchPrefix) && branch !== entry.defaultBranch;
}
