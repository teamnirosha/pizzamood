import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { pricingHeadline } from "@/lib/pricing";
import { fmt } from "@/lib/fmt";
import { Metadata } from "next";
import Link from "@/app/components/LocalizedLink";
import { FileText, ShieldAlert, ArrowLeft, Building2 } from "lucide-react";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).legal.terms;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.metaKeywords,
    alternates: alternatesFor(lang, "/terms"),
    openGraph: { title: t.metaTitle, description: t.metaDescription, locale: ogLocale(lang) },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).legal.terms;
  const lastUpdated = t.lastUpdated;

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-800">
            <FileText className="h-4 w-4" /> {t.badge}
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            {t.lastUpdatedLabel} {lastUpdated} • Pizza Mood Franchise India
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl space-y-8 text-sm leading-relaxed text-slate-700">
          
          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s1Title}</h2>
            <p>
              {t.s1pa}
              <Link href="/" className="text-sky-600 font-bold hover:underline">
                pizzamood.in
              </Link>
              {t.s1pb}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s2Title}</h2>
            <p>
              {fmt(t.s2p, { pricing: pricingHeadline(lang) })}
            </p>
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" /> {t.s2NoteLabel}
              </div>
              <p>
                {t.s2Note}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s3Title}</h2>
            <p>
              {t.s3p1}
            </p>
            <p className="mt-3">
              {t.s3p2}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s4Title}</h2>
            <p>
              {t.s4p}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s5Title}</h2>
            <p>
              {t.s5p1}
            </p>
            <p className="mt-3">
              {t.s5p2}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s6Title}</h2>
            <p>
              {t.s6p}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s7Title}</h2>
            <p>
              {t.s7pa} <strong>{t.s7Place}</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s8Title}</h2>
            <p>{t.s8Intro}</p>
            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 text-xs font-semibold text-slate-700">
              <p><strong>{t.s8Name}</strong></p>
              <p>{t.addressLabel} {t.address}</p>
              <p>{t.emailLabel} <a href="mailto:info@pizzamood.in" className="text-sky-600 hover:underline">info@pizzamood.in</a> | <a href="mailto:pizzamoodho@gmail.com" className="text-slate-500 hover:underline">pizzamoodho@gmail.com</a></p>
              <p>{t.helpline} +91 90969 70369</p>
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-100 transition"
          >
            <ArrowLeft className="h-4 w-4" /> {t.back}
          </Link>
        </div>

      </div>
    </div>
  );
}
