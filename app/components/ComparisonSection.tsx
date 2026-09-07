"use client";

import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

const comparisons = [
  {
    feature: "Capital Investment Required",
    pizzaMood: "Starting from accessible ₹4 Lakh setup capital",
    other: "₹25–50 Lakhs for traditional dining restaurant",
  },
  {
    feature: "Operational Setup & Playbook",
    pizzaMood: "360° step-by-step store setup & kitchen training",
    other: "High risk trial & error with zero guidance",
  },
  {
    feature: "Brand & Menu System",
    pizzaMood: "Established high-margin pizza & fast food menu",
    other: "Building recipe standards & brand identity from scratch",
  },
  {
    feature: "Raw Material Supply",
    pizzaMood: "Centralized supply chain for consistent dough & sauce",
    other: "Negotiating with multiple unverified local vendors",
  },
  {
    feature: "Customer Acquisition",
    pizzaMood: "Proven local digital marketing & aggregator launch",
    other: "Expensive trial marketing with unknown ROI",
  },
  {
    feature: "Store Launch Speed",
    pizzaMood: "Target store launch in as little as 30 days*",
    other: "6 to 12 months long setup timelines",
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-yellow-400/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-yellow-400 border border-yellow-400/30">
            Smart Entrepreneurship
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
            Why Franchisees Choose Pizza Mood
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-400 leading-relaxed">
            See how our streamlined franchise model lowers your financial risk while maximizing your speed to market.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
          <div className="grid grid-cols-12 bg-slate-900/90 p-4 sm:p-6 border-b border-slate-800 text-xs font-black uppercase tracking-wider">
            <div className="col-span-4 text-slate-400">Opportunity Metric</div>
            <div className="col-span-4 text-sky-400 flex items-center gap-1.5 font-black">
              <Sparkles className="h-4 w-4 text-yellow-400" /> PIZZA MOOD FRANCHISE
            </div>
            <div className="col-span-4 text-slate-400">TRADITIONAL RESTAURANT / ALONE</div>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs font-medium">
            {comparisons.map((c, i) => (
              <div key={i} className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-slate-900/40 transition">
                <div className="col-span-4 font-extrabold text-white text-sm pr-2">{c.feature}</div>
                
                <div className="col-span-4 flex items-center gap-2 text-sky-400 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>{c.pizzaMood}</span>
                </div>

                <div className="col-span-4 flex items-center gap-2 text-slate-400 text-xs">
                  <XCircle className="h-4 w-4 text-slate-600 shrink-0" />
                  <span>{c.other}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
