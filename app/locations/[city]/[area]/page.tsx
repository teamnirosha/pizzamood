import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Navigation,
  ChevronRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { getLocationBySlug, getLocations } from "@/lib/db";
import { generateRestaurantSchema, generateBreadcrumbSchema, generateFAQSchema, baseUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    city: string;
    area: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, area } = await params;
  const slug = `${city}/${area}`;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Store Location Not Found | Pizza Mood",
    };
  }

  const title = location.seo?.title || `Best Pizza Store in ${location.area}, ${location.city} | Pizza Mood`;
  const description =
    location.seo?.description ||
    `Looking for delicious pizza in ${location.area}? Visit Pizza Mood ${location.area} for fresh pizzas, fast food, store timings, contact & directions.`;

  return {
    title,
    description,
    keywords: location.seo?.secondaryKeywords || [
      `best pizza store in ${location.area}`,
      `pizza in ${location.area}`,
      `pizza near ${location.area}`,
      `fast food in ${location.area}`,
      "pizza near me",
      "pizza shop near me",
    ],
    alternates: {
      canonical: `${baseUrl}/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/locations/${location.slug}`,
      siteName: "Pizza Mood",
      images: location.images.map((img) => ({ url: img.url, alt: img.alt })),
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { city, area } = await params;
  const slug = `${city}/${area}`;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const allLocations = await getLocations();
  const nearbyOutlets = allLocations.filter((l) => l.id !== location.id).slice(0, 3);

  const restaurantSchema = generateRestaurantSchema(location);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: location.city, url: `/locations?city=${location.city}` },
    { name: location.area, url: `/locations/${location.slug}` },
  ]);

  const locationFaqs = [
    {
      id: `faq-${location.id}-1`,
      category: "General" as const,
      question: `Where is Pizza Mood ${location.area} located?`,
      answer: `Pizza Mood ${location.area} is located at ${location.address}. Nearby landmarks include ${location.nearbyLandmarks.join(", ")}.`,
    },
    {
      id: `faq-${location.id}-2`,
      category: "General" as const,
      question: `What are the opening hours of Pizza Mood ${location.area}?`,
      answer: `Pizza Mood ${location.area} is open daily from ${location.hours[0]?.openingTime || "11:00 AM"} to ${location.hours[0]?.closingTime || "11:00 PM"}.`,
    },
    {
      id: `faq-${location.id}-3`,
      category: "General" as const,
      question: `Does Pizza Mood ${location.area} offer online delivery and takeaway?`,
      answer: `Yes! You can place takeaway orders directly at our counter or call us at ${location.phone} for home delivery. We are also listed on popular food delivery aggregators.`,
    },
  ];

  const faqSchema = generateFAQSchema(locationFaqs);

  const whatsappOrderUrl = `https://wa.me/${location.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
    location.name
  )},%20I'd%20like%20to%20place%20an%20order.`;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/locations" className="hover:text-sky-600">Locations</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-700">{location.city}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-sky-600 font-extrabold">{location.area}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-400 border border-sky-500/30">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> Pizza Mood Official Store
              </div>

              {/* Dynamic H1 targeting local SEO */}
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
                Best Pizza Store in {location.area}, {location.city}
              </h1>

              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed max-w-2xl">
                {location.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${location.phone}`}
                  className="flex items-center gap-2 rounded-2xl bg-sky-500 border border-yellow-400 px-6 py-3 text-xs font-black text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition"
                >
                  <Phone className="h-4 w-4" /> Call Store ({location.phone})
                </a>

                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp Order
                </a>

                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
                >
                  <Navigation className="h-4 w-4 text-yellow-400" /> Get Directions
                </a>
              </div>
            </div>

            {/* Main Store Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border-4 border-yellow-400 shadow-2xl">
                <img
                  src={location.images[0]?.url || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"}
                  alt={location.images[0]?.alt || location.name}
                  className="h-72 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                  📍 {location.area}, {location.city}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Main Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Popular Products in this Outlet */}
            {location.popularProducts && location.popularProducts.length > 0 && (
              <div id="popular-menu" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-black uppercase text-sky-600 tracking-wider">Top Favorites</span>
                    <h2 className="text-2xl font-black text-slate-900">Popular Pizzas & Sides</h2>
                  </div>
                  <ShoppingBag className="h-6 w-6 text-sky-600" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location.popularProducts.map((prod, idx) => (
                    <div key={idx} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-sky-200">
                      {prod.image && (
                        <img src={prod.image} alt={prod.name} className="h-20 w-20 rounded-xl object-cover shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-black text-slate-900">{prod.name}</h4>
                          <span className="text-xs font-extrabold text-sky-600 shrink-0">{prod.price}</span>
                        </div>
                        {prod.badge && (
                          <span className="inline-block mt-1 rounded-full bg-yellow-400 px-2 py-0.5 text-[9px] font-black text-slate-900">
                            {prod.badge}
                          </span>
                        )}
                        <p className="mt-1 text-[11px] font-medium text-slate-500 line-clamp-2">{prod.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outlet Gallery */}
            {location.images && location.images.length > 1 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Store & Food Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {location.images.map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-2xl bg-slate-100 h-36">
                      <img src={img.url} alt={img.alt} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location FAQs */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions — {location.name}</h2>
              <div className="space-y-4">
                {locationFaqs.map((faq) => (
                  <div key={faq.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <h4 className="text-sm font-extrabold text-slate-900">{faq.question}</h4>
                    <p className="mt-1 text-xs text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar Info Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* NAP Info Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                Store Location & Timings
              </h3>

              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-400">Full Address</span>
                    <span className="text-slate-900 leading-snug">{location.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-400">Phone Number</span>
                    <a href={`tel:${location.phone}`} className="text-slate-900 hover:text-sky-600">{location.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="block text-[10px] font-black uppercase text-slate-400">Weekly Schedule</span>
                    <div className="mt-2 space-y-1">
                      {location.hours.map((h, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 font-bold">{h.day}</span>
                          <span className="text-slate-900 font-black">
                            {h.isClosed ? "Closed" : `${h.openingTime} - ${h.closingTime}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-black text-white hover:bg-slate-800 transition"
                >
                  <Navigation className="h-4 w-4 text-yellow-400" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Franchise Lead Sidebar CTA Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-yellow-500 p-6 text-white shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-wider text-yellow-200">
                Business Opportunity
              </span>
              <h3 className="text-lg font-black mt-1">Want to open a Pizza Mood in your area?</h3>
              <p className="mt-2 text-xs text-sky-50 font-medium">
                Start your own store starting from ₹4 Lakh investment with 360° operational support.
              </p>
              <Link
                href="/franchise"
                className="mt-4 block w-full text-center rounded-2xl bg-white py-3 text-xs font-black text-sky-600 hover:bg-slate-100 transition shadow-md"
              >
                Apply for Franchise →
              </Link>
            </div>

          </div>

        </div>

        {/* Nearby Outlets */}
        {nearbyOutlets.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-12">
            <h3 className="text-xl font-black text-slate-900 mb-6">Nearby Pizza Mood Outlets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyOutlets.map((nob) => (
                <div key={nob.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                  <span className="text-xs font-black text-sky-600 uppercase">{nob.city}</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">{nob.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{nob.address}</p>
                  <Link href={`/locations/${nob.slug}`} className="mt-3 inline-block text-xs font-bold text-sky-600 hover:underline">
                    View Store →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
