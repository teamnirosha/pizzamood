import { getLocations, getFAQs, getTestimonials, getSiteSettings } from "@/lib/db";
import HeroSection from "@/app/components/HeroSection";
import UspSection from "@/app/components/UspSection";
import WhyPizzaMood from "@/app/components/WhyPizzaMood";
import InvestmentSection from "@/app/components/InvestmentSection";
import LaunchTimeline from "@/app/components/LaunchTimeline";
import SupportSection from "@/app/components/SupportSection";
import ComparisonSection from "@/app/components/ComparisonSection";
import OutletShowcase from "@/app/components/OutletShowcase";
import { SHOW_TESTIMONIALS } from "@/lib/flags";
import TestimonialSection from "@/app/components/TestimonialSection";
import HomeFAQ from "@/app/components/HomeFAQ";
import LocationMap from "@/app/components/LocationMap";
import { notFound } from "next/navigation";
import { hasLocale, LOCALES } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { alternatesFor, ogLocale } from "@/lib/i18n/seo";
import { MODEL_BY_ID } from "@/lib/pricing";
import { fill, modelLakh, pricingHeadline } from "@/app/components/homeI18n";
import { generateOrganizationSchema, generateWebSiteSchema, generateUspListSchema, baseUrl } from "@/lib/seo";

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const settings = await getSiteSettings();
  const t = await getDictionary(lang);
  const m = t.home.meta;
  // English keeps the DB-managed title/description; Marathi uses the dictionary.
  const title = lang === "en" ? settings.seoDefaultTitle : fill(m.title, { headline: pricingHeadline(t) });
  const description = lang === "en" ? settings.seoDefaultDescription : m.description;
  const alternates = alternatesFor(lang, "/");
  return {
    title,
    description,
    ...(m.keywords.length ? { keywords: m.keywords } : {}),
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "Pizza Mood Franchise",
      locale: ogLocale(lang),
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "Pizza Mood" }],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const kiosk = MODEL_BY_ID.kiosk;
  const cafe = MODEL_BY_ID.cafe;
  const vars = { headline: pricingHeadline(t), kiosk: modelLakh(t, kiosk), cafe: modelLakh(t, cafe) };
  // FAQs come from the DB in English; swap in dictionary text by id, falling back to English.
  const faqs = (await getFAQs()).map((f) => {
    const tr = t.home.faqs[f.id];
    return tr ? { ...f, question: fill(tr.question, vars), answer: fill(tr.answer, vars) } : f;
  });
  const locations = await getLocations();
  const testimonials = SHOW_TESTIMONIALS ? await getTestimonials() : [];
  const settings = await getSiteSettings();

  const orgSchema = generateOrganizationSchema(settings);
  const websiteSchema = generateWebSiteSchema();

  return (
    <div className="min-h-screen bg-white">
      {/* Global Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateUspListSchema(lang)) }}
      />

      {/* 01 HERO SECTION */}
      <HeroSection />
      <UspSection />

      {/* 02 WHY PIZZA MOOD (OPERATING SYSTEM) */}
      <WhyPizzaMood />

      {/* 03 INVESTMENT BREAKDOWN (KIOSK & CAFE) */}
      <InvestmentSection />

      {/* 04 30-DAY STORE LAUNCH TIMELINE */}
      <LaunchTimeline />

      {/* 05 WHAT PIZZA MOOD PROVIDES (SUPPORT) */}
      <SupportSection />

      {/* 06 WHY FRANCHISEES CHOOSE PIZZA MOOD (COMPARISON) */}
      <ComparisonSection />

      {/* 07 EXISTING OUTLETS SHOWCASE */}
      <OutletShowcase locations={locations} />

      {/* 08 INTERACTIVE LOCATION MAP SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
              {t.home.mapSection.badge}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {t.home.mapSection.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {t.home.mapSection.sub}
            </p>
          </div>

          <LocationMap locations={locations} />
        </div>
      </section>

      {/* 09 FRANCHISE TESTIMONIALS */}
      {SHOW_TESTIMONIALS && <TestimonialSection testimonials={testimonials} />}

      {/* 10 FAQ SECTION */}
      <HomeFAQ faqs={faqs} />
    </div>
  );
}
