import { Metadata } from "next";
import Link from "@/app/components/LocalizedLink";
import { notFound } from "next/navigation";
import { MessageCircle, MapPin } from "lucide-react";
import { getLocations } from "@/lib/db";
import { FRANCHISE_PAGES, getFranchisePage, fill } from "@/lib/franchisePages";
import { FRANCHISE_AREAS, isAreaTaken, areaNameMr } from "@/lib/areas";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { hasLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, ogLocale, absUrl } from "@/lib/i18n/seo";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { FRANCHISE_PHONE_DISPLAY, FRANCHISE_PHONE_TEL, whatsappLink } from "@/lib/usps";
import EnquiryButton from "@/app/components/EnquiryButton";
import FranchiseJsonLd from "@/app/components/FranchiseJsonLd";
import PricingCards from "@/app/components/PricingCards";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => FRANCHISE_PAGES.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const page = getFranchisePage(slug, lang);
  if (!page) return {};
  const url = absUrl(lang, `/franchise/${page.slug}`);
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: alternatesFor(lang, `/franchise/${page.slug}`),
    openGraph: { title: page.metaTitle, description: page.description, url, siteName: "Pizza Mood", locale: ogLocale(lang), type: "website" },
  };
}

export default async function FranchiseLandingPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getFranchisePage(slug, lang);
  if (!page) notFound();
  const dict = await getDictionary(lang);
  const t = dict.franchise;
  const c = t.common;

  const allStores = page.showStores ? await getLocations() : [];
  const stores = allStores.filter((l) => l.status === "active");
  const related = page.related.map((r) => getFranchisePage(r, lang)).filter((p) => !!p);

  const breadcrumb = generateBreadcrumbSchema([
    { name: c.home, url: absUrl(lang, "/") },
    { name: c.franchise, url: absUrl(lang, "/franchise") },
    { name: page.kicker, url: absUrl(lang, `/franchise/${page.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(page.faqs.map((f, i) => ({ id: `${page.slug}-${i}`, category: "General" as const, ...f })));

  return (
    <div className="bg-white min-h-screen" lang={lang}>
      <FranchiseJsonLd lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-100">
            {page.kicker}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{page.h1}</h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">{page.intro}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton label={c.cta} />
            <a
              href={whatsappLink(c.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-black text-white shadow-xl hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" /> {c.whatsapp}
            </a>
          </div>
          <p className="mt-4 text-xs font-bold text-amber-100">{c.exclusivity}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-12">
        {page.showPricing && (
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">{c.investment}</h2>
            <PricingCards />
            <p className="mt-2 text-xs font-semibold text-slate-500">{c.taxes}</p>
          </section>
        )}

        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-black text-slate-900">{s.heading}</h2>
            {s.paras?.map((p) => (
              <p key={p} className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-medium text-slate-700">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>{s.table.head.map((h, i) => <th key={i} className="px-4 py-3 font-black">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        {r.map((c, j) => (
                          <td key={j} className={`px-4 py-3 ${j === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {stores.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-slate-900">{t.landing.storesHeading}</h2>
            <p className="mt-3 text-sm font-medium text-slate-700">
              {t.landing.storesIntro}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stores.map((s) => (
                <li key={s.id}>
                  <Link href={`/locations/${s.slug}`} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 hover:border-sky-300">
                    <MapPin className="h-4 w-4 text-sky-600" /> {lang === "mr" ? areaNameMr(s.area) : s.area}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {page.showStores && (
          <section>
            <h2 className="text-2xl font-black text-slate-900">{t.landing.openHeading}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FRANCHISE_AREAS.filter((a) => !isAreaTaken(a, allStores)).map((a) => (
                <li key={a.slug}>
                  <Link href={`/franchise/pune/${a.slug}`} className="block rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-800 hover:border-emerald-400">
                    {lang === "mr" ? a.nameMr : a.name} <span className="text-xs text-emerald-700">· {t.landing.available}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-black text-slate-900">{c.faq}</h2>
          <div className="mt-4 space-y-3">
            {page.faqs.map((f) => (
              <details key={f.question} className="rounded-2xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-black text-slate-900">{f.question}</summary>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-2xl font-black">{c.ctaHeading}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-300">{c.ctaSub}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton label={c.cta} />
            <a href={`tel:${FRANCHISE_PHONE_TEL}`} className="text-sm font-black text-yellow-400 underline">
              {FRANCHISE_PHONE_DISPLAY}
            </a>
          </div>
        </section>

        <nav aria-label={c.relatedAria}>
          <h2 className="text-lg font-black text-slate-900">{c.related}</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/franchise/${r.slug}`} className="text-sm font-bold text-sky-700 hover:underline">{r.kicker}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
