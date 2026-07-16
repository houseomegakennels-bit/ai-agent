export type LocalControllerStatus = 'ok' | 'not_ready' | 'offline' | 'error';

export interface LocalControllerHealthResponse {
  schema_version: '1.0';
  service: 'controller-api';
  status: LocalControllerStatus;
  environment: 'local';
  version: string;
  runtime_services: false;
  secrets_loaded: false;
}

export interface LocalControllerStatusView {
  health: LocalControllerHealthResponse;
  ready: LocalControllerHealthResponse;
  connectionLabel: 'Local mock adapter' | 'Offline fallback' | 'Error fallback';
  operatorMessage: string;
}

export const mockHealthResponse: LocalControllerHealthResponse = {
  schema_version: '1.0',
  service: 'controller-api',
  status: 'ok',
  environment: 'local',
  version: '0.0.0-release-11',
  runtime_services: false,
  secrets_loaded: false,
};

export const mockReadyResponse: LocalControllerHealthResponse = {
  ...mockHealthResponse,
  status: 'ok',
};

export function buildOfflineControllerStatus(): LocalControllerStatusView {
  const offline: LocalControllerHealthResponse = {
    ...mockHealthResponse,
    status: 'offline',
  };

  return {
    health: offline,
    ready: offline,
    connectionLabel: 'Offline fallback',
    operatorMessage: 'Controller API is offline or unavailable. Local UI remains safe and read-only.',
  };
}

export function buildErrorControllerStatus(): LocalControllerStatusView {
  const error: LocalControllerHealthResponse = {
    ...mockHealthResponse,
    status: 'error',
  };

  return {
    health: error,
    ready: error,
    connectionLabel: 'Error fallback',
    operatorMessage: 'Controller API status could not be read. No live action was attempted.',
  };
}

export function buildMockControllerStatus(): LocalControllerStatusView {
  return {
    health: mockHealthResponse,
    ready: mockReadyResponse,
    connectionLabel: 'Local mock adapter',
    operatorMessage: 'Local controller API shape is connected with mock data only.',
  };
}
