export type HardeningDrill =
  | 'restore_drill'
  | 'failure_simulation'
  | 'migration_safety'
  | 'dependency_scan'
  | 'security_review'
  | 'preview_deploy'
  | 'rollback_validation'
  | 'production_acceptance';

export interface ProductionHardeningContract {
  drills: HardeningDrill[];
  restoreDrillRequired: true;
  failureSimulationRequired: true;
  migrationDryRunRequired: true;
  dependencyScanRequired: true;
  securityReviewRequired: true;
  previewDeployContractRequired: true;
  rollbackValidationRequired: true;
  productionAcceptanceRequired: true;
  productionDeployImplemented: false;
  realSecretsRequired: false;
}

export const productionHardeningContract: ProductionHardeningContract = {
  drills: [
    'restore_drill',
    'failure_simulation',
    'migration_safety',
    'dependency_scan',
    'security_review',
    'preview_deploy',
    'rollback_validation',
    'production_acceptance',
  ],
  restoreDrillRequired: true,
  failureSimulationRequired: true,
  migrationDryRunRequired: true,
  dependencyScanRequired: true,
  securityReviewRequired: true,
  previewDeployContractRequired: true,
  rollbackValidationRequired: true,
  productionAcceptanceRequired: true,
  productionDeployImplemented: false,
  realSecretsRequired: false,
};
