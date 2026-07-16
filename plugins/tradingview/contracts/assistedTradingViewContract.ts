export type AssistedTradingViewStep =
  | 'review-pine-script'
  | 'propose-repair'
  | 'require-repair-approval'
  | 'create-backtest-manifest'
  | 'open-assisted-browser-session'
  | 'display-mobile-checklist'
  | 'collect-official-exports'
  | 'validate-evidence'
  | 'package-evidence'
  | 'reject-invalid-evidence';

export interface AssistedTradingViewContractStep {
  step: AssistedTradingViewStep;
  purpose: string;
  operatorActionRequired: boolean;
  tradingViewAutomationAllowed: false;
  realCredentialInRepoAllowed: false;
  implementedRuntime: false;
}

export const releaseSixAssistedTradingViewSteps: AssistedTradingViewContractStep[] = [
  { step: 'review-pine-script', purpose: 'Review Pine script for version, indicator/strategy type, repainting, lookahead, and request.security risks.', operatorActionRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'propose-repair', purpose: 'Propose Pine repairs without mutating source until approval.', operatorActionRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'require-repair-approval', purpose: 'Require operator approval before applying Pine repair changes.', operatorActionRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'create-backtest-manifest', purpose: 'Create a manifest describing symbol, timeframe, settings, date range, and expected exports.', operatorActionRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'open-assisted-browser-session', purpose: 'Open a future secure browser session controlled by the operator.', operatorActionRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'display-mobile-checklist', purpose: 'Show exact iPhone-friendly TradingView steps and settings.', operatorActionRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'collect-official-exports', purpose: 'Collect operator-exported TradingView CSV/report files as untrusted files.', operatorActionRequired: true, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'validate-evidence', purpose: 'Validate official exports, screenshots, manifest consistency, and missing data before analysis.', operatorActionRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'package-evidence', purpose: 'Package manifest, exports, screenshots, and report summaries.', operatorActionRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
  { step: 'reject-invalid-evidence', purpose: 'Reject incomplete, inconsistent, or unofficial evidence rather than fabricating results.', operatorActionRequired: false, tradingViewAutomationAllowed: false, realCredentialInRepoAllowed: false, implementedRuntime: false },
];

export function assistedTradingViewRemainsManual(steps: AssistedTradingViewContractStep[]): boolean {
  return steps.every((step) => step.tradingViewAutomationAllowed === false && step.realCredentialInRepoAllowed === false && step.implementedRuntime === false);
}
