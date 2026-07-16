export type TradingAnalyticsCapability =
  | 'parse-tradingview-export'
  | 'calculate-backtest-metrics'
  | 'calculate-equity-curve'
  | 'calculate-drawdowns'
  | 'analyze-session-performance'
  | 'analyze-weekday-performance'
  | 'analyze-monthly-performance'
  | 'compare-long-short-performance'
  | 'detect-overfitting-signals'
  | 'simulate-prop-rules'
  | 'compare-strategy-versions'
  | 'build-trading-report';

export interface TradingAnalyticsContract {
  capability: TradingAnalyticsCapability;
  requiresOfficialExport: true;
  fabricatedResultsAllowed: false;
  tradingExecutionAllowed: false;
  implementedRuntime: false;
}

export const releaseSevenTradingAnalyticsContracts: TradingAnalyticsContract[] = [
  { capability: 'parse-tradingview-export', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'calculate-backtest-metrics', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'calculate-equity-curve', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'calculate-drawdowns', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'analyze-session-performance', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'analyze-weekday-performance', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'analyze-monthly-performance', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'compare-long-short-performance', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'detect-overfitting-signals', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'simulate-prop-rules', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'compare-strategy-versions', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
  { capability: 'build-trading-report', requiresOfficialExport: true, fabricatedResultsAllowed: false, tradingExecutionAllowed: false, implementedRuntime: false },
];

export function analyticsContractsRequireEvidence(items: TradingAnalyticsContract[]): boolean {
  return items.every((item) => item.requiresOfficialExport === true && item.fabricatedResultsAllowed === false && item.tradingExecutionAllowed === false);
}
