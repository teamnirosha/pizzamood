// @ts-nocheck  (imports ../lib/pricing.ts with extension so plain `node` can run it; excluded from Next type-check)
import assert from "node:assert/strict";
import { MODELS, MODEL_BY_ID, BUDGET_OPTIONS, PRICING_HEADLINE } from "../lib/pricing.ts";

assert.equal(MODEL_BY_ID.kiosk.total, 700000);
assert.equal(MODEL_BY_ID.cafe.total, 1200000);
for (const m of MODELS) {
  assert.equal(m.items.reduce((s, i) => s + i.amount, 0), m.total, `${m.id} items must sum to total`);
}
assert.equal(PRICING_HEADLINE, "Kiosk ₹7 Lakh · Cafe ₹12 Lakh");
assert.equal(BUDGET_OPTIONS[0], `Kiosk – ${MODEL_BY_ID.kiosk.lakh}`);
assert.equal(BUDGET_OPTIONS[1], `Cafe – ${MODEL_BY_ID.cafe.lakh}`);
console.log("pricing ok");
