import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { Metadata } from "next";
import Link from "@/app/components/LocalizedLink";
import { ShieldCheck, Lock, Mail, ArrowLeft, FileText } from "lucide-react";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).legal.privacy;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.metaKeywords,
    alternates: alternatesFor(lang, "/privacy-policy"),
    openGraph: { title: t.metaTitle, description: t.metaDescription, locale: ogLocale(lang) },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).legal.privacy;
  const lastUpdated = t.lastUpdated;

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            <ShieldCheck className="h-4 w-4" /> {t.badge}
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
              {t.s1p1a}{" "}
              <Link href="/" className="text-sky-600 font-bold hover:underline">
                pizzamood.in
              </Link>
              {t.s1p1b}
            </p>
            <p className="mt-3">
              {t.s1p2}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s2Title}</h2>
            <p>{t.s2Intro}</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 font-medium text-slate-600">
              <li><strong>{t.s2l1Label}</strong> {t.s2l1}</li>
              <li><strong>{t.s2l2Label}</strong> {t.s2l2}</li>
              <li><strong>{t.s2l3Label}</strong> {t.s2l3}</li>
              <li><strong>{t.s2l4Label}</strong> {t.s2l4}</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s3Title}</h2>
            <p>{t.s3Intro}</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 font-medium text-slate-600">
              <li>{t.s3l1}</li>
              <li>{t.s3l2}</li>
              <li>{t.s3l3}</li>
              <li>{t.s3l4}</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s4Title}</h2>
            <p>
              {t.s4p}
            </p>
            <div className="mt-4 rounded-2xl bg-sky-50 border border-sky-200 p-4 text-xs font-semibold text-sky-900">
              <strong>{t.s4NoteLabel}</strong> {t.s4Note}
            </div>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s5Title}</h2>
            <p>
              {t.s5p}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s6Title}</h2>
            <p>
              {t.s6p1}
            </p>
            <p className="mt-3">
              {t.s6p2a} <strong>{t.s6Subject}</strong> {t.s6p2b}{" "}
              <a href="mailto:info@pizzamood.in" className="text-sky-600 font-bold hover:underline">
                info@pizzamood.in
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900 mb-2">{t.s7Title}</h2>
            <p>{t.s7Intro}</p>
            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 text-xs font-semibold text-slate-700">
              <p><strong>{t.s7Name}</strong></p>
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
