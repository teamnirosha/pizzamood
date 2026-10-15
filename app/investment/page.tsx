import { Metadata } from "next";
import InvestmentSection from "../components/InvestmentSection";
import PricingCards from "@/app/components/PricingCards";
import UspTicker from "@/app/components/UspTicker";
import FranchiseJsonLd from "@/app/components/FranchiseJsonLd";
import { MODEL_BY_ID, PRICING_HEADLINE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: `Pizza Mood Franchise Cost & Investment Breakdown | ${PRICING_HEADLINE}`,
  description: `Detailed itemized cost structure for starting a Pizza Mood franchise. Transparent setup capital breakdown for the Kiosk format (${MODEL_BY_ID.kiosk.lakh}) and the Cafe format (${MODEL_BY_ID.cafe.lakh}).`,
};

export default async function InvestmentPage() {
  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd />
      <section className="bg-slate-900 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-400 border border-amber-500/30">
            Transparent Financial Structure
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
            {PRICING_HEADLINE}*
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-400 max-w-xl mx-auto">
            No hidden royalty surprises. Itemized capital requirements engineered for high ROI in Indian tier-1, tier-2 and tier-3 cities.
          </p>
          <div className="mx-auto mt-6 max-w-xl"><PricingCards /></div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 pt-6"><UspTicker /></div>

      <InvestmentSection />
    </div>
  );
}
