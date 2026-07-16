export interface PineReviewContract {
  identifyPineVersion: true;
  identifyIndicatorOrStrategy: true;
  detectRepaintingRisk: true;
  detectLookaheadRisk: true;
  detectRequestSecurityRisk: true;
  preserveOriginalPine: true;
  repairRequiresApproval: true;
  claimTradingViewCompileWithoutEvidence: false;
  implementedRuntime: false;
}

export const pineReviewContract: PineReviewContract = {
  identifyPineVersion: true,
  identifyIndicatorOrStrategy: true,
  detectRepaintingRisk: true,
  detectLookaheadRisk: true,
  detectRequestSecurityRisk: true,
  preserveOriginalPine: true,
  repairRequiresApproval: true,
  claimTradingViewCompileWithoutEvidence: false,
  implementedRuntime: false,
};
