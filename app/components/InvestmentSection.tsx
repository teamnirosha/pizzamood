"use client";

import { useState } from "react";
import { CheckCircle, Info, ArrowRight, Calculator } from "lucide-react";
import FranchiseModal from "./FranchiseModal";

interface InvestmentSectionProps {
  breakdown?: { category: string; amount: string; details: string }[];
  disclaimer?: string;
}

export default function InvestmentSection({ breakdown, disclaimer }: InvestmentSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const defaultBreakdown = [
    { category: "Brand & Franchise Rights Fee", amount: "₹1,50,000", details: "Trademark usage, operational manual, onboarding rights & store setup clearance" },
    { category: "Kitchen Equipment & Appliances", amount: "₹1,20,000", details: "Heavy-duty commercial pizza oven, refrigeration unit, prep tables & smallwares" },
    { category: "Store Interior & Illuminated Signage", amount: "₹70,000", details: "Standardized front counter, illuminated LED signboards, digital menu boards" },
    { category: "Initial Raw Material & Packaging Inventory", amount: "₹35,000", details: "Signature dough mix, pizza sauces, 100% mozzarella cheese & delivery boxes" },
    { category: "Launch Marketing & Cloud POS Software", amount: "₹25,000", details: "Digital campaign, flyers, POS software license, staff uniforms" },
  ];

  const list = breakdown && breakdown.length > 0 ? breakdown : defaultBreakdown;

  return (
    <section id="opportunity" className="py-20 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block rounded-full bg-yellow-400 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm">
              Low Entry Barrier
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Start With ₹4 Lakh. <br />
              <span className="text-sky-500">Build Something of Your Own.</span>
            </h2>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              We engineered the Pizza Mood franchise model to break the myth that running a successful QSR business requires ₹25–50 Lakhs. By eliminating unnecessary corporate overhead, aspiring entrepreneurs can launch a high-return pizza store starting from an accessible ₹4 Lakh entry point.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Compact Store Formats</h4>
                  <p className="text-xs text-slate-500 font-medium">Requires only 120 - 250 sq. ft. commercial space, lowering monthly rent burden.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">High Profit Margin Items</h4>
                  <p className="text-xs text-slate-500 font-medium">Enjoy gross product margins of 60%–70% on pizza, sides, and beverage combos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Streamlined Staffing</h4>
                  <p className="text-xs text-slate-500 font-medium">Operate efficiently with just 2–3 trained team members.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2 rounded-2xl bg-sky-500 border-2 border-yellow-400 px-7 py-4 text-sm font-black text-white shadow-xl shadow-sky-500/30 transition hover:bg-sky-600"
              >
                Get Complete Investment Details
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Table Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Indicative ₹4 Lakh Setup Breakdown</h3>
                  <p className="text-xs font-semibold text-slate-500">Standard Takeaway QSR Format</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <Calculator className="h-5 w-5" />
                </div>
              </div>

              {/* Table list */}
              <div className="divide-y divide-slate-200 py-4">
                {list.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3.5">
                    <div className="max-w-md pr-4">
                      <span className="text-sm font-extrabold text-slate-900 block">{item.category}</span>
                      <span className="text-xs font-medium text-slate-500 block">{item.details}</span>
                    </div>
                    <span className="text-base font-black text-sky-600 shrink-0">{item.amount}</span>
                  </div>
                ))}
              </div>

              {/* Disclaimer block */}
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-[11px] font-medium text-amber-900 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    {disclaimer ||
                      "*Investment requirements may vary based on store format, location size, city tier, site readiness and local cost factors. Contact Pizza Mood for customized location assessment."}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <FranchiseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
