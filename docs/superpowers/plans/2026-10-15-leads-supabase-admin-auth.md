# Leads in Supabase and Admin Authentication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Store leads in Supabase so they persist on Vercel, and replace the hard-coded, client-side admin "login" with real server-checked authentication on every admin API route.

**Architecture:** `lib/adminToken.ts` (pure Web Crypto, usable in middleware, routes and plain `node`) signs and verifies a session token. `lib/adminAuth.ts` adds `requireAdmin(request)` for route handlers. `lib/leadRows.ts` maps `Lead` to and from database rows. `lib/supabase.ts` returns a server-only client, or `null` when env vars are missing, in which case `lib/db.ts` keeps its current file/in-memory behaviour.

**Tech Stack:** Next.js 16 App Router, TypeScript, `@supabase/supabase-js`, Web Crypto. No test runner: checks are plain `node` scripts (Node 24 runs `.ts` imports from `.mjs`).

**Spec:** `docs/superpowers/specs/2026-10-15-leads-supabase-admin-auth-design.md`
**Branch:** `feat/leads-supabase` (already created from `main`).

**Notes before starting**
- `AGENTS.md` warns this Next.js has breaking changes. This plan uses standard route handlers, `NextResponse` cookies and `middleware.ts` (already in the repo, shown deprecated in favour of "proxy" but working). If a build error mentions a Next API, read `node_modules/next/dist/docs/` first.
- Never write real secrets into any file that git tracks. `.env*` is already gitignored.
- Do NOT repeat or log the old admin password. It is being removed.
- Server-run verification (dev server, `curl`) may be blocked by the permission system; if so, report which steps could not run and give the owner the exact commands.
- Use quoted text, not line numbers, to find edits.

---

### Task 1: Session token module

**Files:**
- Create: `lib/adminToken.ts`
- Create: `scripts/check-admin-auth.mjs`

- [ ] **Step 1: Write the failing check**

Create `scripts/check-admin-auth.mjs`:

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-admin-auth.mjs`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/adminToken.ts`.

- [ ] **Step 3: Write the module**

Create `lib/adminToken.ts`:

```ts
// Pure Web Crypto, no imports: runs in middleware, route handlers and plain node.
export const SESSION_COOKIE = "pm_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // seconds

const encoder = new TextEncoder();

const toB64Url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toB64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

function sameString(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(secret = process.env.ADMIN_SESSION_SECRET, now = Date.now()) {
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const exp = String(now + SESSION_MAX_AGE * 1000);
  return `${exp}.${await sign(exp, secret)}`;
}

export async function verifySessionToken(token?: string, secret = process.env.ADMIN_SESSION_SECRET, now = Date.now()) {
  if (!token || !secret) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !(Number(exp) > now)) return false;
  return sameString(sig, await sign(exp, secret));
}

// Compare SHA-256 digests so the comparison does not leak the password length.
export async function checkPassword(input: string, expected = process.env.ADMIN_PASSWORD) {
  if (!expected) return false;
  const digest = async (s: string) => toB64Url(await crypto.subtle.digest("SHA-256", encoder.encode(s)));
  return sameString(await digest(input), await digest(expected));
}
```

- [ ] **Step 4: Run the check to verify it passes**

Run: `node scripts/check-admin-auth.mjs`
Expected: `admin auth ok` (a harmless `MODULE_TYPELESS_PACKAGE_JSON` warning may print).

- [ ] **Step 5: Commit**

```bash
git add lib/adminToken.ts scripts/check-admin-auth.mjs
git commit -m "feat: add signed admin session token module" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Login, logout, middleware, admin UI

**Files:**
- Create: `lib/adminAuth.ts`, `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`
- Modify: `middleware.ts`, `app/admin/login/page.tsx`, `app/admin/components/AdminHeader.tsx`

- [ ] **Step 1: `lib/adminAuth.ts`**

```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminToken";

// Returns a 401 response when the caller is not a logged-in admin, otherwise null.
export async function requireAdmin(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const token = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  if (await verifySessionToken(token)) return null;
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}
```

- [ ] **Step 2: Login route** `app/api/admin/login/route.ts`

```ts
import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/adminToken";

// ponytail: no rate limit on login attempts; add one (for example Vercel WAF or Upstash) if the admin URL gets probed.
export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ success: false, message: "Admin login is not configured." }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";
  if (!(await checkPassword(password))) {
    return NextResponse.json({ success: false, message: "Invalid admin password. Please try again." }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
```

- [ ] **Step 3: Logout route** `app/api/admin/logout/route.ts`

```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/adminToken";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
```

- [ ] **Step 4: Middleware** (replace the whole `middleware.ts`)

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !authed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Already logged in: skip the login page
  if (pathname === "/admin/login" && authed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 5: Login page**

In `app/admin/login/page.tsx` replace the whole `handleLogin` function (the one that compares `password` to a string literal and sets `document.cookie`) with:

```tsx
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid admin password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };
```

No password literal may remain in this file.

- [ ] **Step 6: Logout in the header**

In `app/admin/components/AdminHeader.tsx` replace the whole `handleLogout` with:

```tsx
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && node scripts/check-admin-auth.mjs`
Expected: no tsc errors; `admin auth ok`.
Run: `grep -rn "pm_admin_auth" app lib middleware.ts`
Expected: no output.

- [ ] **Step 8: Commit**

```bash
git add lib/adminAuth.ts app/api/admin middleware.ts app/admin
git commit -m "feat: real admin login with signed httpOnly session cookie" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Protect the admin API routes

**Files:** `app/api/enquiries/route.ts`, `app/api/enquiries/[id]/route.ts`, `app/api/webhook/dump-leads/route.ts`, `app/api/settings/route.ts`, `app/api/locations/route.ts`, `app/api/locations/[id]/route.ts`

Add `import { requireAdmin } from "@/lib/adminAuth";` to each file, and as the FIRST two lines inside the handler (before its `try`):

```ts
  const denied = await requireAdmin(request);
  if (denied) return denied;
```

- [ ] **Step 1: Apply to exactly these handlers**

- `app/api/enquiries/route.ts`: `GET` only. Change `export async function GET()` to `export async function GET(request: Request)`. Leave `POST` public (it is the enquiry form).
- `app/api/enquiries/[id]/route.ts`: `PUT` (already has `request`).
- `app/api/webhook/dump-leads/route.ts`: change `export async function POST()` to `export async function POST(request: Request)`.
- `app/api/settings/route.ts`: `PUT` only. Leave `GET` public.
- `app/api/locations/route.ts`: `POST` only. Leave `GET` public.
- `app/api/locations/[id]/route.ts`: `PUT` and `DELETE`. Leave `GET` public.

- [ ] **Step 2: Verify the set of protected handlers**

Run: `grep -rn "requireAdmin(request)" app/api | cut -d: -f1 | sort | uniq -c`
Expected: `enquiries/route.ts` 1, `enquiries/[id]/route.ts` 1, `dump-leads/route.ts` 1, `settings/route.ts` 1, `locations/route.ts` 1, `locations/[id]/route.ts` 2 (seven handlers in total).
Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/api
git commit -m "fix(security): require admin session on lead, settings and location write APIs" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Lead row mapping

**Files:**
- Create: `lib/leadRows.ts`
- Create: `scripts/check-lead-rows.mjs`

- [ ] **Step 1: Write the failing check**

Create `scripts/check-lead-rows.mjs`:

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-lead-rows.mjs`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/leadRows.ts`.

- [ ] **Step 3: Write the module**

Create `lib/leadRows.ts`:

```ts
import type { Lead } from "@/types";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  city: string | null;
  preferred_location: string | null;
  investment_budget: string | null;
  owns_property: boolean;
  preferred_store_type: string | null;
  timeline: string | null;
  message: string | null;
  status: string;
  notes: string[];
  assigned_to: string | null;
  source: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

// Tolerates sparse leads (older records may lack fields).
export const toRow = (l: Partial<Lead> & Pick<Lead, "id" | "name" | "phone" | "status" | "createdAt">): LeadRow => ({
  id: l.id,
  name: l.name,
  phone: l.phone,
  whatsapp: l.whatsapp ?? null,
  email: l.email ?? null,
  city: l.city ?? "Not Specified",
  preferred_location: l.preferredLocation ?? "Flexible",
  investment_budget: l.investmentBudget ?? null,
  owns_property: l.ownsProperty === true || l.ownsProperty === "yes",
  preferred_store_type: l.preferredStoreType ?? null,
  timeline: l.timeline ?? null,
  message: l.message ?? "",
  status: l.status,
  notes: l.notes ?? [],
  assigned_to: l.assignedTo ?? "Unassigned",
  source: (l.source ?? {}) as Record<string, unknown>,
  created_at: l.createdAt,
  updated_at: l.updatedAt ?? l.createdAt,
});

export const fromRow = (r: LeadRow): Lead => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  whatsapp: r.whatsapp ?? undefined,
  email: r.email ?? "",
  city: r.city ?? "Not Specified",
  preferredLocation: r.preferred_location ?? "Flexible",
  investmentBudget: r.investment_budget as Lead["investmentBudget"],
  ownsProperty: r.owns_property,
  preferredStoreType: r.preferred_store_type as Lead["preferredStoreType"],
  timeline: r.timeline ?? "",
  message: r.message ?? "",
  status: r.status as Lead["status"],
  notes: r.notes ?? [],
  assignedTo: r.assigned_to ?? undefined,
  source: r.source as Lead["source"],
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});
```

- [ ] **Step 4: Run the check**

Run: `node scripts/check-lead-rows.mjs`
Expected: `lead rows ok`. If the round-trip assertion fails on a field's `undefined` versus `null` handling, adjust `fromRow`/`toRow` until the check passes without weakening the check.

- [ ] **Step 5: Type-check and commit**

Run: `npx tsc --noEmit` (expected: no errors).

```bash
git add lib/leadRows.ts scripts/check-lead-rows.mjs
git commit -m "feat: add lead to database row mapping" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Supabase data layer, import script, env docs

**Files:**
- Modify: `package.json`, `package-lock.json` (dependencies)
- Create: `lib/supabase.ts`, `scripts/import-leads.mjs`, `.env.example`
- Modify: `lib/db.ts`, `.gitignore`

- [ ] **Step 1: Dependencies**

Run: `npm install @supabase/supabase-js && npm uninstall mongoose`
Expected: both succeed; `package.json` lists `@supabase/supabase-js` and no `mongoose`.

- [ ] **Step 2: `lib/supabase.ts`**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

// Server-only (uses the service-role key). Returns null when not configured: lib/db.ts then falls back to files.
export function getSupabase(): SupabaseClient | null {
  if (client === undefined) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
    if (!client && process.env.VERCEL) {
      console.warn("[db] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set: leads are NOT persisted on Vercel.");
    }
  }
  return client;
}
```

- [ ] **Step 3: Replace the leads section of `lib/db.ts`**

Add imports at the top: `import { getSupabase } from "./supabase";` and `import { fromRow, toRow, type LeadRow } from "./leadRows";`.

Replace everything from the `// --- LEADS DB ---` comment up to (not including) `// --- FAQS & TESTIMONIALS DB ---` with:

```ts
// --- LEADS DB ---
// Uses Supabase when configured; otherwise the local file / in-memory fallback (dev only; not persistent on Vercel).
const LEADS_TABLE = "leads";

function mergeLead(lead: Partial<Lead>, existing: Lead | null): Lead {
  return {
    id: lead.id || existing?.id || `PM-${Date.now().toString().slice(-6)}`,
    name: lead.name || existing?.name || "Anonymous",
    phone: lead.phone || existing?.phone || "",
    whatsapp: lead.whatsapp || lead.phone || existing?.whatsapp || "",
    email: lead.email !== undefined ? lead.email : (existing?.email || ""),
    city: lead.city || existing?.city || "Not Specified",
    preferredLocation: lead.preferredLocation || existing?.preferredLocation || "Flexible",
    investmentBudget: lead.investmentBudget || existing?.investmentBudget || DEFAULT_BUDGET,
    ownsProperty: lead.ownsProperty ?? existing?.ownsProperty ?? false,
    preferredStoreType: lead.preferredStoreType || existing?.preferredStoreType || "Takeaway",
    timeline: lead.timeline || existing?.timeline || "Immediate",
    message: lead.message !== undefined ? lead.message : (existing?.message || ""),
    status: lead.status || existing?.status || "new",
    notes: lead.notes || existing?.notes || [],
    assignedTo: lead.assignedTo || existing?.assignedTo || "Unassigned",
    source: lead.source || existing?.source || {},
    createdAt: lead.createdAt || existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function fetchLeadById(id: string): Promise<Lead | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from(LEADS_TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as LeadRow) : null;
}

async function upsertLead(lead: Lead) {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from(LEADS_TABLE).upsert(toRow(lead));
  if (error) throw error;
}

export async function getLeads(): Promise<Lead[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from(LEADS_TABLE).select("*").order("created_at", { ascending: false }).limit(5000);
    if (error) throw error;
    return (data as LeadRow[]).map(fromRow);
  }
  if (!inMemoryLeads) {
    inMemoryLeads = await readJsonFile<Lead[]>(LEADS_FILE, initialLeads);
  }
  return inMemoryLeads;
}

export async function saveLead(lead: Partial<Lead>): Promise<Lead> {
  if (getSupabase()) {
    const existing = lead.id ? await fetchLeadById(lead.id) : null;
    const merged = mergeLead(lead, existing);
    await upsertLead(merged);
    return merged;
  }

  const leads = await getLeads();
  const existingIndex = lead.id ? leads.findIndex((l) => l.id === lead.id) : -1;
  const existing = existingIndex >= 0 ? leads[existingIndex] : null;
  const newLead = mergeLead(lead, existing);

  if (existingIndex >= 0) {
    leads[existingIndex] = newLead;
  } else {
    leads.unshift(newLead);
  }

  inMemoryLeads = [...leads];
  await writeJsonFile(LEADS_FILE, inMemoryLeads);
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"], note?: string): Promise<Lead | null> {
  const apply = (target: Lead): Lead => {
    target.status = status;
    target.updatedAt = new Date().toISOString();
    if (note) {
      target.notes = [...(target.notes || []), `[${new Date().toLocaleDateString()}] ${note}`];
    }
    return target;
  };

  if (getSupabase()) {
    const existing = await fetchLeadById(id);
    if (!existing) return null;
    const updated = apply(existing);
    await upsertLead(updated);
    return updated;
  }

  const leads = await getLeads();
  const leadIndex = leads.findIndex((l) => l.id === id);
  if (leadIndex === -1) return null;

  const target = apply(leads[leadIndex]);
  leads[leadIndex] = target;
  inMemoryLeads = [...leads];
  await writeJsonFile(LEADS_FILE, inMemoryLeads);
  return target;
}

```

(Pre-existing behaviour kept as is: `PUT /api/enquiries/[id]` sets `assignedTo` on the returned object after saving, so `assignedTo` is not persisted. This is out of scope.)

- [ ] **Step 4: Import script** `scripts/import-leads.mjs`

```js
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { toRow } from "../lib/leadRows.ts";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, e.g. node --env-file=.env.local scripts/import-leads.mjs");
  process.exit(1);
}

const leads = JSON.parse(readFileSync(new URL("../data/enquiries.json", import.meta.url), "utf-8"));
const sb = createClient(url, key, { auth: { persistSession: false } });
const { error } = await sb.from("leads").upsert(leads.map(toRow));
if (error) {
  console.error(error);
  process.exit(1);
}
console.log(`imported ${leads.length} leads`);
```

- [ ] **Step 5: `.env.example` and gitignore**

Create `.env.example`:

```
# Copy to .env.local (never commit real values) and also set these in Vercel (Production and Preview).
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
# 32+ random characters, for example: openssl rand -base64 32
ADMIN_SESSION_SECRET=
# Optional
# NEXT_PUBLIC_SITE_URL=https://pizzamood.in
# N8N_WEBHOOK_URL=
```

In `.gitignore`, directly below the `.env*` line add: `!.env.example`

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && node scripts/check-lead-rows.mjs && node scripts/check-admin-auth.mjs`
Expected: no tsc errors; `lead rows ok`; `admin auth ok`.
Run: `git check-ignore .env.example; echo "exit=$?"`
Expected: `exit=1` (not ignored).
Run: `git check-ignore .env.local; echo "exit=$?"`
Expected: `.env.local` then `exit=0` (ignored).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json lib/supabase.ts lib/db.ts scripts/import-leads.mjs .env.example .gitignore
git commit -m "feat: store leads in Supabase with file fallback; add lead import script" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Verify

- [ ] **Step 1: Static checks**

Run: `node scripts/check-admin-auth.mjs && node scripts/check-lead-rows.mjs && node scripts/check-pricing.mjs && node scripts/check-usps.mjs && npx tsc --noEmit && npm run build`
Expected: `admin auth ok`, `lead rows ok`, `pricing ok`, `usps ok`, build succeeds.

- [ ] **Step 2: No secrets or old auth left**

Run:

```bash
grep -rn "pm_admin_auth" app lib middleware.ts
git diff main --name-only | xargs grep -n "SUPABASE_SERVICE_ROLE_KEY=.\+\|ADMIN_PASSWORD=.\+" 2>/dev/null
```

Expected: both print nothing. Also confirm by reading `app/admin/login/page.tsx` that it contains no password literal.

- [ ] **Step 3: Auth behaviour (needs `.env.local`; may need the owner to run)**

Owner creates `.env.local` with the four variables, then runs `npm run dev` (port printed) and:

```bash
B=http://localhost:3000   # use the port printed by npm run dev
# 1. every protected route rejects an anonymous caller
curl -s -o /dev/null -w "%{http_code}\n" $B/api/enquiries                       # 401
curl -s -o /dev/null -w "%{http_code}\n" -X PUT  $B/api/settings -H 'content-type: application/json' -d '{}'   # 401
curl -s -o /dev/null -w "%{http_code}\n" -X POST $B/api/webhook/dump-leads      # 401
curl -s -o /dev/null -w "%{http_code}\n" -X DELETE $B/api/locations/x           # 401
# 2. public routes stay open
curl -s -o /dev/null -w "%{http_code}\n" $B/api/locations                       # 200
curl -s -o /dev/null -w "%{http_code}\n" $B/api/settings                        # 200
# 3. forged old cookie does not open /admin
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" -H 'cookie: pm_admin_auth=true' $B/admin   # 307 .../admin/login
# 4. wrong password rejected, right password works
curl -s -o /dev/null -w "%{http_code}\n" -X POST $B/api/admin/login -H 'content-type: application/json' -d '{"password":"nope"}'   # 401
curl -s -c /tmp/pm.jar -o /dev/null -w "%{http_code}\n" -X POST $B/api/admin/login -H 'content-type: application/json' -d "{\"password\":\"$ADMIN_PASSWORD\"}"   # 200
curl -s -b /tmp/pm.jar -o /dev/null -w "%{http_code}\n" $B/api/enquiries        # 200
```

- [ ] **Step 4: Database behaviour**

With Supabase variables set: submit a test enquiry through the site form; confirm the row appears in the Supabase `leads` table and on `/admin/leads`; change its status in the admin and confirm the table updates; then delete the test row in Supabase.

- [ ] **Step 5: Report to owner**

Tell the owner: which checks ran and which did not; that the old admin password must be treated as compromised and replaced; the four Vercel variables; to run `node --env-file=.env.local scripts/import-leads.mjs` once to import the existing leads; and that settings and locations edits still do not persist on Vercel (separate work).
