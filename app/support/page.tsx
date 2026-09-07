import { Metadata } from "next";
import SupportSection from "../components/SupportSection";

export const metadata: Metadata = {
  title: "360° Franchise Support Ecosystem | Pizza Mood",
  description: "Explore the end-to-end support Pizza Mood offers: location selection, kitchen setup, staff SOP training, central raw material supply & digital marketing.",
};

export default function SupportPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-red-600 to-amber-600 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-100 backdrop-blur-sm">
            Franchisee Operational Safety Net
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
            360° Support: Before, During & After Launch
          </h1>
          <p className="mt-3 text-sm font-semibold text-red-50 max-w-xl mx-auto">
            We partner with you to ensure your store operates smoothly, maintains strict food quality standards, and drives steady repeat sales.
          </p>
        </div>
      </section>

      <SupportSection />
    </div>
  );
}
