export interface PreviewDeployContract {
  isolatedEnvironmentRequired: true;
  disposableCredentialsOnly: true;
  noProductionTraffic: true;
  mobileSafariSmokeTestRequired: true;
  teardownPlanRequired: true;
  implementedRuntime: false;
}

export interface SecurityReviewContract {
  dependencyScanRequired: true;
  secretScanRequired: true;
  endpointInventoryRequired: true;
  containerHardeningReviewRequired: true;
  incidentResponseReviewRequired: true;
  humanApprovalRequired: true;
}

export const previewDeployContract: PreviewDeployContract = {
  isolatedEnvironmentRequired: true,
  disposableCredentialsOnly: true,
  noProductionTraffic: true,
  mobileSafariSmokeTestRequired: true,
  teardownPlanRequired: true,
  implementedRuntime: false,
};

export const securityReviewContract: SecurityReviewContract = {
  dependencyScanRequired: true,
  secretScanRequired: true,
  endpointInventoryRequired: true,
  containerHardeningReviewRequired: true,
  incidentResponseReviewRequired: true,
  humanApprovalRequired: true,
};
