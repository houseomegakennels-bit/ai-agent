export interface SupportBundlePlan {
  includes: string[];
  redactions: string[];
  forbidden: string[];
}

export const stuckWorkflowBundlePlan: SupportBundlePlan = {
  includes: [
    'current wizard step',
    'component health summary',
    'recent non-secret errors',
    'browser-safe screenshots when available',
    'release and build manifest identifiers',
  ],
  redactions: [
    'tokens',
    'passwords',
    'webhook secrets',
    'private keys',
    'recovery codes',
    'raw uploaded private file contents',
  ],
  forbidden: [
    'secret vault values',
    'Telegram bot token',
    'GitHub private key material',
    'model provider API keys',
    'backup storage secret keys',
  ],
};

export function explainStuckStep(stepTitle: string): string {
  return `Capture diagnostics for "${stepTitle}", redact secrets, preserve setup progress, and offer guided repair before retrying.`;
}
