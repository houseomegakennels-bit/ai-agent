from controller_api.health import build_health_response


def test_health_response_is_local_and_safe():
    response = build_health_response()
    assert response['schema_version'] == '1.0'
    assert response['service'] == 'controller-api'
    assert response['status'] == 'ok'
    assert response['environment'] == 'local'
    assert response['runtime_services'] is False
    assert response['secrets_loaded'] is False
