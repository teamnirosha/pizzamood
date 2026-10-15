# Leads in Supabase, and admin authentication

## Goal

1. Store franchise leads in a real database (Supabase Postgres) so they persist on Vercel, whose filesystem is read-only.
2. Fix admin security: no API route currently checks who is calling, and the admin password is hard-coded in client-side code.

## Current problems

- `lib/db.ts` writes leads to `data/enquiries.json`. On Vercel the write fails and leads live only in one serverless instance's memory, then vanish. The n8n webhook is the only durable record.
- The admin password is a string literal in `app/admin/login/page.tsx`, so every visitor's browser receives it, and it is in git history. It must be treated as compromised.
- Admin "login" sets a cookie `pm_admin_auth=true` from client JavaScript. Anyone can set it by hand. `middleware.ts` trusts it.
- Audit of all API routes: none has an auth check.
  - Exposed data: `GET /api/enquiries` returns every lead (names, phones, emails).
  - Exposed writes: `PUT /api/enquiries/[id]`, `POST /api/webhook/dump-leads` (sends all leads to n8n), `PUT /api/settings`, `POST /api/locations`, `PUT /api/locations/[id]`, `DELETE /api/locations/[id]`.
  - Public by design: `POST /api/enquiries` (the enquiry form), `GET /api/locations`, `GET /api/locations/[id]`, `GET /api/settings`.
- `mongoose` is a dependency but is never used.

## Non-goals

- Settings, locations, FAQs and testimonials stay on the current file and in-memory storage. Only leads move to the database. (Admin edits to settings and locations still do not persist on Vercel. That is a separate piece of work.)
- No user accounts or roles: one admin password.
- No rate limiting or CAPTCHA on the public enquiry form.

## Design

### 1. Database

Supabase table `public.leads` with row-level security enabled and no policies, so only the server's service-role key can read or write:

```sql
create table public.leads (
  id text primary key,
  name text not null,
  phone text not null,
  whatsapp text,
  email text,
  city text,
  preferred_location text,
  investment_budget text,
  owns_property boolean default false,
  preferred_store_type text,
  timeline text,
  message text,
  status text not null default 'new',
  notes jsonb not null default '[]',
  assigned_to text default 'Unassigned',
  source jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_created_at_idx on public.leads (created_at desc);
alter table public.leads enable row level security;
```

The owner runs this in the Supabase SQL editor (already provided).

### 2. Data layer (`lib/db.ts`, new `lib/supabase.ts`)

- `lib/supabase.ts` creates a server-only client from `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (package `@supabase/supabase-js`). It is never imported by client components.
- `getLeads`, `saveLead`, `updateLeadStatus` keep their signatures. When both variables are set they use Supabase; otherwise they use the current file/in-memory behaviour so `npm run dev` works without a database.
- Row mapping between the app's camelCase `Lead` and the snake_case columns lives in one pair of functions (`toRow`, `fromRow`). `ownsProperty` is normalised to a boolean (the `"yes"|"no"` union is converted).
- `saveLead` keeps its existing merge semantics: when an `id` exists it merges into the existing row (the multi-step modal saves a lead early and updates it).
- A database error surfaces as a thrown error so the API route returns a failure instead of silently losing the lead. The n8n forward is unchanged and still fires after a successful save.
- Remove the unused `mongoose` dependency.

### 3. Existing leads

`scripts/import-leads.mjs` reads `data/enquiries.json` and upserts every lead into Supabase by `id`, so running it twice is safe. The owner runs it once with the environment variables set.

### 4. Admin authentication

New env vars: `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (a random string of 32 or more characters, for example from `openssl rand -base64 32`). Both are set in Vercel and in `.env.local`. If either is missing, admin login is disabled (fail closed). There is no default password.

- `lib/adminAuth.ts` uses only the Web Crypto API, so it works in both middleware and route handlers. It exports `createSessionToken()` (payload is an expiry timestamp, signed with HMAC-SHA256 using the secret), `verifySessionToken(token)`, `checkPassword(input)` (constant-time comparison against `ADMIN_PASSWORD`) and `requireAdmin(request)` (returns a 401 response or `null`).
- `POST /api/admin/login` takes `{ password }`, checks it, and sets cookie `pm_admin_session` with `HttpOnly`, `Secure` (in production), `SameSite=Lax`, `Path=/`, `Max-Age` of 24 hours. It returns 401 on a wrong password.
- `POST /api/admin/logout` clears the cookie.
- `app/admin/login/page.tsx` posts to `/api/admin/login` and no longer contains any password. `AdminHeader.tsx` logout calls `/api/admin/logout`.
- `middleware.ts` verifies the signed token for `/admin` pages (and redirects to `/admin/login` when it is missing or invalid), instead of trusting `pm_admin_auth=true`. The old cookie is ignored.
- `requireAdmin` is added to: `GET /api/enquiries`, `PUT /api/enquiries/[id]`, `POST /api/webhook/dump-leads`, `PUT /api/settings`, `POST /api/locations`, `PUT /api/locations/[id]`, `DELETE /api/locations/[id]`. The public routes listed above stay open.
- The old password must be retired: the owner picks a new `ADMIN_PASSWORD` that is not a variant of the old one. The old value stays in git history and cannot be scrubbed without rewriting history, so it must not be reused anywhere.

## Error handling

- Missing Supabase variables: file/in-memory fallback, with a console warning on Vercel (`process.env.VERCEL` set) that the fallback does not persist.
- Supabase insert or update error: the enquiry route returns `{ success: false }` with HTTP 500 and logs the error; the user sees "Failed to submit enquiry. Please try again."
- Missing admin variables: `/api/admin/login` returns 503 "Admin login is not configured".
- Invalid or expired session: API routes return 401 JSON; pages redirect to the login page.

## Verification

- `scripts/check-admin-auth.mjs`: sign then verify a token; a tampered token fails; an expired token fails; a wrong secret fails; `checkPassword` accepts the right password and rejects others.
- `tsc` and `npm run build` pass.
- With a local dev server and `.env.local` set: `curl` each protected route without a cookie and expect 401; log in through the API and expect 200 with the protected routes then succeeding; submit a test lead and confirm the row in Supabase and in the admin Leads page; confirm the old `pm_admin_auth=true` cookie no longer opens `/admin`.
- After deploy: repeat the lead submission on the live site.
- Confirm by `grep` that no password literal remains in `app/` or `lib/`.

## Owner actions

1. Run the SQL (above) in Supabase.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in Vercel (Production and Preview) and in `.env.local`.
3. Run `node scripts/import-leads.mjs` once to import existing leads.
4. Choose a new admin password and stop using the old one anywhere else.
