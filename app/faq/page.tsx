import { Metadata } from "next";
import { getFAQs } from "@/lib/db";
import HomeFAQ from "../components/HomeFAQ";

export const metadata: Metadata = {
  title: "Pizza Mood Franchise FAQs | Costs, Requirements, Support & Setup",
  description: "Answers to common questions about starting a Pizza Mood franchise. Investment requirements, store launch timeline, location approval, staff training & marketing.",
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            Franchise Knowledge Base
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Franchise Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Everything you need to know about partnering with Pizza Mood.
          </p>
        </div>

        <HomeFAQ faqs={faqs} />

      </div>
    </div>
  );
}