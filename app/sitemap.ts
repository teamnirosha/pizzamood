import { MetadataRoute } from "next";
import { getLocations } from "@/lib/db";
import { baseUrl } from "@/lib/seo";

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

  const locationPages = locations.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: loc.updatedAt ? new Date(loc.updatedAt) : new Date(loc.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...locationPages];
}
