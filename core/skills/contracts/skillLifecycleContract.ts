export interface SkillDefinitionOfDoneContract {
  typedInputSchema: true;
  typedOutputSchema: true;
  permissionClassification: true;
  riskClassification: true;
  unitTests: true;
  failureTests: true;
  auditLogging: true;
  timeout: true;
  retryRules: true;
  userFacingErrorMessage: true;
  documentation: true;
  acceptanceTest: true;
  versionMetadata: true;
  rollbackPath: true;
  placeholdersAllowedAsComplete: false;
}

export const skillDefinitionOfDoneContract: SkillDefinitionOfDoneContract = {
  typedInputSchema: true,
  typedOutputSchema: true,
  permissionClassification: true,
  riskClassification: true,
  unitTests: true,
  failureTests: true,
  auditLogging: true,
  timeout: true,
  retryRules: true,
  userFacingErrorMessage: true,
  documentation: true,
  acceptanceTest: true,
  versionMetadata: true,
  rollbackPath: true,
  placeholdersAllowedAsComplete: false,
};

export interface SkillVersionContract {
  promoteOnlyAfterTestsPass: true;
  rollbackVersionRequired: true;
  scoreTaskResultRequired: true;
  compareVersionsRequired: true;
  implementedRuntime: false;
}

export const skillVersionContract: SkillVersionContract = {
  promoteOnlyAfterTestsPass: true,
  rollbackVersionRequired: true,
  scoreTaskResultRequired: true,
  compareVersionsRequired: true,
  implementedRuntime: false,
};
