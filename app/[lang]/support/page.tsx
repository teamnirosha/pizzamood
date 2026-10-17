import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import SupportSection from "@/app/components/SupportSection";

export function generateStaticParams() {
  return [{ lang: "mr" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).pages;
  const m = t.support;
  
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    keywords: m.keywords || undefined,
    alternates: alternatesFor(lang, "/support"),
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function SupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).pages;
  const m = t.support;
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-red-600 to-amber-600 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-100 backdrop-blur-sm">
            {m.badge}
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
            {m.h1}
          </h1>
          <p className="mt-3 text-sm font-semibold text-red-50 max-w-xl mx-auto">
            {m.sub}
          </p>
        </div>
      </section>

      <SupportSection />
    </div>
  );
}
