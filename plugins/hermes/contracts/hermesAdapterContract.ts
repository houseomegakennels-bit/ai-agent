export interface HermesAdapterContract {
  acceptsSanitizedTaskContextOnly: true;
  receivesSecretValues: false;
  canApproveActions: false;
  canRaiseBudget: false;
  canBypassPolicy: false;
  mustExplainRouteSelection: true;
  implementedRuntime: false;
}

export const hermesAdapterContract: HermesAdapterContract = {
  acceptsSanitizedTaskContextOnly: true,
  receivesSecretValues: false,
  canApproveActions: false,
  canRaiseBudget: false,
  canBypassPolicy: false,
  mustExplainRouteSelection: true,
  implementedRuntime: false,
};
