export interface PropRuleSimulationContract {
  dailyLossLimitRequired: true;
  trailingDrawdownRequired: true;
  maxPositionRuleRequired: true;
  consistencyRuleOptional: true;
  officialRulesSourceRequired: true;
  canDeclarePropEligibilityWithoutRules: false;
  implementedRuntime: false;
}

export const propRuleSimulationContract: PropRuleSimulationContract = {
  dailyLossLimitRequired: true,
  trailingDrawdownRequired: true,
  maxPositionRuleRequired: true,
  consistencyRuleOptional: true,
  officialRulesSourceRequired: true,
  canDeclarePropEligibilityWithoutRules: false,
  implementedRuntime: false,
};
