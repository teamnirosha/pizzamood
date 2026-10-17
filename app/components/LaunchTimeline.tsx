"use client";

import { Clock, AlertCircle } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { fill } from "./homeI18n";

export default function LaunchTimeline() {
  const { t } = useLocale();
  const tl = t.home.timeline;
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            {tl.badge}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {tl.titlePre} <span className="text-sky-600">{tl.titleDays}</span>{tl.titlePost}
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600 leading-relaxed">
            {tl.sub}
          </p>
        </div>

        {/* Phase Timeline Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tl.phases.map((p, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl hover:border-sky-300"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">
                  <Clock className="h-3 w-3 text-yellow-400" /> {p.days}
                </span>
                <span className="text-xs font-extrabold text-slate-400">{fill(tl.step, { n: idx + 1 })}</span>
              </div>

              <h3 className="mt-4 text-base font-black text-slate-900 leading-snug">{p.title}</h3>
              <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 text-[11px] font-medium text-slate-500 text-center flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
          <span>
            {tl.disclaimer}
          </span>
        </div>

      </div>
    </section>
  );
}
