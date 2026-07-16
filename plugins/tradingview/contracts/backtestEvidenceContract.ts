export interface BacktestEvidenceContract {
  manifestRequired: true;
  officialExportsRequired: true;
  screenshotsAllowedWithRedaction: true;
  userObservedResultsRequired: true;
  fabricatedResultsAllowed: false;
  uploadedExportsAreUntrusted: true;
  implementedRuntime: false;
}

export const backtestEvidenceContract: BacktestEvidenceContract = {
  manifestRequired: true,
  officialExportsRequired: true,
  screenshotsAllowedWithRedaction: true,
  userObservedResultsRequired: true,
  fabricatedResultsAllowed: false,
  uploadedExportsAreUntrusted: true,
  implementedRuntime: false,
};
