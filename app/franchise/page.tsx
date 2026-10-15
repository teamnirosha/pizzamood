import { PRICING_HEADLINE } from "@/lib/pricing";
import { Metadata } from "next";
import { getFAQs } from "@/lib/db";
import WhyPizzaMood from "../components/WhyPizzaMood";
import FranchiseInvestmentSection from "../components/FranchiseInvestmentSection";
import LaunchTimeline from "../components/LaunchTimeline";
import SupportSection from "../components/SupportSection";
import HomeFAQ from "../components/HomeFAQ";
import UspTicker from "../components/UspTicker";
import FranchiseJsonLd from "../components/FranchiseJsonLd";

export const metadata: Metadata = {
  title: "Own a Pizza Mood Franchise | High Profit QSR Opportunity in India",
  description: `Start your own Pizza Mood franchise: ${PRICING_HEADLINE}. Includes location assistance, turnkey store setup, staff training & marketing support.`,
};

export default async function FranchisePage() {
  const faqs = await getFAQs();

  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd />
      {/* Franchise Page Hero */}
      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-20 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-100 backdrop-blur-sm">
            Pizza & Fast-Food Business Opportunity
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            Own a Pizza Mood. Build Your Business.
          </h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">
            India's accessible QSR franchise — {PRICING_HEADLINE} setup capital. Complete 360° operational guidance, site selection, staff training & central ingredient supply.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 pt-6"><UspTicker /></div>

      {/* Main Sections */}
      <FranchiseInvestmentSection />
      <WhyPizzaMood />
      <LaunchTimeline />
      <SupportSection />
      <HomeFAQ faqs={faqs} />
    </div>
  );
}
