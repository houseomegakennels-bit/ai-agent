export interface CodespaceBudgetContract {
  monthlyUsdCeiling: 15;
  warningThresholdsPercent: [50, 75, 90];
  agentCanIncreaseBudget: false;
  startBlockedWhenBudgetExceeded: true;
  implementedRuntime: false;
}

export const codespaceBudgetContract: CodespaceBudgetContract = {
  monthlyUsdCeiling: 15,
  warningThresholdsPercent: [50, 75, 90],
  agentCanIncreaseBudget: false,
  startBlockedWhenBudgetExceeded: true,
  implementedRuntime: false,
};
