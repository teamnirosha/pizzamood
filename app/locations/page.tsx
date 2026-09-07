import { Metadata } from "next";
import { getLocations } from "@/lib/db";
import LocationMap from "../components/LocationMap";

export const metadata: Metadata = {
  title: "Pizza Mood Outlets Near You | Store Locations, Timings & Contact",
  description: "Find your nearest Pizza Mood pizza store. Explore outlet locations in Pune, Mumbai, Thane & more with store hours, directions, numbers & food delivery options.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
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

      </div>
    </div>
  );
}
