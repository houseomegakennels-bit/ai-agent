export type BrowserSessionCapability =
  | 'start-on-demand-browser'
  | 'restore-browser-profile-placeholder'
  | 'verify-browser-health'
  | 'secure-mobile-takeover'
  | 'touch-keyboard-clipboard-support'
  | 'reconnect-session'
  | 'capture-screenshot'
  | 'manage-download'
  | 'pause-on-security-challenge'
  | 'create-browser-trace'
  | 'terminate-session';

export interface BrowserSessionContract {
  capability: BrowserSessionCapability;
  purpose: string;
  operatorControlRequired: boolean;
  tradingViewAutomationAllowed: false;
  realCredentialInRepoAllowed: false;
  implementedRuntime: false;
}

export const releaseFiveBrowserContracts: BrowserSessionContract[] = [
  { capability: 'start-on-demand-browser', purpose: 'Define future browser startup only when an approved task requires it.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'restore-browser-profile-placeholder', purpose: 'Define profile restore boundaries without storing real browser credentials.', operatorControlRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'verify-browser-health', purpose: 'Check future browser process health before takeover.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'secure-mobile-takeover', purpose: 'Let the operator control the browser from iPhone through a secure takeover flow.', operatorControlRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'touch-keyboard-clipboard-support', purpose: 'Require touch, keyboard, and clipboard usability checks for mobile operation.', operatorControlRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'reconnect-session', purpose: 'Recover safely from mobile network interruptions without duplicating actions.', operatorControlRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'capture-screenshot', purpose: 'Capture screenshots for evidence and support bundles with secret redaction rules.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'manage-download', purpose: 'Manage browser downloads as untrusted files requiring validation before use.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'pause-on-security-challenge', purpose: 'Freeze automation and return control to the operator on CAPTCHA, login, or security warning.', operatorControlRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'create-browser-trace', purpose: 'Create redacted traces for diagnostics and replay-safe support.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { capability: 'terminate-session', purpose: 'Terminate browser session and cleanup temporary files after task completion or timeout.', operatorControlRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
];

export function browserContractsAreRuntimeFree(items: BrowserSessionContract[]): boolean {
  return items.every((item) => item.implementedRuntime === false && item.realCredentialInRepoAllowed === false && item.tradingViewAutomationAllowed === false);
}
