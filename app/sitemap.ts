import { MetadataRoute } from "next";
import { getLocations } from "@/lib/db";
import { baseUrl } from "@/lib/seo";
import { FRANCHISE_PAGES } from "@/lib/franchisePages";
import { FRANCHISE_AREAS, isAreaTaken } from "@/lib/areas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locations = await getLocations();

  const staticPages = [
    "",
    "/franchise",
    "/how-it-works",
    "/investment",
    "/support",
    "/locations",
    "/faq",
    "/gallery",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/franchise" ? 0.9 : 0.8,
  }));

  const active = locations.filter((l) => l.status !== "inactive");
  const cityPages = [...new Set(active.map((l) => l.city.toLowerCase()))].map((c) => ({
    url: `${baseUrl}/locations/${c}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const locationPages = active.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: loc.updatedAt ? new Date(loc.updatedAt) : new Date(loc.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const franchisePages = FRANCHISE_PAGES.map((p) => ({
    url: `${baseUrl}/franchise/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const areaPages = FRANCHISE_AREAS.filter((a) => !isAreaTaken(a, locations)).map((a) => ({
    url: `${baseUrl}/franchise/pune/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...franchisePages, ...areaPages, ...cityPages, ...locationPages];
}
