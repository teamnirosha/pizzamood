import { MetadataRoute } from "next";
import { getLocations } from "@/lib/db";
import { FRANCHISE_PAGES } from "@/lib/franchisePages";
import { FRANCHISE_AREAS, isAreaTaken } from "@/lib/areas";
import { absUrl } from "@/lib/i18n/seo";
import { LOCALES } from "@/lib/i18n";
import { SHOW_GALLERY } from "@/lib/flags";

type Entry = Omit<MetadataRoute.Sitemap[number], "url" | "alternates">;

// One entry per language for a path, each carrying hreflang alternates for both.
const both = (path: string, e: Entry): MetadataRoute.Sitemap =>
  LOCALES.map((l) => ({
    url: absUrl(l, path),
    ...e,
    alternates: { languages: { mr: absUrl("mr", path), en: absUrl("en", path), "x-default": absUrl("mr", path) } },
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locations = await getLocations();

  const staticPages = [
    "/",
    "/franchise",
    "/how-it-works",
    "/investment",
    "/support",
    "/locations",
    "/faq",
    ...(SHOW_GALLERY ? ["/gallery"] : []),
    "/contact",
  ].flatMap((route) =>
    both(route, {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "/" ? 1.0 : route === "/franchise" ? 0.9 : 0.8,
    }),
  );

  const active = locations.filter((l) => l.status !== "inactive");
  const cityPages = [...new Set(active.map((l) => l.city.toLowerCase()))].flatMap((c) =>
    both(`/locations/${c}`, { lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 }),
  );

  const locationPages = active.flatMap((loc) =>
    both(`/locations/${loc.slug}`, {
      lastModified: loc.updatedAt ? new Date(loc.updatedAt) : new Date(loc.createdAt),
      changeFrequency: "daily",
      priority: 0.85,
    }),
  );

  const franchisePages = FRANCHISE_PAGES.flatMap((p) =>
    both(`/franchise/${p.slug}`, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 }),
  );

  const areaPages = FRANCHISE_AREAS.filter((a) => !isAreaTaken(a, locations)).flatMap((a) =>
    both(`/franchise/pune/${a.slug}`, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }),
  );

  return [...staticPages, ...franchisePages, ...areaPages, ...cityPages, ...locationPages];
}
