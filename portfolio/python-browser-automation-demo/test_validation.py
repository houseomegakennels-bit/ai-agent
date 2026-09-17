"""Unit tests for demo validation and network scope. Synthetic data only."""
import pytest
from portal_to_mock_crm import require_loopback, validate_record


def test_normalizes_email_and_whitespace():
    assert validate_record({"source_id": " 42 ", "name": " Demo ", "email": " EXAMPLE@EXAMPLE.TEST "}) == {"source_id":"42","name":"Demo","email":"example@example.test"}

@pytest.mark.parametrize("record", [
    {"source_id":"","name":"Demo","email":"demo@example.test"},
    {"source_id":"42","name":"","email":"demo@example.test"},
    {"source_id":"42","name":"Demo","email":"invalid"},
    {"source_id":"42","name":"Demo","email":"a b@example.test"},
])
def test_rejects_invalid_record(record):
    with pytest.raises(ValueError):
        validate_record(record)

@pytest.mark.parametrize("url", ["https://example.com", "http://localhost:9000", "http://127.0.0.1.evil.test", "http://user:pass@127.0.0.1:9000"])
def test_external_or_credentialed_url_rejected(url):
    with pytest.raises(ValueError):
        require_loopback(url)


def test_numeric_loopback_allowed():
    require_loopback("http://127.0.0.1:1234/mock-crm/upsert")

@pytest.mark.parametrize("record", [None, [], {"source_id":None,"name":"Demo","email":"demo@example.test"}])
def test_non_object_and_non_string_inputs_rejected(record):
    with pytest.raises(ValueError):
        validate_record(record)
