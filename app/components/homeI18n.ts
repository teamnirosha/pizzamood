import type { Dict } from "@/lib/i18n/dictionaries/en";
import { MODELS, type PricingModel } from "@/lib/pricing";

export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));
// Area/city names are English in the DB; Marathi display uses the dictionary map, else the original.
export const place = (t: Dict, n: string) => t.home.places[n] ?? n;
export const modelLakh = (t: Dict, m: PricingModel) => `₹${m.total / 100000} ${t.home.pricing.lakh}`;
export const pricingHeadline = (t: Dict) => MODELS.map((m) => `${t.home.pricing.models[m.id]} ${modelLakh(t, m)}`).join(" · ");

// Grapheme clusters keep Devanagari conjuncts and matras together so a flip animation never splits a syllable.
export const splitGraphemes = (s: string): string[] =>
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter("mr", { granularity: "grapheme" }).segment(s), (x) => x.segment)
    : [...s];
