"use client";

import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
            Franchise Partner Stories
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Hear From Pizza Mood Franchisees
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Real experiences from entrepreneurs who launched their pizza business with Pizza Mood.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-xl hover:border-amber-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-red-400/30 mb-2" />

                <p className="text-xs font-medium text-slate-700 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
                <img
                  src={t.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
