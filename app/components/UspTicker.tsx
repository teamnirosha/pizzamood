"use client";

import { USPS } from "@/lib/usps";
import { useLocale } from "./LocaleProvider";

export default function UspTicker() {
  const { t } = useLocale();
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
      <p className="text-xs font-black uppercase tracking-wider text-red-600">{t.home.exclusivity}</p>
      <p className="mt-1 text-xs font-bold text-slate-700">{USPS.map((u) => t.home.usps[u.id]?.title ?? u.title).join(" · ")}</p>
    </div>
  );
}
