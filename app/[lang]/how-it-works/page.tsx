import { Metadata } from "next";
import { fill } from "@/app/data/i18nHelpers";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { PhoneCall, MapPin, Store, GraduationCap, Rocket } from "lucide-react";

const icons = [PhoneCall, PhoneCall, MapPin, Store, Store, GraduationCap, Rocket];

export function generateStaticParams() {
  return [{ lang: "mr" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).pages;
  const m = t.howItWorks;
  return {
    title: m.metaTitle,
    description: m.metaDesc,
    keywords: m.keywords || undefined,
    alternates: alternatesFor(lang, "/how-it-works"),
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).pages;
  const h = t.howItWorks;
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            {h.badge}
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {h.h1}
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            {h.sub}
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-red-200 hidden md:block" />

          <div className="space-y-8">
            {h.steps.map((s, i) => {
              const Icon = icons[i];
              const step = `0${i + 1}`;
              return (
                <div
                  key={step}
                  className="relative flex flex-col md:flex-row items-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-xl hover:border-red-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white font-black text-xl shadow-lg shadow-red-600/30 shrink-0 z-10">
                    {step}
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
                      {fill(h.phase, { n: i + 1 })}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{s.title}</h3>
                    <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed max-w-2xl">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}