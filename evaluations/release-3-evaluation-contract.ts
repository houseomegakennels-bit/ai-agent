export interface ReleaseEvaluationContract {
  release: '3';
  requiresTests: true;
  requiresPullRequest: true;
  requiresHumanApprovalBeforeNextRelease: true;
  passCriteria: string[];
}

export const releaseThreeEvaluationContract: ReleaseEvaluationContract = {
  release: '3',
  requiresTests: true,
  requiresPullRequest: true,
  requiresHumanApprovalBeforeNextRelease: true,
  passCriteria: [
    'project registry contract exists',
    'GitHub workflow blocks direct main push',
    'Codex dispatch routes require capability checks',
    'Codex cannot approve its own pull request',
    'no real credentials are introduced',
  ],
};
