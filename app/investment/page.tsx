import { Metadata } from "next";
import { getSiteSettings } from "@/lib/db";
import InvestmentSection from "../components/InvestmentSection";

export const metadata: Metadata = {
  title: "Pizza Mood Franchise Cost & Investment Breakdown | From ₹4 Lakh",
  description: "Detailed itemized cost structure for starting a Pizza Mood franchise. Transparent setup capital breakdown for kitchen equipment, franchise fee, inventory & marketing.",
};

export default async function InvestmentPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-900 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-400 border border-amber-500/30">
            Transparent Financial Structure
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
            Start Your Pizza Business From ₹4 Lakh*
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-400 max-w-xl mx-auto">
            No hidden royalty surprises. Itemized capital requirements engineered for high ROI in Indian tier-1, tier-2 and tier-3 cities.
          </p>
        </div>
      </section>

      <InvestmentSection breakdown={settings.investmentBreakdown} disclaimer={settings.disclaimerText} />
    </div>
  );
}
