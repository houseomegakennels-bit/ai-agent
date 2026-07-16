from fastapi import FastAPI

from controller_api.health import HealthResponse, build_health_response

app = FastAPI(
    title='Blackspire Helix Command Core Controller API',
    version='0.0.0-release-10',
    description='Local-only controller API prototype for Release 10.',
)


@app.get('/health', response_model=HealthResponse)
def health() -> HealthResponse:
    return build_health_response('ok')


@app.get('/ready', response_model=HealthResponse)
def ready() -> HealthResponse:
    return build_health_response('ok')
