"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FAQItem } from "@/types";
import { generateFAQSchema } from "@/lib/seo";

interface HomeFAQProps {
  faqs: FAQItem[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const schemaData = generateFAQSchema(faqs);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      
      {/* Inject FAQ JSON-LD Schema for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-slate-900 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-yellow-400">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need To Know
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Got questions about starting your Pizza Mood franchise? Here are straightforward answers.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-sky-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-extrabold text-slate-900 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-sky-500 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-5 text-xs font-medium text-slate-700 leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-xs font-black text-sky-600 hover:text-sky-700 uppercase tracking-wider"
          >
            View All Franchise FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
