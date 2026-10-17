import { Metadata } from "next";
import Link from "@/app/components/LocalizedLink";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { getLocations } from "@/lib/db";
import { menuPhrase } from "@/lib/menu";
import { generateBreadcrumbSchema, generateLocationListSchema } from "@/lib/seo";
import { hasLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale, absUrl } from "@/lib/i18n/seo";
import { areaName, cityName, fill } from "@/lib/storeText";

interface PageProps {
  params: Promise<{ lang: string; city: string }>;
}

async function getCityStores(city: string) {
  const all = await getLocations();
  return all.filter((l) => l.city.toLowerCase() === city.toLowerCase() && l.status === "active");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, city } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const stores = await getCityStores(city);
  if (!stores.length) return { title: t.locations.cityFallbackTitle };
  const c = cityName(stores[0].city, lang);
  const v = { city: c, cityEn: stores[0].city.toLowerCase(), n: stores.length, areas: stores.slice(0, 5).map((s) => areaName(s.area, lang)).join(", ") };
  const title = fill(t.locations.city.title, v);
  const description = fill(t.locations.city.description, v);
  const path = `/locations/${city.toLowerCase()}`;
  return {
    title,
    description,
    keywords: t.locations.city.keywords.map((k) => fill(k, { ...v, city: lang === "en" ? c.toLowerCase() : c })),
    alternates: alternatesFor(lang, path),
    openGraph: { title, description, url: absUrl(lang, path), siteName: "Pizza Mood", locale: ogLocale(lang), type: "website" },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { lang, city } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).locations;
  const stores = await getCityStores(city);
  if (!stores.length) notFound();
  const name = cityName(stores[0].city, lang);
  const v = { city: name, n: stores.length };

  const breadcrumb = generateBreadcrumbSchema([
    { name: t.home, url: localePath(lang, "/") },
    { name: t.locations, url: localePath(lang, "/locations") },
    { name: name, url: localePath(lang, `/locations/${city.toLowerCase()}`) },
  ], lang);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocationListSchema(fill(t.city.schemaName, v), stores, lang)) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-sky-600">{t.home}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/locations" className="hover:text-sky-600">{t.locations}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-sky-600 font-extrabold">{name}</span>
        </nav>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {fill(t.city.h1, v)}
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-slate-600">
          {fill(t.city.intro, v)}</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((s) => (
            <Link
              key={s.id}
              href={`/locations/${s.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-base font-extrabold text-slate-900">{fill(t.city.cardTitle, { area: areaName(s.area, lang), city: name })}</h2>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
                <span className="line-clamp-2">{s.address}</span>
              </p>
              <p className="mt-2 text-xs font-bold capitalize text-sky-700">{menuPhrase(s, lang)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
