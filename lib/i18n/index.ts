export const LOCALES = ["mr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "mr";

export const hasLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);

// Marathi (default) has no URL prefix; English is /en.
export const localePath = (lang: Locale, href: string) =>
  lang === DEFAULT_LOCALE ? href : `/en${href === "/" ? "" : href}`;

// Strips a leading /en so the same page can be linked in the other language.
export const stripLocale = (pathname: string) => pathname.replace(/^\/en(?=\/|$)/, "") || "/";

export const OG_LOCALE: Record<Locale, string> = { mr: "mr_IN", en: "en_IN" };
