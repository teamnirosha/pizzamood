"use client";

import {
  MapPin,
  Hammer,
  Users,
  UtensilsCrossed,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { useLocale } from "./LocaleProvider";

const ICONS = [MapPin, Hammer, Users, UtensilsCrossed, Megaphone, TrendingUp];
export default function SupportSection() {
  const { t } = useLocale();
  const s = t.home.support;
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            {s.badge}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {s.title}
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600 leading-relaxed">
            {s.sub}
          </p>
        </div>

        {/* 6 Support Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {s.pillars.map((p, idx) => {
            const Icon = ICONS[idx];
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm transition hover:border-sky-300 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-sky-600">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">{p.desc}</p>

                <ul className="mt-6 space-y-2 border-t border-slate-200 pt-4">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
