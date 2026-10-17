import { Metadata } from "next";
import { getLocations } from "@/lib/db";
import LocationMap from "@/app/components/LocationMap";
import Link from "@/app/components/LocalizedLink";
import { generateLocationListSchema } from "@/lib/seo";
import UspTicker from "@/app/components/UspTicker";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { areaName, fill } from "@/lib/storeText";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = (await getDictionary(lang)).locations.list;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    ...(t.keywords.length && { keywords: t.keywords }),
    alternates: alternatesFor(lang, "/locations"),
    openGraph: { title: t.metaTitle, description: t.metaDescription, locale: ogLocale(lang) },
  };
}

export default async function LocationsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).locations.list;
  const locations = await getLocations();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <UspTicker />
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            {t.badge}
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            {t.intro}</p>
        </div>

        {/* Interactive OpenStreetMap */}
        <LocationMap locations={locations} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocationListSchema(t.schemaName, locations, lang)) }}
        />
        <nav aria-label={t.navAria} className="mt-12">
          <h2 className="text-xl font-black text-slate-900">{t.navHeading}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-sky-700 sm:grid-cols-3 lg:grid-cols-4">
            {locations.map((l) => (
              <li key={l.id}>
                <Link href={`/locations/${l.slug}`} className="hover:underline">
                  {fill(t.areaLink, { area: areaName(l.area, lang) })}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  );
}
