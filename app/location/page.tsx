"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Search,
  Store,
} from "lucide-react";

type Outlet = {
  id: number;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapUrl: string;
  tags: string[];
};

const outlets: Outlet[] = [
  {
    id: 1,
    name: "Pizzaloot Kharadi",
    area: "Kharadi",
    address: "EON Free Zone Road, Kharadi, Pune, Maharashtra",
    phone: "+91 99999 99999",
    hours: "11:00 AM - 11:00 PM",
    image: "/images/locations/kharadi.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway", "Events"],
  },
  {
    id: 2,
    name: "Pizzaloot Viman Nagar",
    area: "Viman Nagar",
    address: "Viman Nagar Main Road, Pune, Maharashtra",
    phone: "+91 99999 99998",
    hours: "11:00 AM - 11:00 PM",
    image: "/images/locations/viman-nagar.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway"],
  },
  {
    id: 3,
    name: "Pizzaloot Hadapsar",
    area: "Hadapsar",
    address: "Magarpatta Road, Hadapsar, Pune, Maharashtra",
    phone: "+91 99999 99997",
    hours: "11:00 AM - 11:00 PM",
    image: "/images/locations/hadapsar.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway", "Events"],
  },
  {
    id: 4,
    name: "Pizzaloot Baner",
    area: "Baner",
    address: "Baner Road, Baner, Pune, Maharashtra",
    phone: "+91 99999 99996",
    hours: "11:00 AM - 11:00 PM",
    image: "/images/locations/baner.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway"],
  },
  {
    id: 5,
    name: "Pizzaloot Wakad",
    area: "Wakad",
    address: "Datta Mandir Road, Wakad, Pune, Maharashtra",
    phone: "+91 99999 99995",
    hours: "11:00 AM - 11:00 PM",
    image: "/images/locations/wakad.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway", "Events"],
  },
  {
    id: 6,
    name: "Pizzaloot Koregaon Park",
    area: "Koregaon Park",
    address: "North Main Road, Koregaon Park, Pune, Maharashtra",
    phone: "+91 99999 99994",
    hours: "11:00 AM - 11:30 PM",
    image: "/images/locations/koregaon-park.jpg",
    mapUrl: "https://www.google.com/maps",
    tags: ["Delivery", "Takeaway", "Events"],
  },
];

const areas = ["All", ...new Set(outlets.map((outlet) => outlet.area))];

export default function LocationsPage() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");

  const filteredOutlets = useMemo(() => {
    return outlets.filter((outlet) => {
      const matchesArea =
        selectedArea === "All" || outlet.area === selectedArea;

      const searchText = search.toLowerCase();

      const matchesSearch =
        outlet.name.toLowerCase().includes(searchText) ||
        outlet.area.toLowerCase().includes(searchText) ||
        outlet.address.toLowerCase().includes(searchText);

      return matchesArea && matchesSearch;
    });
  }, [search, selectedArea]);

  return (
    <main className="min-h-screen bg-[#fffaf3] text-zinc-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-100">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
              <MapPin className="h-4 w-4" />
              Pizzaloot in Pune
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              Find your
              <span className="block text-orange-500">
                nearest Pizzaloot.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Fresh pizzas, tasty sides and delicious combos are closer than
              you think. Find a Pizzaloot outlet near you and come grab your
              favourite slice.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat value={`${outlets.length}+`} label="Pune Outlets" />
            <Stat value="7 Days" label="Open Every Week" />
            <Stat value="Fresh" label="Made Daily" />
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="sticky top-0 z-20 border-b border-zinc-200 bg-[#fffaf3]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Pune area..."
                className="h-12 w-full rounded-full border border-zinc-200 bg-white pl-12 pr-5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Area Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    selectedArea === area
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outlets */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Outlets
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Pizza is never too far.
            </h2>
          </div>

          <p className="text-sm text-zinc-500">
            {filteredOutlets.length} outlet
            {filteredOutlets.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredOutlets.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOutlets.map((outlet) => (
              <OutletCard key={outlet.id} outlet={outlet} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <MapPin className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No outlet found
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Try searching for another Pune area.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedArea("All");
              }}
              className="mt-5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
            >
              View All Outlets
            </button>
          </div>
        )}
      </section>

      {/* Why Visit */}
      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                More Than Pizza
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Your local pizza spot.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-zinc-600">
                Whether you're grabbing dinner with friends, picking up a
                quick meal or planning something bigger, our outlets are
                designed to make getting great food simple.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-500"
              >
                Talk to Pizzaloot
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<Store className="h-5 w-5" />}
                title="Visit Us"
                text="Drop by your nearest outlet for fresh, hot food."
              />

              <FeatureCard
                icon={<Navigation className="h-5 w-5" />}
                title="Easy Directions"
                text="Find your outlet quickly with Google Maps."
              />

              <FeatureCard
                icon={<Clock3 className="h-5 w-5" />}
                title="Open Daily"
                text="We're here throughout the week for your cravings."
              />

              <FeatureCard
                icon={<Phone className="h-5 w-5" />}
                title="Need Help?"
                text="Call your local outlet for quick assistance."
              />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Can't find your area?
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Let us know where you want Pizzaloot next.
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              Have a suggestion, business enquiry or want to know more about
              our service? We'd love to hear from you.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-400"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function OutletCard({ outlet }: { outlet: Outlet }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-orange-100">
        <img
          src={outlet.image}
          alt={outlet.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/images/location-placeholder.jpg";
          }}
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-600 shadow-sm">
          Pune
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
              {outlet.area}
            </p>

            <h3 className="mt-1 text-xl font-black">
              {outlet.name}
            </h3>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <MapPin className="h-5 w-5" />
          </div>
        </div>

        {/* Address */}
        <div className="mt-5 flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

          <p className="text-sm leading-6 text-zinc-600">
            {outlet.address}
          </p>
        </div>

        {/* Hours */}
        <div className="mt-3 flex items-center gap-3">
          <Clock3 className="h-4 w-4 text-zinc-400" />

          <p className="text-sm text-zinc-600">
            {outlet.hours}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {outlet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          <a
            href={outlet.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            <Navigation className="h-4 w-4" />
            Directions
          </a>

          <a
            href={`tel:${outlet.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>

        </div>
      </div>
    </article>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
      <p className="text-2xl font-black text-orange-500">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-[#fffaf3] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
        {icon}
      </div>

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {text}
      </p>
    </div>
  );
}