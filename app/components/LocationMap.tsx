"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, Navigation, Phone, Clock, ArrowRight, ShieldAlert, X, MapPin, Plus, Minus, RotateCcw } from "lucide-react";
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
  const listRef = useRef<HTMLDivElement>(null);

  const [showGestureToast, setShowGestureToast] = useState(false);
  const gestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedLocId, setSelectedLocId] = useState<string | null>(selectedLocationId || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [geoError, setGeoError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Wheel scroll chaining: allows parent page to scroll when list reaches top or bottom
  const handleListWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;

    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    const isAtTop = el.scrollTop <= 0;
    const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;

    if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
      return; // Allow parent page to scroll
    }

    e.stopPropagation();
  };

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

  // Display "Use 2 fingers to move map" toast on mobile
  const triggerGestureToast = useCallback(() => {
    setShowGestureToast(true);
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current);
    }
    gestureTimeoutRef.current = setTimeout(() => {
      setShowGestureToast(false);
    }, 1500);
  }, []);

  // Update selected location helper & flyTo animation
  const focusLocation = useCallback(
    (loc: OutletLocation, zoom = 15) => {
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
    [onSelectLocation]
  );

  // Reset map view to fit all markers
  const handleResetView = useCallback(() => {
    setSelectedLocId(null);
    const map = leafletMapRef.current;
    const L = leafletModuleRef.current;
    if (map && L && filteredLocations.length > 0) {
      const bounds = L.latLngBounds(filteredLocations.map((loc) => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [filteredLocations]);

  // Zoom handlers
  const handleZoomIn = () => {
    leafletMapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    leafletMapRef.current?.zoomOut();
  };

  // Sync prop changes
  useEffect(() => {
    if (selectedLocationId && selectedLocationId !== selectedLocId) {
      const match = locations.find((l) => l.id === selectedLocationId);
      if (match) {
        focusLocation(match);
      }
    }
  }, [selectedLocationId, locations, selectedLocId, focusLocation]);

  // Leaflet map initialization
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      leafletModuleRef.current = L;

      if (!leafletMapRef.current) {
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const initialLat = locations[0]?.latitude || 18.5204;
        const initialLng = locations[0]?.longitude || 73.8567;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 12,
          minZoom: 5,
          maxZoom: 18,
          scrollWheelZoom: false,
          dragging: !isTouchDevice,
          doubleClickZoom: true,
          keyboard: false,
          touchZoom: true,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
          minZoom: 5,
        }).addTo(map);

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
          <div style="min-width: 220px; max-width: 260px; font-family: system-ui, -apple-system, sans-serif; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #009ad8; letter-spacing: 0.05em;">Pizza Mood</span>
              <span style="background: #ecfdf5; color: #047857; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 9999px;">● Open Now</span>
            </div>
            <h4 style="margin: 2px 0 4px 0; font-size: 14px; font-weight: 900; color: #0f172a; line-height: 1.2;">${loc.name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #4b5563; font-weight: 500; line-height: 1.3;">${loc.address}</p>
            <div style="display: flex; gap: 6px; margin-bottom: 8px; font-size: 10px; font-weight: 700; color: #475569;">
              <span>🕒 ${loc.hours[0]?.openingTime || "11 AM"} - ${loc.hours[0]?.closingTime || "11 PM"}</span>
            </div>
            <a href="/locations/${loc.slug}" style="display: block; width: 100%; text-align: center; background: #009ad8; border: 1.5px solid #ead800; color: white; padding: 7px 0; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 8px -2px rgba(0, 154, 216, 0.4);">
              View Store & Menu &rarr;
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
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [filteredLocations, selectedLocId, focusLocation, locations]);

  // Touch gesture listener on map container for two-finger drag handling
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        leafletMapRef.current?.dragging.disable();
      } else if (e.touches.length >= 2) {
        leafletMapRef.current?.dragging.enable();
        setShowGestureToast(false);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        if (deltaX > 25 || deltaY > 25) {
          triggerGestureToast();
        }
      } else if (e.touches.length >= 2) {
        setShowGestureToast(false);
      }
    };

    const handleTouchEnd = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouch) {
        leafletMapRef.current?.dragging.disable();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current);
      }
    };
  }, [triggerGestureToast]);

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

        const map = leafletMapRef.current;
        const L = leafletModuleRef.current;

        if (!map || !L) return;

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
            `<div style="font-family: system-ui, sans-serif; font-size: 11px; font-weight: 800; color: #1e3a8a; padding: 2px;">📍 You Are Here</div>`
          );
        userMarkerRef.current = uMarker;

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
        setGeoError("Unable to retrieve your location. Please select a store from the list.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div
      ref={mapWrapperRef}
      className="flex flex-col rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden max-w-full"
    >
      {/* 1. Header Bar: Search + City Filter + Near Me Button */}
      <div className="border-b border-slate-200 bg-slate-50 p-3 sm:p-5 shrink-0 z-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search area, city or store (e.g. Kharadi, Pune, Warje)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl sm:rounded-2xl border border-slate-300 bg-white pl-9 pr-8 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filters & Near Me */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocId(null);
              }}
              className="flex-1 sm:flex-initial rounded-xl sm:rounded-2xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 focus:border-sky-500 focus:outline-none shadow-2xs cursor-pointer"
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
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-2xl bg-sky-500 border border-yellow-400 px-4 py-2 text-xs font-black text-white shadow-md shadow-sky-500/20 transition hover:bg-sky-600 active:scale-95 disabled:opacity-50 cursor-pointer text-center"
            >
              <Navigation className={`h-3.5 w-3.5 shrink-0 ${isLocating ? "animate-spin" : ""}`} />
              <span className="whitespace-nowrap">{isLocating ? "Locating..." : "Find Near Me"}</span>
            </button>
          </div>
        </div>

        {geoError && (
          <div className="mt-2.5 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{geoError}</span>
          </div>
        )}
      </div>

      {/* 2. Interactive Map Container (Attached below controls, above list divider) */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[440px] w-full bg-slate-100 overflow-hidden shrink-0 border-b border-slate-200">
        {/* Leaflet Map Mount Point */}
        <div ref={mapContainerRef} className="h-full w-full z-10" />

        {/* Floating Zoom & Reset Controls */}
        <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5 shadow-md">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-white/95 text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-center border border-slate-200 shadow-sm transition active:scale-95 cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-white/95 text-slate-800 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-center border border-slate-200 shadow-sm transition active:scale-95 cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="w-8 h-8 rounded-lg bg-white/95 text-slate-800 hover:bg-yellow-50 hover:text-amber-600 flex items-center justify-center border border-slate-200 shadow-sm transition active:scale-95 cursor-pointer"
            title="Fit All Outlets"
            aria-label="Fit All Outlets"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile 2-Finger Gesture Helper */}
        {showGestureToast && (
          <div className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity duration-200">
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-slate-900 shadow-2xl border-2 border-yellow-400 animate-in fade-in zoom-in duration-150">
              <span className="text-base">✌️</span>
              <span>Use two fingers to move & zoom the map</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. SOLID DIVIDER BAR (Physically OUTSIDE and ABOVE the scrollable list container) */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-20 shadow-2xs">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-sky-500 shrink-0" />
          <span>SHOWING {filteredLocations.length} PIZZA MOOD FRANCHISE OUTLETS</span>
        </p>
        {filteredLocations.length > 2 && (
          <span className="text-[10px] font-extrabold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-full border border-sky-200">
            Scroll list ↓
          </span>
        )}
      </div>

      {/* 4. DEDICATED SCROLLABLE OUTLETS LIST (2-Column Grid on Tablet/Desktop for sleek proportions) */}
      <div
        ref={listRef}
        data-lenis-prevent="true"
        onWheel={handleListWheel}
        className="h-[420px] sm:h-[460px] overflow-y-auto location-scrollbar p-3.5 sm:p-4 bg-slate-50/40 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {filteredLocations.map((loc) => {
            const isSelected = loc.id === selectedLocId;

            return (
              <div
                key={loc.id}
                onClick={() => focusLocation(loc, 15)}
                className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-2 border-sky-500 shadow-md ring-2 ring-sky-100"
                    : "bg-white hover:bg-sky-50/40 hover:border-sky-200 border border-slate-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">🍕</span>
                      <h4 className="text-sm font-black text-slate-900 truncate leading-snug">
                        {loc.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isSelected && (
                        <span className="rounded-full bg-yellow-400/40 px-2 py-0.5 text-[9px] font-extrabold text-amber-900">
                          Active
                        </span>
                      )}
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700">
                        Open Now
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                    {loc.address}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${loc.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" /> {loc.phone}
                    </a>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-500" /> {loc.hours[0]?.openingTime || "11 AM"} - {loc.hours[0]?.closingTime || "11 PM"}
                    </span>
                  </div>
                </div>

                {/* Actions Button Row */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      focusLocation(loc, 15);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 py-2 px-3 text-xs font-extrabold text-slate-700 transition active:scale-95 cursor-pointer"
                  >
                    <Navigation className="h-3.5 w-3.5 text-sky-500" /> Focus on Map
                  </button>
                  <Link
                    href={`/locations/${loc.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 py-2 px-3 text-xs font-extrabold text-white transition shadow-xs text-center active:scale-95"
                  >
                    View Store <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLocations.length === 0 && (
          <div className="py-12 text-center text-xs sm:text-sm font-semibold text-slate-500">
            No outlets found matching "{searchQuery}".
          </div>
        )}
      </div>

    </div>
  );
}
