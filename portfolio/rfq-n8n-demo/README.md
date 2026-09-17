# RFQ-to-Quote n8n Demonstration

This is a synthetic demonstration project prepared for technical evaluation. It is not a paid client deployment and contains no customer data.

## What it demonstrates

- Normalizes extracted RFQ line items into a strict schema.
- Uses only an approved catalogue and price list for prices.
- Matches exact product codes automatically.
- Suggests description-based candidates but sends them to human review.
- Rejects unknown codes, invalid quantities, missing units, and conflicting duplicates.
- Produces quote-ready rows plus a separate human-review queue.
- Records the approved price-list version on every priced line.

## Files

- `rfq_to_quote_demo.workflow.json` — importable n8n workflow export.
- `test_workflow.js` — standalone acceptance-test runner mirroring the workflow rules.
- `test_results.txt` — captured acceptance-test output.
- `sample_expected_output.json` — deterministic output from the synthetic test fixture.

## Run the tests

```bash
node test_workflow.js
```

The n8n workflow uses only built-in Manual Trigger and Code nodes. No credentials, external APIs, paid services, or community nodes are required.

## Scope boundary

The fixture begins with structured rows representing the output of text extraction. PDF extraction itself is intentionally separated because parser choice and field mapping must be validated against the buyer's actual redacted PDF samples.
