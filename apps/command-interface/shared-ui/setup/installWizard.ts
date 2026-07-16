export type SetupStepStatus = 'locked' | 'ready' | 'verified' | 'blocked';

export interface SetupWizardStep {
  id: string;
  title: string;
  why: string;
  iphoneAction: string;
  verifies: string;
  required: boolean;
  status: SetupStepStatus;
}

export const releaseMinusOneSetupSteps: SetupWizardStep[] = [
  {
    id: 'admin-account',
    title: 'Create administrator account',
    why: 'The controller needs one accountable operator before any integrations are connected.',
    iphoneAction: 'Open the setup link in Safari and create the administrator profile.',
    verifies: 'Admin profile exists and recovery options are not skipped.',
    required: true,
    status: 'ready',
  },
  {
    id: 'passkey',
    title: 'Register passkey',
    why: 'Passkeys provide the primary phone-first login method.',
    iphoneAction: 'Tap Register Passkey and approve with Face ID or device passcode.',
    verifies: 'A passkey credential is registered for the administrator account.',
    required: true,
    status: 'locked',
  },
  {
    id: 'totp-recovery',
    title: 'Configure TOTP and recovery codes',
    why: 'The operator needs a fallback if the passkey is unavailable.',
    iphoneAction: 'Save recovery codes outside the app and verify one code before continuing.',
    verifies: 'TOTP is confirmed and recovery-code verification succeeds.',
    required: true,
    status: 'locked',
  },
  {
    id: 'telegram',
    title: 'Connect Telegram',
    why: 'Telegram is the fastest command and alert surface.',
    iphoneAction: 'Paste placeholder bot details only in the future setup form when the connector exists.',
    verifies: 'Future connector must verify getMe, allowed user ID, webhook secret, and deduplication.',
    required: true,
    status: 'locked',
  },
  {
    id: 'github',
    title: 'Connect GitHub',
    why: 'Repository work, branches, pull requests, and reviews depend on GitHub access.',
    iphoneAction: 'Use the guided GitHub connection screen when implemented; do not paste keys into chat.',
    verifies: 'Future connector must verify repository access and Codespaces permission separately.',
    required: true,
    status: 'locked',
  },
  {
    id: 'final-diagnostics',
    title: 'Run final diagnostics',
    why: 'The system is not ready until required setup checks pass.',
    iphoneAction: 'Tap Run Diagnostics and review any guided repair steps.',
    verifies: 'All required checks pass or the wizard remains blocked with a clear explanation.',
    required: true,
    status: 'locked',
  }
];

export function installationProgress(steps: SetupWizardStep[]): number {
  const requiredSteps = steps.filter((step) => step.required);
  const verifiedSteps = requiredSteps.filter((step) => step.status === 'verified');
  return requiredSteps.length === 0 ? 100 : Math.round((verifiedSteps.length / requiredSteps.length) * 100);
}

export function nextSetupAction(steps: SetupWizardStep[]): SetupWizardStep | undefined {
  return steps.find((step) => step.status === 'ready' || step.status === 'blocked');
}

export function canAdvanceFromStep(step: SetupWizardStep): boolean {
  return step.status === 'verified';
}
