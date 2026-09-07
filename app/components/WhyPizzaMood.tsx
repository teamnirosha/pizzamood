"use client";

import {
  MapPin,
  Store,
  GraduationCap,
  Truck,
  Rocket,
  LineChart,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Find the Right Location",
    desc: "Our location team conducts catchment analysis, footfall studies, and competitor mapping to pick high-potential commercial sites.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "Set Up Your Store",
    desc: "Get standardized QSR store layout blueprints, equipment specifications, LED signages, and kitchen setup assistance.",
    icon: Store,
  },
  {
    num: "03",
    title: "Train Your Team",
    desc: "We provide comprehensive operational and kitchen training for your staff in product assembly, hygiene, POS, and customer service.",
    icon: GraduationCap,
  },
  {
    num: "04",
    title: "Supply Fresh Ingredients",
    desc: "Receive pre-portioned signature dough mixes, pizza sauces, 100% mozzarella cheese, and branded packaging direct from supply hubs.",
    icon: Truck,
  },
  {
    num: "05",
    title: "Launch Your Store",
    desc: "Execute targeted grand opening marketing campaigns, digital flyers, local influencer publicity, and online food aggregator setup.",
    icon: Rocket,
  },
  {
    num: "06",
    title: "Grow Your Sales",
    desc: "Continuous business guidance, seasonal combo promotions, store performance analytics, and local customer retention strategies.",
    icon: LineChart,
  },
];

export default function WhyPizzaMood() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-400 border border-sky-500/30">
            Operating System For Franchisees
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
            Why Choose Pizza Mood?
          </h2>
          <p className="mt-3 text-base text-slate-400 font-medium leading-relaxed">
            We don't just sell you a brand name. Pizza Mood equips you with an end-to-end operational playbook to build, run and scale your pizza store profitably.
          </p>
        </div>

        {/* Visual Horizontal Journey / Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
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
                  {s.title}
                </h3>

                <p className="mt-3 text-xs font-semibold text-slate-400 leading-relaxed">
                  {s.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-sky-400">
                  <span>Phase {idx + 1} Execution</span>
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
