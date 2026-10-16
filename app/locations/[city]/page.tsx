import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { getLocations } from "@/lib/db";
import { menuPhrase } from "@/lib/menu";
import { generateBreadcrumbSchema, generateLocationListSchema, baseUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ city: string }>;
}

async function getCityStores(city: string) {
  const all = await getLocations();
  return all.filter((l) => l.city.toLowerCase() === city.toLowerCase() && l.status === "active");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const stores = await getCityStores(city);
  if (!stores.length) return { title: "Pizza Mood Outlets" };
  const name = stores[0].city;
  const title = `Pizza Mood in ${name}: ${stores.length} Outlets for Pizza, Burgers & Momos`;
  const description = `Find the best pizza in ${name}. ${stores.length} Pizza Mood outlets in ${stores.slice(0, 5).map((s) => s.area).join(", ")} and more. Timings, directions and phone numbers.`;
  const url = `${baseUrl}/locations/${city.toLowerCase()}`;
  return {
    title,
    description,
    keywords: [`pizza in ${name.toLowerCase()}`, `best pizza in ${name.toLowerCase()}`, "pizza near me", `pizza outlets in ${name.toLowerCase()}`],
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Pizza Mood", locale: "en_IN", type: "website" },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const stores = await getCityStores(city);
  if (!stores.length) notFound();
  const name = stores[0].city;

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: name, url: `/locations/${city.toLowerCase()}` },
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocationListSchema(`Pizza Mood outlets in ${name}`, stores)) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/locations" className="hover:text-sky-600">Locations</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-sky-600 font-extrabold">{name}</span>
        </nav>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Best Pizza in {name}: {stores.length} Pizza Mood Outlets
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-slate-600">
          Pizza Mood serves fresh pizza across {name}, with burgers, momos and cafe drinks at selected stores. Pick your
          area to see timings, directions and how to order.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((s) => (
            <Link
              key={s.id}
              href={`/locations/${s.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-base font-extrabold text-slate-900">Pizza in {s.area}, {name}</h2>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
                <span className="line-clamp-2">{s.address}</span>
              </p>
              <p className="mt-2 text-xs font-bold capitalize text-sky-700">{menuPhrase(s)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
