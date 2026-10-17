import { baseUrl } from "@/lib/seo";
import { localePath, OG_LOCALE, type Locale } from "./index";

export const absUrl = (lang: Locale, path: string) => `${baseUrl}${localePath(lang, path)}`.replace(/\/$/, "");

// Canonical plus hreflang pairs for a page path like "/franchise/pune".
export function alternatesFor(lang: Locale, path: string) {
  return {
    canonical: absUrl(lang, path),
    languages: { mr: absUrl("mr", path), en: absUrl("en", path), "x-default": absUrl("mr", path) },
  };
}

export const ogLocale = (lang: Locale) => OG_LOCALE[lang];
