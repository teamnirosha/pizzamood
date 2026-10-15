# USP, FOMO and enquiry conversion

## Goal

Make Pizza Mood's USPs impossible to miss on the hero and across the site, give visitors an immediate way to enquire (form, phone, WhatsApp), and create real urgency from the area-exclusivity rule. Add matching structured data. Plain language: anyone should understand the offer in seconds.

## Content (owner-supplied)

USPs:

1. Guaranteed 30 days go live
2. Complete hand holding till go live and after
3. Widespread menu to cater to a huge customer base: Pizzas, Momos, Cold Coffee, Shakes, French Fries, Burgers
4. Full digital marketing support to uplift your business
5. Daily fresh raw materials, with a hassle-free order placement app for franchise owners
6. No hidden charges, such as a visiting fee for site finalization
7. Crystal clear explanation of ROI

Scarcity rule (real): only ONE Pizza Mood outlet (Kiosk or Cafe) per area. Once an area is taken, it is gone.

Franchise enquiry phone: 9096970369 (+91 90969 70369). This is already the site's primary number; it is added where missing.

## Non-goals

- No countdown timers, no invented "slots left" counts, no pop-ups.
- No "check your area" tool. Scarcity is stated, not computed.
- No invented ROI figures: the ROI USP is stated as "crystal clear explanation of ROI".

## Design

### 1. Single content module: `lib/usps.ts`

Exports:

- `USPS`: the 7 items (id, title, plain-English line, lucide icon name).
- `EXCLUSIVITY_LINE`: "Only ONE Pizza Mood outlet per area. Once it's taken, it's gone."
- `FRANCHISE_PHONE_DISPLAY` ("+91 90969 70369"), `FRANCHISE_PHONE_TEL` ("+919096970369"), and `whatsappLink(text?)` returning the `wa.me/919096970369` URL with prefill text (default "Hi Pizza Mood, I want franchise info.").

All components and schema read from this module. Existing hard-coded `9096970369` links are left unless touched by the work below.

### 2. New components (`app/components/`)

- `ScarcityBar`: slim bar above the Navbar on every page; shows `EXCLUSIVITY_LINE` and an "Enquire now" button that opens the existing enquiry form.
- `WhatsAppBubble`: floating green bubble, fixed bottom-right on all breakpoints; on mobile it sits above the existing sticky bottom action bar. Opens `whatsappLink()` in a new tab with `rel="noopener noreferrer"` and an accessible label.
- `UspChecklist`: all 7 USPs as ticked lines (hero).
- `UspSection`: full icon-grid section placed directly after the hero on the home page, with a CTA row (form + WhatsApp).
- `UspTicker`: one-line USP strip reused on `/investment`, `/franchise` and `/locations`.

`ScarcityBar` and `WhatsAppBubble` are mounted once in `app/layout.tsx`. The form is opened the same way existing code opens it (click on the `#open-franchise-modal` element); no new modal state is introduced.

### 3. Hero (`HeroSection.tsx`)

- Headline: "Open Your Pizza Mood in 30 Days. Guaranteed."
- Directly under it: `EXCLUSIVITY_LINE`, then `PricingCards`, then `UspChecklist`.
- Two large buttons: "Get Free Franchise Details" (opens the form) and "Chat on WhatsApp".
- The two small badge tiles (30 Days, 360°) are removed; the USPs cover them.

### 4. FOMO placement (real scarcity only)

Exclusivity wording appears in: the scarcity bar, the hero, a line at the top of the enquiry form and modal, a new row in `ComparisonSection`, and the new FAQ. Social proof uses only outlet and city counts already in `initialSiteSettings` (`totalOutletsCount`, `citiesCount`); the owner must confirm they are current.

### 5. Schema (`lib/seo.ts`)

- `generateOrganizationSchema`: add `contactPoint` (`ContactPoint`, `contactType: "sales"`, `telephone: "+919096970369"`, `availableLanguage: ["English", "Hindi"]`) and a `slogan`.
- New `generateFranchiseSchema()`: `makesOffer` with two `Offer` entries (Kiosk and Cafe) whose `price` comes from `MODEL_BY_ID` totals, `priceCurrency: "INR"`; plus an `ItemList` of the USPs.
- Three new entries in `initialFAQs` (30-day go-live guarantee; one outlet per area; no hidden charges). The existing `generateFAQSchema` carries them.
- Injection: the new schema is rendered as JSON-LD on the home page, `/franchise` and `/investment`, next to the existing Organization schema injection.

### 6. Legal wording fix

`Footer.tsx` disclaimer and `app/terms/page.tsx` call timelines "indicative estimates", which contradicts a guarantee. Reword to: "The 30-day go-live guarantee is subject to the terms of your franchise agreement." The owner must confirm the guarantee is backed by the agreement before release.

## Error handling

Content is static. The only runtime risk is the form-open trigger: if `#open-franchise-modal` is missing on a page, new buttons fall back to the WhatsApp link.

## Verification

- Extend `scripts/check-pricing.mjs` (or add `scripts/check-schema.mjs`) to assert: offer prices equal `lib/pricing.ts` totals; schema phone equals `FRANCHISE_PHONE_TEL`; `USPS.length === 7`.
- Grep: exactly one phone format (`+919096970369` / `+91 90969 70369`) across `app`, `lib`, `data`, apart from the known `FranchiseModal.tsx` WhatsApp number mismatch, which this work fixes by using `whatsappLink()`.
- `npx tsc --noEmit` and `npm run build` pass.
- Visual check on desktop and 375px width: hero, bar, bubble (not overlapping the bottom action bar), `/investment`, `/franchise`, `/locations`.
- JSON-LD parsed from the rendered HTML is valid JSON.

## Open items for the owner

- Confirm the 30-day guarantee is legally backed (section 6).
- Confirm `totalOutletsCount` (18) and `citiesCount` (4) are current.
- Confirm plain-English wording of each USP line once drafted.
