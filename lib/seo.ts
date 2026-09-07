import { OutletLocation, FAQItem, SiteSettings } from "@/types";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pizzamood.in";

export function generateOrganizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: settings.brandName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: settings.seoDefaultDescription,
    telephone: settings.primaryPhone,
    email: settings.officialEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.headquartersAddress,
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/pizzamood11",
      "https://instagram.com/pizzamoodpune",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Pizza Mood Franchise",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/locations?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateRestaurantSchema(location: OutletLocation) {
  const openingHoursSpecs = location.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.isClosed ? undefined : convert12To24(h.openingTime),
    closes: h.isClosed ? undefined : convert12To24(h.closingTime),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${baseUrl}/locations/${location.slug}/#restaurant`,
    name: location.name,
    image: location.images.map((img) => img.url),
    url: `${baseUrl}/locations/${location.slug}`,
    telephone: location.phone,
    servesCuisine: ["Pizza", "Fast Food", "Italian-American", "Sides"],
    priceRange: "₹₹ (₹150 - ₹500)",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.area,
      addressRegion: location.city,
      postalCode: location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: openingHoursSpecs,
    hasMap: location.googleMapsUrl,
    menu: `${baseUrl}/locations/${location.slug}#popular-menu`,
    parentOrganization: {
      "@id": `${baseUrl}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function convert12To24(time12: string): string {
  if (!time12) return "11:00";
  const [time, modifier] = time12.split(" ");
  if (!time || !modifier) return time12;
  // eslint-disable-next-preference
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier.toUpperCase() === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  return `${hours.padStart(2, "0")}:${minutes || "00"}`;
}
