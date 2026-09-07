"use client";

import {
  MapPin,
  Hammer,
  Users,
  UtensilsCrossed,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const supportPillars = [
  {
    icon: MapPin,
    tag: "A. Location Support",
    title: "Prime Site Intelligence",
    desc: "We analyze high-footfall commercial hubs, residential catchments, college zones, and competitor density to help you lock in a prime profitable store location.",
    points: ["Catchment footfall analysis", "Rent negotiation guidance", "Demographic density report"],
  },
  {
    icon: Hammer,
    tag: "B. Store Setup",
    title: "Turnkey Kitchen & Branding",
    desc: "Receive complete store layout blueprints, heavy-duty commercial equipment recommendations, illuminated LED signboards, and front counter setup.",
    points: ["Standardized QSR layout", "Commercial pizza oven setup", "Front counter & LED signage"],
  },
  {
    icon: Users,
    tag: "C. Staff Training",
    title: "Operational Excellence",
    desc: "Complete 360° hands-on training for your store manager and kitchen team. Covers recipe assembly, hygiene standards, POS cashiering & customer delight.",
    points: ["Hands-on kitchen SOPs", "Billing & POS training", "Food safety & hygiene certification"],
  },
  {
    icon: UtensilsCrossed,
    tag: "D. Fresh Raw Materials",
    title: "Central Supply Ecosystem",
    desc: "Never worry about sourcing quality ingredients. Enjoy centralized supply of pre-portioned dough mixes, signature pizza sauces, 100% mozzarella & boxes.",
    points: ["Centralized supply chain", "Consistency across outlets", "Bulk ingredient cost savings"],
  },
  {
    icon: Megaphone,
    tag: "E. Marketing Support",
    title: "Aggressive Local Marketing",
    desc: "We drive footfall and online orders to your store through targeted hyper-local digital ads, launch flyers, social media campaigns & aggregator listings.",
    points: ["Swiggy & Zomato onboarding", "Hyper-local social media ads", "Opening promotion flyers"],
  },
  {
    icon: TrendingUp,
    tag: "F. Business Growth Support",
    title: "Ongoing Sales Strategy",
    desc: "Get dedicated business guidance to maximize store revenues, launch seasonal combo offers, optimize food cost margins, and retain local repeat customers.",
    points: ["Weekly sales analysis", "Margin optimization tips", "Ongoing franchise helpline"],
  },
];

export default function SupportSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            Complete Franchise Ecosystem
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            You Don't Have to Figure It Out Alone.
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600 leading-relaxed">
            From your very first enquiry call to grand launch day and beyond, Pizza Mood provides hands-on 360° support every step of the way.
          </p>
        </div>

        {/* 6 Support Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportPillars.map((p, idx) => {
            const Icon = p.icon;
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
