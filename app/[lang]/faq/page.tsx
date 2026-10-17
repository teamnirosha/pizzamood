import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { getFAQs } from "@/lib/db";
import HomeFAQ from "@/app/components/HomeFAQ";
import { localizeFaqs } from "@/app/data/i18nHelpers";

export function generateStaticParams() {
  return [{ lang: "mr" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).pages;
  const m = t.faq;
  
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    keywords: m.keywords || undefined,
    alternates: alternatesFor(lang, "/faq"),
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).pages;
  const m = t.faq;
  // FAQ text lives in the DB (English); Marathi comes from the dictionary, so the FAQPage JSON-LD matches the page language.
  const faqs = localizeFaqs(await getFAQs(), lang, t);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            {m.badge}
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {m.h1}
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            {m.sub}
          </p>
        </div>

        <HomeFAQ faqs={faqs} />

      </div>
    </div>
  );
}
