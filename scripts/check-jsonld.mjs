import assert from "node:assert/strict";
import { MODELS } from "../lib/pricing.ts";
import { USPS, FRANCHISE_PHONE_TEL } from "../lib/usps.ts";

const url = process.argv[2];
assert.ok(url, "usage: node scripts/check-jsonld.mjs <page url>");
const html = await (await fetch(url)).text();
const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));

const org = blocks.find((b) => b["@type"] === "Organization");
assert.ok(org, "Organization JSON-LD missing");
assert.equal(org.contactPoint.telephone, FRANCHISE_PHONE_TEL);
assert.deepEqual(org.makesOffer.map((o) => o.price), MODELS.map((m) => m.total));
const list = blocks.find((b) => b["@type"] === "ItemList");
assert.ok(list, "ItemList JSON-LD missing");
assert.equal(list.itemListElement.length, USPS.length);
console.log(`jsonld ok (${blocks.length} blocks) ${url}`);
