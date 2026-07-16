export type TelegramMvpStage =
  | 'receive-update'
  | 'validate-webhook-secret-placeholder'
  | 'validate-allowed-user-placeholder'
  | 'deduplicate-update'
  | 'store-durable-task'
  | 'acknowledge-under-one-second'
  | 'process-asynchronously'
  | 'return-result-package';

export interface TelegramMvpContractStep {
  stage: TelegramMvpStage;
  purpose: string;
  targetMs?: number;
  requiresSecretValue: false;
  implementedRuntime: false;
}

export const telegramMvpContract: TelegramMvpContractStep[] = [
  {
    stage: 'receive-update',
    purpose: 'Accept a Telegram update envelope from the future webhook handler.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'validate-webhook-secret-placeholder',
    purpose: 'Define the future webhook-secret validation point without storing or requesting the real secret.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'validate-allowed-user-placeholder',
    purpose: 'Define future numeric Telegram user allowlist validation without storing a real user ID.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'deduplicate-update',
    purpose: 'Reject duplicate update IDs before task creation.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'store-durable-task',
    purpose: 'Persist a task record before asynchronous processing begins.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'acknowledge-under-one-second',
    purpose: 'Return a compact acknowledgement immediately while work continues out of band.',
    targetMs: 1000,
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'process-asynchronously',
    purpose: 'Route future work to a background worker after acknowledgement.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
  {
    stage: 'return-result-package',
    purpose: 'Return summaries, files, PR links, and evidence packages through the future result channel.',
    requiresSecretValue: false,
    implementedRuntime: false,
  },
];

export function hasImmediateAckTarget(steps: TelegramMvpContractStep[]): boolean {
  return steps.some((step) => step.stage === 'acknowledge-under-one-second' && step.targetMs === 1000);
}

export function telegramMvpIsRuntimeFree(steps: TelegramMvpContractStep[]): boolean {
  return steps.every((step) => step.implementedRuntime === false && step.requiresSecretValue === false);
}
