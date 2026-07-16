export interface RollbackValidationContract {
  rollbackPlanRequired: true;
  dataBackupRequiredBeforeMigration: true;
  restoreCommandDocumented: true;
  rollbackDrillEvidenceRequired: true;
  operatorApprovalRequiredBeforeProduction: true;
}

export interface ProductionAcceptanceContract {
  allReleaseReportsRequired: true;
  allAcceptanceResultsRequired: true;
  noCriticalKnownLimitations: true;
  noSecretsInRepository: true;
  noPaidApisEnabledSilently: true;
  noProductionDeployWithoutApproval: true;
  iphoneOperationReviewed: true;
}

export const rollbackValidationContract: RollbackValidationContract = {
  rollbackPlanRequired: true,
  dataBackupRequiredBeforeMigration: true,
  restoreCommandDocumented: true,
  rollbackDrillEvidenceRequired: true,
  operatorApprovalRequiredBeforeProduction: true,
};

export const productionAcceptanceContract: ProductionAcceptanceContract = {
  allReleaseReportsRequired: true,
  allAcceptanceResultsRequired: true,
  noCriticalKnownLimitations: true,
  noSecretsInRepository: true,
  noPaidApisEnabledSilently: true,
  noProductionDeployWithoutApproval: true,
  iphoneOperationReviewed: true,
};
