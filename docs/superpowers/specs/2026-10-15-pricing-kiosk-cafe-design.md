# Pricing: Kiosk and Cafe models

## Goal

Show two franchise models with clear, consistent pricing across the whole site:

- Kiosk model: ₹7,00,000 (700000)
- Cafe model: ₹12,00,000 (1200000)

Both are total investment figures, shown side by side. The old "from ₹4 Lakh" headline is removed everywhere.

## Current problems

- "₹4 Lakh" is the headline in page titles, meta descriptions, Navbar, HeroSection, Footer, ComparisonSection, FranchiseModal, Terms, `data/initialData.ts` (startingInvestment, FAQs, testimonials, location copy) and WhatsApp prefill texts.
- `app/data/franchiseInvestmentData.ts` and `FranchiseInvestmentSection.tsx` show a conflicting single ₹12 Lakh breakdown.
- `data/initialData.ts` has a third breakdown that sums to ₹4 Lakh.
- The enquiry form budget options are ranges (₹4–6 Lakh, ₹6–10 Lakh, ₹10–15 Lakh, ₹15 Lakh+, Need guidance), also used as defaults in `lib/db.ts`, `lib/webhook.ts` and `app/api/enquiries/route.ts`.
- No Kiosk or Cafe model exists on the site.

## Design

### 1. Single source of truth: `lib/pricing.ts`

Exports the two models (`kiosk` = 700000, `cafe` = 1200000), formatted strings ("₹7 Lakh", "₹7,00,000"), and the headline "Kiosk ₹7 Lakh · Cafe ₹12 Lakh". All pages, meta titles, FAQs and form options import from it. No other file hard-codes a price.

### 2. Copy replacements

Every "from ₹4 Lakh" becomes the side-by-side headline. Affected: layout, investment, franchise and location page titles and descriptions; Navbar badge (shortened to fit); HeroSection; Footer; Terms disclaimer; `startingInvestment`, FAQ and testimonial text in `data/initialData.ts`; WhatsApp prefill texts. Copy describing a "Takeaway & Cloud QSR" model is reworded to the Kiosk and Cafe naming.

### 3. Breakdown tables

Replace the single ₹12 Lakh table and the ₹4 Lakh settings list with one table per model. Line items are proposed by scaling the current categories, to be reviewed and corrected by the owner. Each table's rows sum exactly to its model total; an assert-based check enforces this.

### 4. Pricing display

Add a side-by-side Kiosk and Cafe card pair to the Hero and Investment pages. ComparisonSection keeps the "₹25–50 Lakh traditional restaurant" contrast, with both prices on the Pizza Mood side.

### 5. Form and data

`InvestmentBudget` options become "Kiosk – ₹7 Lakh", "Cafe – ₹12 Lakh" and "Need guidance". Defaults in `lib/db.ts`, `lib/webhook.ts` and `app/api/enquiries/route.ts` change to match. Admin leads view is checked for handling of legacy range values. Stored leads keep their old strings.

## Out of scope

Menu item prices (₹150–₹500 pizza prices), `lib/seo.ts` priceRange, and the "Food Court Kiosk" outlet-type dropdown option.

## Verification

- Grep finds no "4 Lakh", "₹4–6" or "₹12 Lakh" strings outside `lib/pricing.ts`.
- Breakdown sum check passes for both models.
- `next build` succeeds.
- Visual check of Hero, Investment page, Navbar and enquiry form.
