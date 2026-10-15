import assert from "node:assert/strict";
import { USPS, EXCLUSIVITY_LINE, FRANCHISE_PHONE_TEL, FRANCHISE_PHONE_DISPLAY, whatsappLink } from "../lib/usps.ts";

assert.equal(USPS.length, 7);
assert.equal(new Set(USPS.map((u) => u.id)).size, 7);
assert.equal(FRANCHISE_PHONE_TEL, "+919096970369");
assert.equal(FRANCHISE_PHONE_DISPLAY, "+91 90969 70369");
assert.ok(whatsappLink().startsWith("https://wa.me/919096970369?text="));
assert.ok(whatsappLink("a b").endsWith("a%20b"));
assert.ok(EXCLUSIVITY_LINE.includes("ONE"));
console.log("usps ok");
