import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFAQs } from "@/lib/db";
import WhyPizzaMood from "@/app/components/WhyPizzaMood";
import FranchiseInvestmentSection from "@/app/components/FranchiseInvestmentSection";
import LaunchTimeline from "@/app/components/LaunchTimeline";
import SupportSection from "@/app/components/SupportSection";
import HomeFAQ from "@/app/components/HomeFAQ";
import UspTicker from "@/app/components/UspTicker";
import FranchiseJsonLd from "@/app/components/FranchiseJsonLd";
import Link from "@/app/components/LocalizedLink";
import { localizeFaqs } from "@/app/data/i18nHelpers";
import { getFranchisePages, fill } from "@/lib/franchisePages";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { hasLocale, LOCALES } from "@/lib/i18n";
import { alternatesFor, ogLocale, absUrl } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).franchise;
  const title = t.index.title;
  const description = fill(t.index.description, { price: t.price });
  return {
    title,
    description,
    keywords: lang === "mr" ? t.index.keywords : undefined,
    alternates: alternatesFor(lang, "/franchise"),
    openGraph: { title, description, url: absUrl(lang, "/franchise"), siteName: "Pizza Mood", locale: ogLocale(lang), type: "website" },
  };
}

export default async function FranchisePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.franchise;
  const faqs = localizeFaqs(await getFAQs(), lang, dict.pages);

  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd lang={lang} />
      {/* Franchise Page Hero */}
      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-20 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-100 backdrop-blur-sm">
            {t.index.badge}
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            {t.index.h1}
          </h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">
            {fill(t.index.lead, { price: t.price })}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 pt-6"><UspTicker /></div>

      {/* Main Sections */}
      <FranchiseInvestmentSection />
      <WhyPizzaMood />
      <LaunchTimeline />
      <SupportSection />
      <HomeFAQ faqs={faqs} />
      <nav aria-label={t.index.guidesAria} className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-lg font-black text-slate-900">{t.index.guides}</h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {getFranchisePages(lang).map((p) => (
            <li key={p.slug}>
              <Link href={`/franchise/${p.slug}`} className="text-sm font-bold text-sky-700 hover:underline">{p.kicker}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
