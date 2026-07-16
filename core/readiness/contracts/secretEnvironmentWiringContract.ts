export type SecretEnvironmentWiringStatus = 'placeholder_only' | 'operator_runtime_only';

export interface SecretEnvironmentWiringItem {
  keyName: string;
  purpose: string;
  status: SecretEnvironmentWiringStatus;
  mayCommitValue: false;
  runtimeOnly: true;
}

export const secretEnvironmentWiringContract: SecretEnvironmentWiringItem[] = [
  { keyName: 'TELEGRAM_BOT_TOKEN', purpose: 'Telegram bridge runtime authentication', status: 'placeholder_only', mayCommitValue: false, runtimeOnly: true },
  { keyName: 'TELEGRAM_ALLOWED_CHAT_ID', purpose: 'Operator chat allow-list', status: 'placeholder_only', mayCommitValue: false, runtimeOnly: true },
  { keyName: 'CONTROLLER_PUBLIC_BASE_URL', purpose: 'Approved controller callback target', status: 'placeholder_only', mayCommitValue: false, runtimeOnly: true },
  { keyName: 'GITHUB_APP_PRIVATE_KEY', purpose: 'Future GitHub app integration', status: 'placeholder_only', mayCommitValue: false, runtimeOnly: true },
];

export function assertNoCommittedSecretValues(items: SecretEnvironmentWiringItem[] = secretEnvironmentWiringContract): boolean {
  return items.every((item) => item.mayCommitValue === false && item.runtimeOnly === true && item.status === 'placeholder_only');
}
