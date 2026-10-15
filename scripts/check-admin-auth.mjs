import assert from "node:assert/strict";
import { createSessionToken, verifySessionToken, checkPassword, SESSION_MAX_AGE } from "../lib/adminToken.ts";

const secret = "test-secret-test-secret-test-secret-1";
const now = 1_000_000;
const t = await createSessionToken(secret, now);

assert.equal(await verifySessionToken(t, secret, now + 1), true);
assert.equal(await verifySessionToken(t, secret, now + SESSION_MAX_AGE * 1000 + 1), false, "expired");
assert.equal(await verifySessionToken(t, "other-secret-other-secret-other-1", now + 1), false, "wrong secret");
const [exp, sig] = t.split(".");
assert.equal(await verifySessionToken(`${Number(exp) + 999999999}.${sig}`, secret, now + 1), false, "tampered expiry");
assert.equal(await verifySessionToken("garbage", secret, 1), false);
assert.equal(await verifySessionToken(undefined, secret, 1), false);
assert.equal(await verifySessionToken(t, undefined, now + 1), false, "no secret");

assert.equal(await checkPassword("right", "right"), true);
assert.equal(await checkPassword("wrong", "right"), false);
assert.equal(await checkPassword("x", undefined), false);
assert.equal(await checkPassword("", ""), false, "empty expected password must never match");
console.log("admin auth ok");
