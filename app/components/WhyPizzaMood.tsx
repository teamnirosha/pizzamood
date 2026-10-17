"use client";

import {
  MapPin,
  Store,
  GraduationCap,
  Truck,
  Rocket,
  LineChart,
} from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { fill } from "./homeI18n";

const steps = [
  {
    num: "01",
    icon: MapPin,
  },
  {
    num: "02",
    icon: Store,
  },
  {
    num: "03",
    icon: GraduationCap,
  },
  {
    num: "04",
    icon: Truck,
  },
  {
    num: "05",
    icon: Rocket,
  },
  {
    num: "06",
    icon: LineChart,
  },
];

export default function WhyPizzaMood() {
  const { t } = useLocale();
  const w = t.home.why;
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-400 border border-sky-500/30">
            {w.badge}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
            {w.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 font-medium leading-relaxed">
            {w.sub}
          </p>
        </div>

        {/* Visual Horizontal Journey / Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const c = w.steps[idx];
            return (
              <div
                key={s.num}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1"
              >
                {/* Background Step Number */}
                <div className="absolute top-4 right-6 text-6xl font-black text-slate-800/40 transition group-hover:text-sky-500/20">
                  {s.num}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 group-hover:bg-sky-500 group-hover:text-white transition">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-white group-hover:text-sky-400 transition">
                  {c.title}
                </h3>

                <p className="mt-3 text-xs font-semibold text-slate-400 leading-relaxed">
                  {c.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-sky-400">
                  <span>{fill(w.phase, { n: idx + 1 })}</span>
                  <span className="h-1 w-8 rounded-full bg-sky-500/40" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
