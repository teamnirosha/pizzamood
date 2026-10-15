import assert from "node:assert/strict";
import { toRow, fromRow } from "../lib/leadRows.ts";

const lead = {
  id: "PM-1", name: "A", phone: "9999999999", whatsapp: "9999999999", email: "a@b.c", city: "Pune",
  preferredLocation: "Baner", investmentBudget: "Kiosk – ₹7 Lakh", ownsProperty: true, preferredStoreType: "Kiosk",
  timeline: "Within 30 days", message: "hi", status: "new", notes: ["n1"], assignedTo: "Unassigned",
  source: { utm_source: "x" }, createdAt: "2026-10-15T00:00:00.000Z", updatedAt: "2026-10-15T01:00:00.000Z",
};
assert.deepEqual(fromRow(toRow(lead)), lead, "round trip");
assert.equal(toRow({ ...lead, ownsProperty: "yes" }).owns_property, true);
assert.equal(toRow({ ...lead, ownsProperty: "no" }).owns_property, false);

const sparse = toRow({ id: "PM-2", name: "B", phone: "1", status: "new", createdAt: "2026-10-15T00:00:00.000Z" });
assert.equal(sparse.city, "Not Specified");
assert.deepEqual(sparse.notes, []);
assert.deepEqual(sparse.source, {});
console.log("lead rows ok");
