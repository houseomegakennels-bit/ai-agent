const assert = require('node:assert/strict');
const fs = require('node:fs');

const PRICE_LIST_VERSION = 'synthetic-v1-2026-09-17';

const catalogue = [
  { code: 'CBL-100', description: 'Copper cable 100m roll', unit: 'ROLL', price: 142.5 },
  { code: 'MCB-20A', description: 'Miniature circuit breaker 20A', unit: 'EA', price: 18.75 },
  { code: 'JBOX-4', description: 'Junction box 4 way', unit: 'EA', price: 6.4 },
];

const rfqRows = [
  { line: 1, code: 'CBL-100', description: 'Copper cable 100m roll', quantity: 2, unit: 'roll' },
  { line: 2, code: 'mcb-20a', description: 'MCB 20 amp', quantity: 5, unit: 'EA' },
  { line: 3, code: '', description: 'Junction box four way', quantity: 3, unit: 'EA' },
  { line: 4, code: 'UNKNOWN-9', description: 'Unknown component', quantity: 1, unit: 'EA' },
  { line: 5, code: 'CBL-100', description: 'Copper cable 100m roll', quantity: 0, unit: 'ROLL' },
  { line: 6, code: 'MCB-20A', description: 'MCB 20 amp', quantity: 5, unit: 'EA' },
  { line: 7, code: 'MCB-20A', description: 'MCB 20 amp', quantity: 7, unit: 'EA' },
  { line: 8, code: 'JBOX-4', description: 'Junction box 4 way', quantity: 2, unit: '' },
];

function normalize(value) {
  return String(value ?? '').trim().toUpperCase().replace(/[^A-Z0-9]+/g, ' ');
}

function tokenSimilarity(a, b) {
  const left = new Set(normalize(a).split(' ').filter(Boolean));
  const right = new Set(normalize(b).split(' ').filter(Boolean));
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / new Set([...left, ...right]).size;
}

function processRfq(rows, approvedCatalogue) {
  const exact = new Map(approvedCatalogue.map((item) => [normalize(item.code).replace(/ /g, '-'), item]));
  const seen = new Map();
  const quoteRows = [];
  const reviewRows = [];

  for (const row of rows) {
    const code = normalize(row.code).replace(/ /g, '-');
    const unit = normalize(row.unit).replace(/ /g, '');
    const quantity = Number(row.quantity);
    const fingerprint = `${code}|${normalize(row.description)}|${unit}`;

    if (!Number.isFinite(quantity) || quantity <= 0) {
      reviewRows.push({ ...row, status: 'REVIEW', reason: 'INVALID_QUANTITY' });
      continue;
    }
    if (!unit) {
      reviewRows.push({ ...row, status: 'REVIEW', reason: 'MISSING_UNIT' });
      continue;
    }
    if (seen.has(fingerprint)) {
      const prior = seen.get(fingerprint);
      reviewRows.push({ ...row, status: 'REVIEW', reason: prior === quantity ? 'EXACT_DUPLICATE' : 'CONFLICTING_DUPLICATE' });
      continue;
    }
    seen.set(fingerprint, quantity);

    const product = exact.get(code);
    if (product) {
      if (normalize(product.unit).replace(/ /g, '') !== unit) {
        reviewRows.push({ ...row, status: 'REVIEW', reason: 'UNIT_MISMATCH', candidateCode: product.code });
        continue;
      }
      quoteRows.push({
        line: row.line,
        requestedCode: row.code,
        matchedCode: product.code,
        description: product.description,
        quantity,
        unit: product.unit,
        unitPrice: product.price,
        lineTotal: Number((quantity * product.price).toFixed(2)),
        matchMethod: 'EXACT_CODE',
        priceListVersion: PRICE_LIST_VERSION,
        status: 'READY',
      });
      continue;
    }

    const candidates = approvedCatalogue
      .map((item) => ({ item, score: tokenSimilarity(row.description, item.description) }))
      .sort((a, b) => b.score - a.score);
    const best = candidates[0];
    if (best && best.score >= 0.5) {
      reviewRows.push({ ...row, status: 'REVIEW', reason: 'DESCRIPTION_CANDIDATE_REQUIRES_APPROVAL', candidateCode: best.item.code, confidence: Number(best.score.toFixed(2)) });
    } else {
      reviewRows.push({ ...row, status: 'REVIEW', reason: 'NO_APPROVED_MATCH' });
    }
  }

  return {
    metadata: { demonstration: true, customerData: false, priceListVersion: PRICE_LIST_VERSION },
    quoteRows,
    reviewRows,
    summary: {
      inputRows: rows.length,
      readyRows: quoteRows.length,
      reviewRows: reviewRows.length,
      quoteTotal: Number(quoteRows.reduce((sum, row) => sum + row.lineTotal, 0).toFixed(2)),
    },
  };
}

const result = processRfq(rfqRows, catalogue);

const tests = [
  ['all input rows are accounted for', () => assert.equal(result.summary.readyRows + result.summary.reviewRows, rfqRows.length)],
  ['exact approved codes are priced', () => assert.equal(result.quoteRows.length, 2)],
  ['prices come from the approved list', () => assert.deepEqual(result.quoteRows.map((r) => r.unitPrice), [142.5, 18.75])],
  ['quote arithmetic is correct', () => assert.equal(result.summary.quoteTotal, 378.75)],
  ['description-only match requires approval', () => assert.ok(result.reviewRows.some((r) => r.reason === 'DESCRIPTION_CANDIDATE_REQUIRES_APPROVAL'))],
  ['unknown code is held for review', () => assert.ok(result.reviewRows.some((r) => r.reason === 'NO_APPROVED_MATCH'))],
  ['invalid quantity is rejected', () => assert.ok(result.reviewRows.some((r) => r.reason === 'INVALID_QUANTITY'))],
  ['exact duplicate is detected', () => assert.ok(result.reviewRows.some((r) => r.reason === 'EXACT_DUPLICATE'))],
  ['conflicting duplicate is detected', () => assert.ok(result.reviewRows.some((r) => r.reason === 'CONFLICTING_DUPLICATE'))],
  ['missing unit is held for review', () => assert.ok(result.reviewRows.some((r) => r.reason === 'MISSING_UNIT'))],
  ['every priced row records price-list version', () => assert.ok(result.quoteRows.every((r) => r.priceListVersion === PRICE_LIST_VERSION))],
  ['demonstration is explicitly labeled', () => assert.equal(result.metadata.demonstration, true)],
];

let passed = 0;
for (const [name, test] of tests) {
  try {
    test();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

fs.writeFileSync('sample_expected_output.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(`\n${passed}/${tests.length} acceptance tests passed.`);

if (passed !== tests.length) process.exitCode = 1;

module.exports = { processRfq, catalogue, rfqRows };
