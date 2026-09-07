import { Metadata } from "next";
import { getSiteSettings, getFAQs } from "@/lib/db";
import WhyPizzaMood from "../components/WhyPizzaMood";
import InvestmentSection from "../components/InvestmentSection";
import LaunchTimeline from "../components/LaunchTimeline";
import SupportSection from "../components/SupportSection";
import HomeFAQ from "../components/HomeFAQ";

export const metadata: Metadata = {
  title: "Own a Pizza Mood Franchise | High Profit QSR Opportunity in India",
  description: "Start your own Pizza Mood franchise with an investment starting from ₹4 Lakh. Includes location assistance, turnkey store setup, staff training & marketing support.",
};

export default async function FranchisePage() {
  const settings = await getSiteSettings();
  const faqs = await getFAQs();

  return (
    <div className="bg-white min-h-screen">
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
            India's accessible QSR franchise starting from ₹4 Lakh setup capital. Complete 360° operational guidance, site selection, staff training & central ingredient supply.
          </p>
        </div>
      </section>

      {/* Main Sections */}
      <InvestmentSection breakdown={settings.investmentBreakdown} disclaimer={settings.disclaimerText} />
      <WhyPizzaMood />
      <LaunchTimeline />
      <SupportSection />
      <HomeFAQ faqs={faqs} />
    </div>
  );
}
