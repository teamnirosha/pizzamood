# Kiosk and Cafe Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show Kiosk ₹7,00,000 and Cafe ₹12,00,000 side by side everywhere, replacing every "₹4 Lakh" / "₹12 Lakh" / budget-range reference.

**Architecture:** One module, `lib/pricing.ts`, owns all prices, formatted strings, per-model breakdown items and form budget options. Every page, metadata string, FAQ and form imports from it. The unused `investmentBreakdown` site-settings list (the public Investment section never read it) is removed.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4. No test runner is installed; the pricing check is a plain `node` script (Node 24 runs `.ts` directly).

**Spec:** `docs/superpowers/specs/2026-10-15-pricing-kiosk-cafe-design.md`

**Notes before starting**
- `AGENTS.md` warns this Next.js has breaking changes. This plan only edits components, `metadata` string values and plain modules; it adds no new Next APIs. If a build error mentions a Next API, read `node_modules/next/dist/docs/` before fixing.
- Do NOT edit `data/enquiries.json`. It holds real leads whose old budget strings must stay.
- Line numbers below are from the current `main`. Use the quoted text, not the number, if they drift.

---

### Task 1: Pricing module and check script

**Files:**
- Create: `lib/pricing.ts`
- Create: `scripts/check-pricing.ts`

- [ ] **Step 1: Write the failing check**

Create `scripts/check-pricing.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-pricing.ts`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lib/pricing.ts`.

- [ ] **Step 3: Write the module**

Create `lib/pricing.ts`:

```ts
export type ModelId = "kiosk" | "cafe";

export type PricingItem = {
  id: string;
  name: string;
  amount: number;
  formattedAmount: string;
  notes: string;
  iconName: "Handshake" | "Utensils" | "Sofa" | "PartyPopper";
};

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;
const lakh = (n: number) => `₹${n / 100000} Lakh`;

// amounts: [franchise fee, kitchen setup, interiors/CCTV/billing, opening ceremony]
const build = (id: ModelId, label: string, amounts: number[]) => {
  const [fee, kitchen, interiors, opening] = amounts;
  const items: PricingItem[] = [
    { id: `${id}-1`, name: "Franchise Fees", amount: fee, formattedAmount: inr(fee), notes: "18% GST Applicable on Franchise Fees", iconName: "Handshake" },
    { id: `${id}-2`, name: "Kitchen Setup & Equipment", amount: kitchen, formattedAmount: inr(kitchen), notes: "Includes commercial pizza oven, refrigeration & prep stations", iconName: "Utensils" },
    { id: `${id}-3`, name: "Interiors, CCTV & Billing set", amount: interiors, formattedAmount: inr(interiors), notes: "Standardized front desk counter, illuminated LED signage & cloud POS setup", iconName: "Sofa" },
    { id: `${id}-4`, name: "1st day opening ceremony", amount: opening, formattedAmount: inr(opening), notes: "Including decorations & whole management by Pizza Mood", iconName: "PartyPopper" },
  ];
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id, label, total, lakh: lakh(total), formattedTotal: inr(total), items };
};

export type PricingModel = ReturnType<typeof build>;

// Kiosk line items are proposed (scaled from the Cafe table); owner to confirm.
export const MODEL_BY_ID: Record<ModelId, PricingModel> = {
  kiosk: build("kiosk", "Kiosk", [250000, 200000, 200000, 50000]),
  cafe: build("cafe", "Cafe", [400000, 300000, 400000, 100000]),
};
export const MODELS: PricingModel[] = [MODEL_BY_ID.kiosk, MODEL_BY_ID.cafe];

export const PRICING_HEADLINE = MODELS.map((m) => `${m.label} ${m.lakh}`).join(" · ");
export const PRICING_COMPACT = MODELS.map((m) => `${m.label} ₹${m.total / 100000}L`).join(" · ");

export const BUDGET_OPTIONS = ["Kiosk – ₹7 Lakh", "Cafe – ₹12 Lakh", "Need guidance"] as const;
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];
export const DEFAULT_BUDGET: BudgetOption = "Need guidance";
```

- [ ] **Step 4: Run the check to verify it passes**

Run: `node scripts/check-pricing.ts`
Expected: `pricing ok`

- [ ] **Step 5: Commit**

```bash
git add lib/pricing.ts scripts/check-pricing.ts
git commit -m "feat: add pricing module for Kiosk and Cafe models" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Budget type and defaults

**Files:**
- Modify: `types/index.ts:10-15`
- Modify: `lib/db.ts:114`, `lib/webhook.ts:14`, `app/api/enquiries/route.ts:45`
- Modify: `data/initialData.ts:523`, `data/initialData.ts:547`

- [ ] **Step 1: Replace the `InvestmentBudget` type**

In `types/index.ts` replace

```ts
export type InvestmentBudget =
  | "₹4–6 Lakh"
  | "₹6–10 Lakh"
  | "₹10–15 Lakh"
  | "₹15 Lakh+"
  | "Need guidance";
```

with

```ts
// Legacy range strings stay valid: leads already stored in data/enquiries.json use them.
export type InvestmentBudget =
  | BudgetOption
  | "₹4–6 Lakh"
  | "₹6–10 Lakh"
  | "₹10–15 Lakh"
  | "₹15 Lakh+";
```

and add at the top of the file: `import type { BudgetOption } from "@/lib/pricing";`

- [ ] **Step 2: Replace the three defaults**

- `lib/db.ts:114`: change `"₹4–6 Lakh"` to `DEFAULT_BUDGET`; add `import { DEFAULT_BUDGET } from "./pricing";` with the other imports.
- `lib/webhook.ts:14`: same change and same import.
- `app/api/enquiries/route.ts:45`: same change; import `import { DEFAULT_BUDGET } from "@/lib/pricing";`.

- [ ] **Step 3: Update the two sample leads**

In `data/initialData.ts`: line 523 `investmentBudget: "₹4–6 Lakh",` becomes `investmentBudget: "Kiosk – ₹7 Lakh",`; line 547 `investmentBudget: "₹6–10 Lakh",` becomes `investmentBudget: "Cafe – ₹12 Lakh",`.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors from the files above (errors in FranchiseForm/FranchiseModal are not expected either, since the legacy strings are still in the union).

- [ ] **Step 5: Commit**

```bash
git add types/index.ts lib/db.ts lib/webhook.ts app/api/enquiries/route.ts data/initialData.ts
git commit -m "feat: default lead budget to Need guidance, add Kiosk/Cafe budget options" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Enquiry form and modal options

**Files:**
- Modify: `app/components/FranchiseForm.tsx:27,82,236`
- Modify: `app/components/FranchiseModal.tsx:38,174,193,357`

- [ ] **Step 1: Swap the option array, default and WhatsApp text in both files**

Run from the repo root (macOS `sed`):

```bash
for f in app/components/FranchiseForm.tsx app/components/FranchiseModal.tsx; do
  sed -i '' 's|\["₹4–6 Lakh", "₹6–10 Lakh", "₹10–15 Lakh", "₹15 Lakh+", "Need guidance"\] as InvestmentBudget\[\]|[...BUDGET_OPTIONS] as InvestmentBudget[]|' "$f"
  sed -i '' 's|investmentBudget: "₹4–6 Lakh" as InvestmentBudget|investmentBudget: DEFAULT_BUDGET as InvestmentBudget|' "$f"
  sed -i '' 's|complete franchise details for starting with ₹4 Lakh\.|complete franchise details for the Kiosk and Cafe models.|' "$f"
done
```

Then add `import { BUDGET_OPTIONS, DEFAULT_BUDGET } from "@/lib/pricing";` directly after the existing `import { InvestmentBudget, StoreType } from "@/types";` line in each file.

- [ ] **Step 2: Replace the modal badge**

In `app/components/FranchiseModal.tsx:193` replace `<Sparkles className="h-3.5 w-3.5" /> Start From ₹4 Lakh` with `<Sparkles className="h-3.5 w-3.5" /> {PRICING_COMPACT}` and change the import to `import { BUDGET_OPTIONS, DEFAULT_BUDGET, PRICING_COMPACT } from "@/lib/pricing";`.

- [ ] **Step 3: Verify**

Run: `grep -n "4–6\|4 Lakh" app/components/FranchiseForm.tsx app/components/FranchiseModal.tsx; npx tsc --noEmit`
Expected: grep prints nothing; tsc has no errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/FranchiseForm.tsx app/components/FranchiseModal.tsx
git commit -m "feat: replace budget ranges with Kiosk/Cafe options in enquiry forms" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: PricingCards component

**Files:**
- Create: `app/components/PricingCards.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { MODELS } from "@/lib/pricing";

export default function PricingCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {MODELS.map((m) => (
        <div key={m.id} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-xl shadow-amber-500/10">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{m.label} Model</div>
          <div className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{m.formattedTotal}</div>
          <div className="mt-1 text-xs font-bold text-sky-600">Total investment ({m.lakh})</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/PricingCards.tsx
git commit -m "feat: add side-by-side Kiosk/Cafe pricing cards" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Investment breakdown per model

**Files:**
- Modify: `app/data/franchiseInvestmentData.ts`
- Modify: `app/components/franchise-investment/InvestmentTable.tsx`
- Modify: `app/components/FranchiseInvestmentSection.tsx`
- Modify: `app/components/InvestmentSection.tsx`, `app/page.tsx`, `app/investment/page.tsx`
- Modify: `types/index.ts`, `data/initialData.ts`, `app/admin/settings/page.tsx` (remove unused settings breakdown)

- [ ] **Step 1: Confirm what imports the old data**

Run: `grep -rn "investmentItemsData\|calculatedTotalInvestment\|InvestmentItem\b" app lib types data --include='*.ts' --include='*.tsx'`
Expected: hits only in `franchiseInvestmentData.ts`, `InvestmentTable.tsx`, `types/index.ts`, `data/initialData.ts`, `app/admin/settings/page.tsx` (the `InvestmentItem` type) and possibly `InvestmentRow.tsx` (it should import only the `InvestmentItemData` interface, which stays). If anything else imports them, update it the same way as below.

- [ ] **Step 2: Strip the old items from the data file**

In `app/data/franchiseInvestmentData.ts` delete the whole `investmentItemsData` array and the `calculatedTotalInvestment` const (and its comment). Keep the `InvestmentItemData` interface, `franchiseInvestmentConfig`, `benefitItemsData`, `trustItemsData`. Change the heading line to use the module:

```ts
import { PRICING_HEADLINE } from "@/lib/pricing";
// ...
  mainHeadingLine1: PRICING_HEADLINE,
```

(put the import at the top of the file).

- [ ] **Step 3: Make `InvestmentTable` take a model**

In `app/components/franchise-investment/InvestmentTable.tsx`:

Replace the data import block

```tsx
import {
  investmentItemsData,
  calculatedTotalInvestment,
  franchiseInvestmentConfig,
  InvestmentItemData,
} from "@/app/data/franchiseInvestmentData";
```

with

```tsx
import { franchiseInvestmentConfig, InvestmentItemData } from "@/app/data/franchiseInvestmentData";
import type { PricingModel } from "@/lib/pricing";
```

Replace the props and signature:

```tsx
interface InvestmentTableProps {
  model: PricingModel;
  counterStarted: boolean;
}
...
export const InvestmentTable: React.FC<InvestmentTableProps> = ({ model, counterStarted }) => {
```

Then replace all three usages: `investmentItemsData.map(` becomes `model.items.map(` (desktop rows and mobile rows), and both `targetAmount={calculatedTotalInvestment}` become `targetAmount={model.total}`. Change the mobile banner text `Setup Expenses Breakdown` to `{model.label} Setup Expenses Breakdown`.

- [ ] **Step 4: Add the model toggle to the section**

In `app/components/FranchiseInvestmentSection.tsx`:

1. Add import: `import { MODELS, MODEL_BY_ID, PRICING_HEADLINE, type ModelId } from "@/lib/pricing";`
2. After `const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);` add `const [modelId, setModelId] = useState<ModelId>("kiosk");`
3. Replace `<InvestmentTable counterStarted={counterStarted} />` (around line 346) with:

```tsx
<div role="tablist" aria-label="Franchise model" className="mb-3 flex gap-2">
  {MODELS.map((m) => (
    <button
      key={m.id}
      type="button"
      role="tab"
      aria-selected={m.id === modelId}
      onClick={() => setModelId(m.id)}
      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-wide transition ${
        m.id === modelId
          ? "border-amber-300 bg-[#FFD21C] text-[#101A35]"
          : "border-slate-200 bg-white text-slate-600"
      }`}
    >
      {m.label} · {m.lakh}
    </button>
  ))}
</div>
<InvestmentTable key={modelId} model={MODEL_BY_ID[modelId]} counterStarted={counterStarted} />
```

(`key={modelId}` remounts the table so the counter re-animates.)

4. In the video modal text (around line 388) replace `Transparent ₹12 Lakh Setup Expenses Breakdown & Growth Plan.` with `Transparent {PRICING_HEADLINE} Setup Expenses Breakdown & Growth Plan.`

- [ ] **Step 5: Remove the unused settings breakdown**

- `app/components/InvestmentSection.tsx`: replace the file with

```tsx
"use client";

import React from "react";
import FranchiseInvestmentSection from "./FranchiseInvestmentSection";

export default function InvestmentSection() {
  return <FranchiseInvestmentSection />;
}
```

- `app/page.tsx`: change the comment `{/* 03 THE ₹4 LAKH OPPORTUNITY BREAKDOWN */}` to `{/* 03 INVESTMENT BREAKDOWN (KIOSK & CAFE) */}` and the usage to `<InvestmentSection />`. Run `grep -n "settings" app/page.tsx`; if `settings` is now unused, delete its `const settings = ...` line and its import.
- `app/investment/page.tsx`: change `<InvestmentSection breakdown={settings.investmentBreakdown} disclaimer={settings.disclaimerText} />` to `<InvestmentSection />`; delete the now-unused `const settings = await getSiteSettings();` and its import. The `async` on the page function can stay.
- `types/index.ts`: delete `export type InvestmentItem = {...}` (lines ~127-131) and the `investmentBreakdown: InvestmentItem[];` field of `SiteSettings`.
- `data/initialData.ts`: delete the `investmentBreakdown: [ ... ],` block (5 rows) from `initialSiteSettings`; change `startingInvestment: "₹4 Lakh",` to `startingInvestment: PRICING_HEADLINE,` and add `import { PRICING_HEADLINE } from "@/lib/pricing";` at the top.
- `app/admin/settings/page.tsx`: delete the `handleInvestmentItemChange` function and the whole `{/* Investment Breakdown Config */}` block (the `<div>` ending just before `{/* Legal Disclaimer Text */}`). Run `grep -n "Calculator" app/admin/settings/page.tsx`; if the import is now unused, remove `Calculator` from the lucide import.

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add -A app types data
git commit -m "feat: per-model investment breakdown with Kiosk/Cafe toggle; drop unused settings breakdown" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Hero, Investment page, comparison, Navbar

**Files:**
- Modify: `app/components/HeroSection.tsx`
- Modify: `app/investment/page.tsx:6,21`
- Modify: `app/components/ComparisonSection.tsx:8`
- Modify: `app/components/Navbar.tsx:33`

- [ ] **Step 1: HeroSection**

Add imports: `import PricingCards from "./PricingCards";` and `import { PRICING_HEADLINE } from "@/lib/pricing";`.

Replace

```tsx
              Start your own Pizza Mood franchise with an investment starting from{" "}
              <strong className="text-slate-900 underline decoration-yellow-400 decoration-4">
                ₹4 Lakh
              </strong>{" "}
              — complete with
```

with

```tsx
              Start your own Pizza Mood franchise:{" "}
              <strong className="text-slate-900 underline decoration-yellow-400 decoration-4">
                {PRICING_HEADLINE}
              </strong>{" "}
              — complete with
```

Replace the comment line `{/* 3 Bold Franchise Opportunity Badges */}` with `<PricingCards />` followed by `{/* 2 Bold Franchise Opportunity Badges */}`, change `grid grid-cols-3 gap-3 sm:gap-4 pt-2` to `grid grid-cols-2 gap-3 sm:gap-4 pt-2`, and delete the first badge `<div>` (the one containing `₹4 Lakh+` and `Starting Investment`).

- [ ] **Step 2: Investment page**

In `app/investment/page.tsx`: add `import PricingCards from "@/app/components/PricingCards";` and `import { PRICING_HEADLINE } from "@/lib/pricing";`. Change the metadata title to

```ts
  title: `Pizza Mood Franchise Cost & Investment Breakdown | ${PRICING_HEADLINE}`,
```

Replace the h1 text `Start Your Pizza Business From ₹4 Lakh*` with `{PRICING_HEADLINE}*`. After the `<p ...>No hidden royalty surprises...</p>` add:

```tsx
          <div className="mx-auto mt-6 max-w-xl"><PricingCards /></div>
```

- [ ] **Step 3: Comparison and Navbar**

- `ComparisonSection.tsx:8`: `pizzaMood: "Starting from accessible ₹4 Lakh setup capital",` becomes ``pizzaMood: `${PRICING_HEADLINE} setup capital`,`` and add `import { PRICING_HEADLINE } from "@/lib/pricing";`.
- `Navbar.tsx:33`: `<Sparkles className="h-3 w-3" /> ₹4 Lakh Opportunity` becomes `<Sparkles className="h-3 w-3" /> {PRICING_COMPACT}` with `import { PRICING_COMPACT } from "@/lib/pricing";`.

- [ ] **Step 4: Commit**

```bash
git add app/components/HeroSection.tsx app/investment/page.tsx app/components/ComparisonSection.tsx app/components/Navbar.tsx
git commit -m "feat: show Kiosk and Cafe prices side by side in hero, investment page, navbar" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Remaining copy

**Files:** `app/layout.tsx:18`, `app/franchise/page.tsx:11,29`, `app/components/Footer.tsx:82,145,238`, `app/terms/page.tsx:47`, `app/privacy-policy/page.tsx:53`, `app/locations/[city]/[area]/page.tsx:344`, `data/initialData.ts:24,226,435,440-441,498`, `data/locations.json:199`

Add `import { PRICING_HEADLINE } from "@/lib/pricing";` to each `.tsx`/`.ts` file above that uses it (and `MODEL_BY_ID` in `data/initialData.ts`).

- [ ] **Step 1: Metadata and page copy**

- `app/layout.tsx:18`: ``title: `Pizza Mood Franchise | ${PRICING_HEADLINE}`,``
- `app/franchise/page.tsx:11`: ``description: `Start your own Pizza Mood franchise: ${PRICING_HEADLINE}. Includes location assistance, turnkey store setup, staff training & marketing support.`,``
- `app/franchise/page.tsx:29`: `India's accessible QSR franchise — {PRICING_HEADLINE} setup capital. Complete 360° operational guidance, site selection, staff training & central ingredient supply.`
- `app/locations/[city]/[area]/page.tsx:344`: `Start your own store: {PRICING_HEADLINE}, with 360° operational support.`

- [ ] **Step 2: Footer, Terms, Privacy**

- `Footer.tsx:82`: replace `stores starting from ₹4 Lakh investment.` with `stores. Choose the Kiosk or Cafe model: {PRICING_HEADLINE}.`
- `Footer.tsx:145`: `₹4 Lakh Investment Breakdown` becomes `Kiosk & Cafe Investment Breakdown`.
- `Footer.tsx:238`: replace `starting from ₹4 Lakh are indicative estimates for standard takeaway formats.` with `({PRICING_HEADLINE}) are indicative estimates for the standard Kiosk and Cafe formats.`
- `terms/page.tsx:47`: replace `starting investment estimates (such as "starting from ₹4 Lakh")` with `investment estimates (such as "{PRICING_HEADLINE}")` and `standard takeaway format QSR stores` with `standard Kiosk and Cafe format stores`.
- `privacy-policy/page.tsx:53`: replace `(e.g., ₹4–6 Lakh, ₹6–10 Lakh)` with `(e.g., Kiosk – ₹7 Lakh, Cafe – ₹12 Lakh)`.

- [ ] **Step 3: `data/initialData.ts` text**

- Line 24: ``seoDefaultTitle: `Pizza Mood Franchise | ${PRICING_HEADLINE}`,``
- Line 226 (Shivane description): replace `our signature ₹4 Lakh franchise model` with `our signature franchise model`.
- Line 435 (FAQ 1 answer): ``answer: `A Pizza Mood franchise comes in two models: ${PRICING_HEADLINE} (total investment). This indicative setup cost covers brand franchise rights, essential commercial kitchen equipment, store exterior branding, initial raw material inventory, staff uniform, and launch marketing support.` ``
- Lines 440-441 (FAQ 2): question becomes ``question: `Can I really start a Pizza Mood franchise with ${MODEL_BY_ID.kiosk.lakh}?` ``; answer becomes ``answer: `Yes! Our compact Kiosk model has been specifically engineered to eliminate unnecessary expensive fluff. With optimized space requirements starting at 120–250 sq. ft., aspiring entrepreneurs can launch a fully operational store with ${MODEL_BY_ID.kiosk.lakh} setup capital. The Cafe model is ${MODEL_BY_ID.cafe.lakh}.` ``
- Line 498 (testimonial): replace `The low investment barrier of ₹4 Lakh was the main reason` with `The low investment barrier was the main reason` (a quote must not carry a figure the speaker did not give).

- [ ] **Step 4: `data/locations.json:199`**

Replace `our signature ₹4 Lakh franchise model in action` with `our signature franchise model in action` (runtime copy of the Shivane description).

- [ ] **Step 5: Commit**

```bash
git add app data
git commit -m "feat: replace remaining ₹4 Lakh copy with Kiosk/Cafe pricing" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Verify

- [ ] **Step 1: No stray prices**

Run:

```bash
grep -rnE "4 Lakh|₹4–6|₹6–10|₹10–15|₹15 Lakh|12 Lakh|Takeaway & Cloud" app lib data types --include='*.ts' --include='*.tsx' --include='*.json' --exclude=enquiries.json
```

Expected: only `lib/pricing.ts` (the `BUDGET_OPTIONS` literal) and `types/index.ts` (the four legacy strings). Anything else is a miss: fix it.

- [ ] **Step 2: Pricing check and build**

Run: `node scripts/check-pricing.ts && npm run lint && npm run build`
Expected: `pricing ok`, lint with no new errors, build succeeds.

- [ ] **Step 3: Visual check**

Run `npm run dev`, then open `/`, `/investment`, `/franchise`, `/locations`, `/faq`, `/terms`. Confirm:
- Hero shows two cards: `₹ 7,00,000` and `₹ 12,00,000`.
- The Investment section toggle switches Kiosk (total ₹ 7,00,000) and Cafe (total ₹ 12,00,000); the counter re-animates.
- The Navbar badge `Kiosk ₹7L · Cafe ₹12L` does not overflow at 375px width.
- The enquiry form and modal show the three new options.
- A submitted test lead stores `Kiosk – ₹7 Lakh` (or the chosen option) in the admin leads list. Delete the test lead afterwards.

- [ ] **Step 4: Report to owner**

Tell the owner: Kiosk line items are proposed (250k/200k/200k/50k) and need confirmation; the FAQ ties the "120–250 sq. ft." claim to the Kiosk model; a deployed `data/settings.json` or `faqs.json` (runtime files, not in git) would override the new defaults and may still show old prices; the WhatsApp number in `FranchiseModal.tsx` (`919876543210`) differs from the real one (`919096970369`) and was left unchanged.
