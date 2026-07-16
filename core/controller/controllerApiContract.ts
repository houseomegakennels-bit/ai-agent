export interface ControllerApiContract {
  release: '10';
  app: 'controller-api';
  endpoints: ['/health', '/ready'];
  environment: 'local';
  runtimeServicesImplemented: false;
  secretsRequired: false;
  productionDeploymentAllowed: false;
  paidApisAllowed: false;
}

export const releaseTenControllerApiContract: ControllerApiContract = {
  release: '10',
  app: 'controller-api',
  endpoints: ['/health', '/ready'],
  environment: 'local',
  runtimeServicesImplemented: false,
  secretsRequired: false,
  productionDeploymentAllowed: false,
  paidApisAllowed: false,
};
