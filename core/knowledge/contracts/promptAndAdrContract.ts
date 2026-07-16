export interface PromptVersionContract {
  promptIdRequired: true;
  versionRequired: true;
  changelogRequired: true;
  rollbackPromptRequired: true;
  approvalRequiredForHighRiskPrompt: true;
  implementedRuntime: false;
}

export interface AdrContract {
  titleRequired: true;
  statusRequired: true;
  decisionRequired: true;
  rationaleRequired: true;
  migrationPathRequired: true;
  requiredForMajorChoice: true;
}

export const promptVersionContract: PromptVersionContract = {
  promptIdRequired: true,
  versionRequired: true,
  changelogRequired: true,
  rollbackPromptRequired: true,
  approvalRequiredForHighRiskPrompt: true,
  implementedRuntime: false,
};

export const adrContract: AdrContract = {
  titleRequired: true,
  statusRequired: true,
  decisionRequired: true,
  rationaleRequired: true,
  migrationPathRequired: true,
  requiredForMajorChoice: true,
};
