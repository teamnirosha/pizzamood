import { Metadata } from "next";
import { getLocations } from "@/lib/db";
import LocationMap from "../components/LocationMap";
import Link from "next/link";
import { generateLocationListSchema } from "@/lib/seo";
import UspTicker from "../components/UspTicker";

export const metadata: Metadata = {
  title: "Pizza Mood Outlets Near You | Store Locations, Timings & Contact",
  description: "Find your nearest Pizza Mood: pizza, burgers, momos and cafe outlets across Pune with timings, directions and phone numbers.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <UspTicker />
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            Store Directory & Map
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Find a Pizza Mood Near You
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Explore Pizza Mood outlets across India. Check store timings, directions, contact numbers and local delivery options.
          </p>
        </div>

        {/* Interactive OpenStreetMap */}
        <LocationMap locations={locations} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocationListSchema("Pizza Mood outlets", locations)) }}
        />
        <nav aria-label="All Pizza Mood outlets" className="mt-12">
          <h2 className="text-xl font-black text-slate-900">Pizza Mood Outlets in Pune</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-sky-700 sm:grid-cols-3 lg:grid-cols-4">
            {locations.map((l) => (
              <li key={l.id}>
                <Link href={`/locations/${l.slug}`} className="hover:underline">
                  Pizza in {l.area}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  );
}
