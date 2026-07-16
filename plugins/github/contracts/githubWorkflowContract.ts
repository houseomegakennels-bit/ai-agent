export interface GitHubWorkflowContract {
  directMainPushAllowed: false;
  pullRequestRequired: true;
  humanReviewRequired: true;
  branchPrefixRequired: true;
  secretValuesAllowed: false;
  implementedRuntime: false;
}

export const githubWorkflowContract: GitHubWorkflowContract = {
  directMainPushAllowed: false,
  pullRequestRequired: true,
  humanReviewRequired: true,
  branchPrefixRequired: true,
  secretValuesAllowed: false,
  implementedRuntime: false,
};

export const requiredPullRequestEvidence = [
  'files changed',
  'tests or checks performed',
  'assumptions',
  'skipped work',
  'secret/live endpoint confirmation',
] as const;
