import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import InvestmentSection from "@/app/components/InvestmentSection";
import PricingCards from "@/app/components/PricingCards";
import UspTicker from "@/app/components/UspTicker";
import FranchiseJsonLd from "@/app/components/FranchiseJsonLd";
import { fill, headlineOf, pricingVars } from "@/app/data/i18nHelpers";

export function generateStaticParams() {
  return [{ lang: "mr" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).pages;
  const m = t.investment;
  const v = pricingVars(t);
  return {
    title: fill(m.metaTitle, v),
    description: fill(m.metaDesc, v),
    keywords: m.keywords || undefined,
    alternates: alternatesFor(lang, "/investment"),
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function InvestmentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).pages;
  const m = t.investment;
  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd lang={lang} />
      <section className="bg-slate-900 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-400 border border-amber-500/30">
            {m.badge}
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
            {headlineOf(t)}*
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-400 max-w-xl mx-auto">
            {m.sub}
          </p>
          <div className="mx-auto mt-6 max-w-xl"><PricingCards /></div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 pt-6"><UspTicker /></div>

      <InvestmentSection />
    </div>
  );
}
