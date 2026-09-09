"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, Navigation, Phone, Clock, ArrowRight, ShieldAlert, X, MousePointerClick, MapPin } from "lucide-react";
import type * as LeafletType from "leaflet";
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
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<LeafletType.Map | null>(null);
  const leafletModuleRef = useRef<typeof LeafletType | null>(null);
  const markersRef = useRef<Record<string, LeafletType.Marker>>({});
  const userMarkerRef = useRef<LeafletType.Marker | null>(null);

  const [isMapActive, setIsMapActive] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState<string | null>(selectedLocationId || null);
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

  // Native Leaflet enable interaction helper
  const activateMap = useCallback(() => {
    setIsMapActive(true);
    const map = leafletMapRef.current;
    if (map) {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.keyboard.enable();
      map.touchZoom.enable();
    }
  }, []);

  // Native Leaflet disable interaction helper
  const deactivateMap = useCallback(() => {
    setIsMapActive(false);
    const map = leafletMapRef.current;
    if (map) {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.keyboard.disable();
      map.touchZoom.disable();
    }
  }, []);

  // Update selected location helper & flyTo animation
  const focusLocation = useCallback(
    (loc: OutletLocation, zoom = 15) => {
      activateMap();
      setSelectedLocId(loc.id);
      if (onSelectLocation) {
        onSelectLocation(loc);
      }

      const map = leafletMapRef.current;
      const L = leafletModuleRef.current;

      if (map) {
        map.flyTo([loc.latitude, loc.longitude], zoom, {
          duration: 1.2,
        });
      }

      if (L) {
        Object.entries(markersRef.current).forEach(([id, marker]) => {
          const isSelected = id === loc.id;
          marker.setIcon(
            L.divIcon({
              className: "custom-pizza-marker-wrapper",
              html: `
                <div class="pizza-marker-pin ${isSelected ? "pin-active-selected" : ""}">
                  🍕
                </div>
              `,
              iconSize: isSelected ? [52, 52] : [44, 44],
              iconAnchor: isSelected ? [26, 52] : [22, 44],
              popupAnchor: [0, isSelected ? -48 : -40],
            })
          );
          if (isSelected) {
            marker.openPopup();
          }
        });
      }
    },
    [activateMap, onSelectLocation]
  );

  // Sync prop changes
  useEffect(() => {
    if (selectedLocationId && selectedLocationId !== selectedLocId) {
      const match = locations.find((l) => l.id === selectedLocationId);
      if (match) {
        focusLocation(match);
      }
    }
  }, [selectedLocationId, locations, selectedLocId, focusLocation]);

  // Click outside detection: deactivates the map immediately
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (mapWrapperRef.current && !mapWrapperRef.current.contains(e.target as Node)) {
        deactivateMap();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [deactivateMap]);

  // Leaflet map initialization
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      leafletModuleRef.current = L;

      if (!leafletMapRef.current) {
        const initialLat = locations[0]?.latitude || 18.5204;
        const initialLng = locations[0]?.longitude || 73.8567;

        // Initialize strictly with all interactions disabled
        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 12,
          minZoom: 5,
          maxZoom: 18,
          scrollWheelZoom: false,
          dragging: false,
          doubleClickZoom: false,
          keyboard: false,
          touchZoom: false,
          zoomControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          minZoom: 5,
        }).addTo(map);

        // Clicking anywhere directly on the map canvas activates it
        map.on("click", () => {
          activateMap();
        });

        leafletMapRef.current = map;
      }

      const map = leafletMapRef.current;
      if (!map) return;

      // Remove existing markers
      Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
      markersRef.current = {};

      const bounds = L.latLngBounds([]);

      filteredLocations.forEach((loc) => {
        const isSelected = loc.id === selectedLocId;

        const customIcon = L.divIcon({
          className: "custom-pizza-marker-wrapper",
          html: `
            <div class="pizza-marker-pin ${isSelected ? "pin-active-selected" : ""}">
              🍕
            </div>
          `,
          iconSize: isSelected ? [52, 52] : [44, 44],
          iconAnchor: isSelected ? [26, 52] : [22, 44],
          popupAnchor: [0, isSelected ? -48 : -40],
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="min-width: 230px; font-family: system-ui, sans-serif; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #009ad8; letter-spacing: 0.05em;">Pizza Mood Outlet</span>
              <span style="background: #ecfdf5; color: #047857; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 9999px;">● Open Now</span>
            </div>
            <h4 style="margin: 2px 0 6px 0; font-size: 15px; font-weight: 900; color: #0f172a; line-height: 1.2;">${loc.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #4b5563; font-weight: 500; line-height: 1.35;">${loc.address}</p>
            <div style="display: flex; gap: 8px; margin-bottom: 10px; font-size: 11px; font-weight: 700; color: #475569;">
              <span>🕒 ${loc.hours[0]?.openingTime || "11 AM"} - ${loc.hours[0]?.closingTime || "11 PM"}</span>
            </div>
            <a href="/locations/${loc.slug}" style="display: block; width: 100%; text-align: center; background: #009ad8; border: 1.5px solid #ead800; color: white; padding: 8px 0; border-radius: 10px; font-size: 12px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 8px -2px rgba(0, 154, 216, 0.4);">
              View Store Page & Menu &rarr;
            </a>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          focusLocation(loc, 15);
        });

        markersRef.current[loc.id] = marker;
        bounds.extend([loc.latitude, loc.longitude]);
      });

      // Fit bounds if no individual store is selected
      if (filteredLocations.length > 0 && !selectedLocId) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [filteredLocations, selectedLocId, activateMap, focusLocation, locations]);

  // Clean up map on unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Find Pizza Mood Near Me handler
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
        activateMap();

        const map = leafletMapRef.current;
        const L = leafletModuleRef.current;

        if (!map || !L) return;

        // Display user location pin
        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }

        const userIcon = L.divIcon({
          className: "user-location-marker-wrapper",
          html: `<div class="user-location-pin" title="Your Location"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const uMarker = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: system-ui, sans-serif; font-size: 12px; font-weight: 800; color: #1e3a8a; padding: 2px;">📍 You Are Here</div>`
          );
        userMarkerRef.current = uMarker;

        // Find nearest outlet using Haversine formula
        if (locations.length > 0) {
          let nearestLoc = locations[0];
          let shortestDist = Number.MAX_VALUE;

          locations.forEach((loc) => {
            const dLat = ((loc.latitude - latitude) * Math.PI) / 180;
            const dLon = ((loc.longitude - longitude) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((latitude * Math.PI) / 180) *
                Math.cos((loc.latitude * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            if (dist < shortestDist) {
              shortestDist = dist;
              nearestLoc = loc;
            }
          });

          focusLocation(nearestLoc, 15);
        } else {
          map.flyTo([latitude, longitude], 14, { duration: 1.2 });
        }
      },
      () => {
        setIsLocating(false);
        setGeoError("Unable to retrieve your location. Please select a store manually from the list.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div
      ref={mapWrapperRef}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
    >
      {/* Map Controls Header */}
      <div className="border-b border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by area, city or store name (e.g. Kharadi, Pune, Warje)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
            />
          </div>

          {/* Filters & Near Me */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocId(null);
              }}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-800 focus:border-sky-500 focus:outline-none shadow-sm cursor-pointer"
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
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-sky-500 border border-yellow-400 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-sky-500/20 transition hover:bg-sky-600 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Navigation className={`h-4 w-4 ${isLocating ? "animate-spin" : ""}`} />
              {isLocating ? "Locating Nearest..." : "Find Pizza Mood Near Me"}
            </button>
          </div>
        </div>

        {geoError && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{geoError}</span>
          </div>
        )}
      </div>

      {/* Interactive Map Canvas Container */}
      <div
        className="relative h-[380px] sm:h-[460px] w-full bg-slate-100"
        data-lenis-prevent={isMapActive ? "true" : undefined}
      >
        {/* The Leaflet Map Mount Point */}
        <div ref={mapContainerRef} className="h-full w-full z-10" />

        {/* INACTIVE STATE OVERLAY: Small centered floating card */}
        {!isMapActive && (
          <div
            onClick={activateMap}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[0.5px] cursor-pointer select-none transition-all duration-300 hover:bg-black/10"
            title="Click or tap to activate interactive map zoom and drag"
          >
            <div className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-yellow-400 bg-white/95 px-6 py-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 hover:bg-white active:scale-95 mx-4 max-w-sm">
              <div className="flex items-center gap-2 text-sky-600 font-extrabold text-sm sm:text-base">
                <span className="text-xl">🖐</span>
                <span>Click to Explore Map</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
                Zoom & explore Pizza Mood outlets across India
              </p>
              <div className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-yellow-400/20 px-3 py-0.5 text-[10px] font-black text-amber-900 border border-yellow-400/30">
                <MousePointerClick className="h-3 w-3 text-sky-600" />
                <span>Click or tap anywhere to enable map controls</span>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE STATE INDICATOR: Subtle badge on top right */}
        {isMapActive && (
          <div className="absolute top-3.5 right-3.5 z-[400] flex items-center gap-2 rounded-full border border-sky-400/40 bg-white/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm transition-all text-[11px] font-bold text-sky-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>Map Active</span>
            <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
              (Click outside to scroll page)
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deactivateMap();
              }}
              className="ml-1 rounded-full p-0.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Deactivate map & return to normal page scroll"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Location Cards List below Map */}
      <div
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        className="max-h-72 overflow-y-auto overscroll-contain divide-y divide-slate-100 bg-white p-4"
        onWheel={(e) => e.stopPropagation()}
      >
        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-sky-500" />
          Showing {filteredLocations.length} Pizza Mood Franchise Outlets
        </p>

        {filteredLocations.map((loc) => {
          const isSelected = loc.id === selectedLocId;

          return (
            <div
              key={loc.id}
              onClick={() => focusLocation(loc, 15)}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl transition cursor-pointer ${
                isSelected
                  ? "bg-sky-50/80 border border-sky-200 shadow-sm"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍕</span>
                  <h4 className="text-sm font-black text-slate-900">{loc.name}</h4>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                    Open Now
                  </span>
                  {isSelected && (
                    <span className="rounded-full bg-yellow-400/30 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                      Selected
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-slate-600 line-clamp-1">{loc.address}</p>
                <div className="mt-1 flex items-center gap-4 text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-sky-500" /> {loc.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-500" /> {loc.hours[0]?.openingTime || "11 AM"} -{" "}
                    {loc.hours[0]?.closingTime || "11 PM"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    focusLocation(loc, 15);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-700 hover:bg-slate-200 transition"
                >
                  <Navigation className="h-3 w-3 text-sky-500" /> Focus on Map
                </button>
                <Link
                  href={`/locations/${loc.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-sky-600 transition shadow-sm"
                >
                  View Store <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="py-8 text-center text-sm font-semibold text-slate-500">
            No outlets found matching "{searchQuery}". Want to open a Pizza Mood franchise in this location?
          </div>
        )}
      </div>
    </div>
  );
}
