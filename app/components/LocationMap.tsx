"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, Navigation, Phone, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import { OutletLocation } from "@/types";

interface LocationMapProps {
  locations: OutletLocation[];
  onSelectLocation?: (location: OutletLocation) => void;
  selectedLocationId?: string;
}

export default function LocationMap({
  locations,
  onSelectLocation,
  selectedLocationId,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-preference
  const leafletInstance = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [geoError, setGeoError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const cities = ["All", ...Array.from(new Set(locations.map((l) => l.city)))];

  const filteredLocations = locations.filter((loc) => {
    const matchesCity = selectedCity === "All" || loc.city === selectedCity;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    import("leaflet").then((L) => {
      if (!leafletInstance.current && mapRef.current) {
        const initialLat = locations[0]?.latitude || 18.5204;
        const initialLng = locations[0]?.longitude || 73.8567;

        const map = L.map(mapRef.current, {
          center: [initialLat, initialLng],
          zoom: 12,
          scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        leafletInstance.current = map;
      }

      const map = leafletInstance.current;
      if (!map) return;

      Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
      markersRef.current = {};

      const bounds = L.latLngBounds([]);

      filteredLocations.forEach((loc) => {
        const isSelected = loc.id === selectedLocationId;

        const customIcon = L.divIcon({
          className: "custom-pizza-marker-wrapper",
          html: `
            <div class="pizza-marker-pin ${isSelected ? "pin-animated" : ""}">
              🍕
            </div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 44],
          popupAnchor: [0, -40],
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="min-width: 220px; font-family: system-ui, sans-serif; padding: 4px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #009ad8; letter-spacing: 0.05em;">Pizza Mood Store</div>
            <h4 style="margin: 2px 0 6px 0; font-size: 15px; font-weight: 900; color: #0f172a;">${loc.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #4b5563; font-weight: 500;">${loc.address}</p>
            <div style="display: flex; gap: 8px; margin-bottom: 8px; font-size: 11px; font-weight: 700; color: #059669;">
              <span>• Open Now</span>
              <span style="color: #6b7280;">${loc.hours[0]?.openingTime || "11 AM"} - ${loc.hours[0]?.closingTime || "11 PM"}</span>
            </div>
            <a href="/locations/${loc.slug}" style="display: block; width: 100%; text-align: center; background: #009ad8; border: 1px solid #ead800; color: white; padding: 8px 0; border-radius: 8px; font-size: 12px; font-weight: 800; text-decoration: none;">View Store Page & Order &rarr;</a>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          if (onSelectLocation) onSelectLocation(loc);
        });

        markersRef.current[loc.id] = marker;
        bounds.extend([loc.latitude, loc.longitude]);
      });

      if (filteredLocations.length > 0 && map) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    });
  }, [filteredLocations, selectedLocationId]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        if (leafletInstance.current) {
          leafletInstance.current.setView([latitude, longitude], 13);
        }
      },
      () => {
        setIsLocating(false);
        setGeoError("Unable to retrieve your location. Please select a city manually.");
      }
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* Map Controls Header */}
      <div className="border-b border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by area, city or store name (e.g. Kharadi, Pune, Andheri)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {/* Filters & Near Me */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 focus:border-sky-500 focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  City: {c}
                </option>
              ))}
            </select>

            <button
              onClick={handleNearMe}
              disabled={isLocating}
              className="flex items-center gap-2 rounded-2xl bg-sky-500 border border-yellow-400 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-sky-500/20 transition hover:bg-sky-600 disabled:opacity-50"
            >
              <Navigation className="h-4 w-4" />
              {isLocating ? "Locating..." : "Find Pizza Mood Near Me"}
            </button>
          </div>
        </div>

        {geoError && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600">
            <ShieldAlert className="h-4 w-4" />
            <span>{geoError}</span>
          </div>
        )}
      </div>

      {/* Interactive Map Canvas */}
      <div className="relative h-[450px] w-full bg-slate-100">
        <div ref={mapRef} className="h-full w-full z-10" />
      </div>

      {/* Location Cards List below Map */}
      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 bg-white p-4">
        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-2">
          Showing {filteredLocations.length} Pizza Mood Franchise Outlets
        </p>

        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => {
              if (onSelectLocation) onSelectLocation(loc);
              if (leafletInstance.current) {
                leafletInstance.current.setView([loc.latitude, loc.longitude], 15);
                markersRef.current[loc.id]?.openPopup();
              }
            }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl transition hover:bg-slate-50 cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🍕</span>
                <h4 className="text-sm font-black text-slate-900">{loc.name}</h4>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                  Open Now
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-600 line-clamp-1">{loc.address}</p>
              <div className="mt-1 flex items-center gap-4 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-sky-500" /> {loc.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-amber-500" /> {loc.hours[0]?.openingTime} - {loc.hours[0]?.closingTime}
                </span>
              </div>
            </div>

            <Link
              href={`/locations/${loc.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-3.5 py-2 text-xs font-extrabold text-sky-600 hover:bg-sky-100 transition shrink-0"
            >
              View Store <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}

        {filteredLocations.length === 0 && (
          <div className="py-8 text-center text-sm font-semibold text-slate-500">
            No outlets found matching "{searchQuery}". Want to open a Pizza Mood franchise in this location?
          </div>
        )}
      </div>
    </div>
  );
}
