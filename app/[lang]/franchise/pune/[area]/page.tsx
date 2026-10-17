import { Metadata } from "next";
import Link from "@/app/components/LocalizedLink";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import { getLocations } from "@/lib/db";
import { FRANCHISE_AREAS, getArea, isAreaTaken } from "@/lib/areas";
import { fill } from "@/lib/franchisePages";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { hasLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, ogLocale, absUrl } from "@/lib/i18n/seo";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { FRANCHISE_PHONE_DISPLAY, FRANCHISE_PHONE_TEL, whatsappLink } from "@/lib/usps";
import EnquiryButton from "@/app/components/EnquiryButton";
import FranchiseJsonLd from "@/app/components/FranchiseJsonLd";
import PricingCards from "@/app/components/PricingCards";

interface PageProps {
  params: Promise<{ lang: string; area: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => FRANCHISE_AREAS.map((a) => ({ lang, area: a.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, area: slug } = await params;
  if (!hasLocale(lang)) return {};
  const area = getArea(slug);
  if (!area) return {};
  const t = (await getDictionary(lang)).franchise;
  const taken = isAreaTaken(area, await getLocations());
  const v = { name: lang === "mr" ? area.nameMr : area.name, en: area.name, price: t.price };
  const title = fill(t.area.title, v);
  const description = fill(t.area.description, v);
  const path = `/franchise/pune/${area.slug}`;
  return {
    title,
    description,
    keywords: lang === "mr" ? t.area.keywords.map((k) => fill(k, v)) : undefined,
    alternates: alternatesFor(lang, path),
    robots: { index: !taken, follow: true },
    openGraph: { title, description, url: absUrl(lang, path), siteName: "Pizza Mood", locale: ogLocale(lang), type: "website" },
  };
}

export default async function AreaFranchisePage({ params }: PageProps) {
  const { lang, area: slug } = await params;
  if (!hasLocale(lang)) notFound();
  const area = getArea(slug);
  if (!area) notFound();
  const dict = await getDictionary(lang);
  const t = dict.franchise;
  const c = t.common;
  const a = t.area;
  const v = { name: lang === "mr" ? area.nameMr : area.name, price: t.price };
  const stores = await getLocations();
  const taken = isAreaTaken(area, stores);

  const faqs = [
    { question: fill(a.q1, v), answer: fill(taken ? a.a1Taken : a.a1Open, v) },
    { question: fill(a.q2, v), answer: fill(a.a2, v) },
    { question: a.q3, answer: a.a3 },
  ];

  const breadcrumb = generateBreadcrumbSchema([
    { name: c.home, url: absUrl(lang, "/") },
    { name: c.franchise, url: absUrl(lang, "/franchise") },
    { name: c.pune, url: absUrl(lang, "/franchise/pune") },
    { name: v.name, url: absUrl(lang, `/franchise/pune/${area.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(faqs.map((f, i) => ({ id: `${area.slug}-${i}`, category: "General" as const, ...f })));

  return (
    <div className="bg-white min-h-screen" lang={lang}>
      <FranchiseJsonLd lang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider ${
              taken ? "bg-slate-900/60 text-slate-200" : "bg-emerald-500 text-white"
            }`}
          >
            {taken ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            {taken ? a.taken : a.availableBadge}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {fill(a.h1, v)}
          </h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">
            {fill(taken ? a.leadTaken : a.leadOpen, v)}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton label={taken ? a.ctaTaken : fill(a.ctaOpen, v)} />
            <a
              href={whatsappLink(fill(a.waText, v))}
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
        <section>
          <h2 className="text-2xl font-black text-slate-900">{fill(a.about, v)}</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{lang === "mr" ? area.aboutMr : area.about}</p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            {a.aboutExtra}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900">{c.investment}</h2>
          <div className="mt-4"><PricingCards /></div>
          <p className="mt-2 text-xs font-semibold text-slate-500">{c.taxes}</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900">{c.faq}</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
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

        <nav aria-label={c.relatedAria} className="flex flex-wrap gap-4 text-sm font-bold text-sky-700">
          <Link href="/franchise/pune" className="hover:underline">{a.navPune}</Link>
          <Link href="/franchise/under-10-lakhs" className="hover:underline">{a.navUnder10}</Link>
          <Link href="/franchise/cost-in-india" className="hover:underline">{a.navCost}</Link>
        </nav>
      </div>
    </div>
  );
}
