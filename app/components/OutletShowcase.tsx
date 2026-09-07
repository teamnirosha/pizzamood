"use client";

import Link from "next/link";
import { Phone, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { OutletLocation } from "@/types";

interface OutletShowcaseProps {
  locations: OutletLocation[];
}

export default function OutletShowcase({ locations }: OutletShowcaseProps) {
  const featured = locations.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
              Verified Outlets
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Pizza Mood Is Already Growing.
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-600 max-w-xl">
              Explore active Pizza Mood franchise locations serving thousands of happy pizza lovers every day.
            </p>
          </div>

          <Link
            href="/locations"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black text-white hover:bg-sky-500 transition shrink-0"
          >
            Explore All Locations Directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Location Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((loc) => (
            <div
              key={loc.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image Header */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={loc.images[0]?.url || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"}
                  alt={loc.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-900 backdrop-blur-sm">
                  <span>🍕</span> {loc.area}, {loc.city}
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase text-white shadow-md">
                  Active Outlet
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900">{loc.name}</h3>
                <p className="mt-2 text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                  {loc.shortDescription}
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>{loc.hours[0]?.openingTime} - {loc.hours[0]?.closingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-sky-500 shrink-0" />
                    <a href={`tel:${loc.phone}`} className="hover:underline">{loc.phone}</a>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="flex-1 text-center rounded-xl bg-sky-500 border border-yellow-400 py-3 text-xs font-extrabold text-white shadow-md shadow-sky-500/20 hover:bg-sky-600 transition"
                  >
                    View Store Page
                  </Link>

                  <a
                    href={`https://wa.me/${loc.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(loc.name)},%20I'd%20like%20to%20order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition shrink-0"
                    title="WhatsApp Outlet"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
