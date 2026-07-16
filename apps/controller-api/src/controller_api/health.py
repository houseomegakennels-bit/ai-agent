from typing import Literal, TypedDict

HealthStatus = Literal['ok', 'not_ready']


class HealthResponse(TypedDict):
    schema_version: str
    service: str
    status: HealthStatus
    environment: Literal['local']
    version: str
    runtime_services: bool
    secrets_loaded: bool


def build_health_response(status: HealthStatus = 'ok') -> HealthResponse:
    return {
        'schema_version': '1.0',
        'service': 'controller-api',
        'status': status,
        'environment': 'local',
        'version': '0.0.0-release-10',
        'runtime_services': False,
        'secrets_loaded': False,
    }
