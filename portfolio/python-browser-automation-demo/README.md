# Original Python / Playwright application demonstration

This sample was newly created with AI assistance for Carlos Pearson / Blackspire's application. It is not previous paid-client work, a live GoHighLevel test, or a production-ready scraper.

## What actually ran
- A synthetic HTML portal fixture was loaded into a Chromium page with Playwright `page.set_content`.
- Playwright extracted rows using locators, including source ID, name and email.
- Python validated the rows and POSTed valid records to a local mock CRM HTTP endpoint.
- A second complete run updated the same two records rather than duplicating them.
- Both runs rejected the malformed email before a CRM write.
- 13 unit tests passed. Eight end-to-end assertions passed. These are different checks, not 21 separately discovered pytest tests.

The screenshot is a real browser capture of the local results page after those assertions. The JSON report contains the observed outcomes. No external system or real customer record was contacted or changed.

## Run it
Use Python 3.10+ in an isolated virtual environment:

    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    python -m playwright install chromium
    python -m pytest -q test_validation.py
    python portal_to_mock_crm.py --output evidence

On Windows, activate the environment using `.venv\Scripts\activate`.
The script uses an installed Chromium/Chrome executable when detected, or Playwright's downloaded Chromium otherwise. System browser dependencies may also be needed.

## Important limits
The browser does not navigate to a live customer portal; all its network requests are blocked. The fixture is loaded directly into the page. Python's local HTTP server is used only for the fixture and mock CRM. The mock API is illustrative and is not a claim about GoHighLevel's exact request schema or behavior.

The development environment initially blocked Chromium loopback navigation, so the test was adapted to a supplied HTML fixture. We did not disable browser policy. The final passing test covers DOM extraction, validation, local HTTP submission and repeat-run behavior, not portal navigation/authentication.

For a real project, portal access rights, login/MFA, pagination, selectors, field mapping, credentials, API permissions, live GoHighLevel behavior, duplicate rules, timeouts/retries and logging must be scoped and tested in the client's approved environment. Code and private data must not be moved to an unapproved local or AI service.

The source and generated artifacts contain only fictional `.test` email addresses. The demo evidence should be attached as a screenshot and source ZIP, not represented as a hosted/live client integration.
