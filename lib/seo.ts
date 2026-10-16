import { MODELS } from "@/lib/pricing";
import { menuItems } from "@/lib/menu";
import { USPS, SLOGAN, FRANCHISE_PHONE_TEL } from "@/lib/usps";
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
    slogan: SLOGAN,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: FRANCHISE_PHONE_TEL,
      availableLanguage: ["English", "Hindi"],
    },
    makesOffer: MODELS.map((m) => ({
      "@type": "Offer",
      name: `Pizza Mood ${m.label} Franchise`,
      price: m.total,
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
      itemOffered: {
        "@type": "Service",
        name: `Pizza Mood ${m.label} Franchise`,
        description: `Total investment ${m.lakh}. Only one Pizza Mood outlet per area.`,
      },
    })),
    email: settings.officialEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.headquartersAddress,
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/pizzamood11",
      "https://instagram.com/pizzamoodofficial",
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
  const pageUrl = `${baseUrl}/locations/${location.slug}`;
  const items = menuItems(location);
  const openingHoursSpecs = location.hours
    .filter((h) => !h.isClosed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: convert12To24(h.openingTime),
      closes: convert12To24(h.closingTime),
    }));

  return {
    "@context": "https://schema.org",
    "@type": location.model === "cafe" ? ["Restaurant", "CafeOrCoffeeShop"] : ["Restaurant", "FastFoodRestaurant"],
    "@id": `${pageUrl}/#restaurant`,
    name: location.name,
    description: location.description,
    image: location.images.map((img) => img.url),
    url: pageUrl,
    telephone: location.phone || undefined,
    servesCuisine: [...items.map((c) => c.label), "Fast Food"],
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: "IN",
    },
    areaServed: { "@type": "Place", name: `${location.area}, ${location.city}` },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: openingHoursSpecs,
    hasMap: location.googleMapsUrl,
    hasMenu: {
      "@type": "Menu",
      url: `${pageUrl}#popular-menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Menu",
          hasMenuItem: items.map((c) => ({
            "@type": "MenuItem",
            name: c.name,
            description: c.description,
          })),
        },
      ],
    },
    sameAs: [location.googleMapsUrl, "https://instagram.com/pizzamoodofficial", "https://facebook.com/pizzamood11"],
    parentOrganization: { "@id": `${baseUrl}/#organization` },
    isPartOf: { "@id": `${baseUrl}/#website` },
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

export function generateUspListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Why choose a Pizza Mood franchise",
    itemListElement: USPS.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.title,
      description: u.line,
    })),
  };
}

export function generateLocationListSchema(name: string, locations: OutletLocation[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: locations.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/locations/${l.slug}`,
      name: l.name,
    })),
  };
}

// Haversine distance in km; used to link each store page to its nearest sibling stores.
export function distanceKm(a: OutletLocation, b: OutletLocation) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(b.latitude - a.latitude) / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(rad(b.longitude - a.longitude) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
