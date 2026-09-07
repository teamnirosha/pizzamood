import { getLocations, getFAQs, getTestimonials, getSiteSettings } from "@/lib/db";
import HeroSection from "./components/HeroSection";
import WhyPizzaMood from "./components/WhyPizzaMood";
import InvestmentSection from "./components/InvestmentSection";
import LaunchTimeline from "./components/LaunchTimeline";
import SupportSection from "./components/SupportSection";
import ComparisonSection from "./components/ComparisonSection";
import OutletShowcase from "./components/OutletShowcase";
import TestimonialSection from "./components/TestimonialSection";
import HomeFAQ from "./components/HomeFAQ";
import LocationMap from "./components/LocationMap";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: settings.seoDefaultTitle,
    description: settings.seoDefaultDescription,
    alternates: {
      canonical: "https://pizzamood.in",
    },
    openGraph: {
      title: settings.seoDefaultTitle,
      description: settings.seoDefaultDescription,
      url: "https://pizzamood.in",
      siteName: "Pizza Mood Franchise",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function Home() {
  const locations = await getLocations();
  const faqs = await getFAQs();
  const testimonials = await getTestimonials();
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

      {/* 01 HERO SECTION */}
      <HeroSection />

      {/* 02 WHY PIZZA MOOD (OPERATING SYSTEM) */}
      <WhyPizzaMood />

      {/* 03 THE ₹4 LAKH OPPORTUNITY BREAKDOWN */}
      <InvestmentSection
        breakdown={settings.investmentBreakdown}
        disclaimer={settings.disclaimerText}
      />

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
              Interactive Store Map
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Find Pizza Mood Outlets Near You
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Explore store locations on OpenStreetMap, check opening hours, or test city availability for your franchise.
            </p>
          </div>

          <LocationMap locations={locations} />
        </div>
      </section>

      {/* 09 FRANCHISE TESTIMONIALS */}
      <TestimonialSection testimonials={testimonials} />

      {/* 10 FAQ SECTION */}
      <HomeFAQ faqs={faqs} />
    </div>
  );
}
