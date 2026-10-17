import { MODELS } from "@/lib/pricing";
import type { Dict } from "@/lib/i18n/dictionaries/en";
import type { FAQItem } from "@/types";
import type { Locale } from "@/lib/i18n";

type P = Dict["pages"];

export const fill = (s: string, v: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

export const lakhOf = (t: P, total: number) => fill(t.pricing.lakh, { n: total / 100000 });

export const headlineOf = (t: P) => MODELS.map((m) => `${t.pricing[m.id]} ${lakhOf(t, m.total)}`).join(" · ");

export const pricingVars = (t: P) => ({
  headline: headlineOf(t),
  kioskLakh: lakhOf(t, MODELS[0].total),
  cafeLakh: lakhOf(t, MODELS[1].total),
});

// English keeps the stored (DB) text untouched; Marathi swaps in dictionary text per FAQ id, English fallback.
export function localizeFaqs(faqs: FAQItem[], lang: Locale, t: P): FAQItem[] {
  if (lang === "en") return faqs;
  const items: Record<string, { q: string; a: string }> = t.faq.items;
  const v = pricingVars(t);
  return faqs.map((f) => {
    const m = items[f.id];
    return m ? { ...f, question: fill(m.q, v), answer: fill(m.a, v) } : f;
  });
}
