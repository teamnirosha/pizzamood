"use client";

import { MODELS } from "@/lib/pricing";
import { useLocale } from "./LocaleProvider";
import { modelLakh } from "./homeI18n";

export default function PricingCards() {
  const { t } = useLocale();
  const p = t.home.pricing;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {MODELS.map((m) => (
        <div key={m.id} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-xl shadow-amber-500/10">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{p.models[m.id]} {p.modelSuffix}</div>
          <div className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{m.formattedTotal}</div>
          <div className="mt-1 text-xs font-bold text-sky-600">{p.totalInvestment} ({modelLakh(t, m)})</div>
        </div>
      ))}
    </div>
  );
}
