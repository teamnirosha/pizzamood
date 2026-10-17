import "server-only";
import type { Locale } from "./index";
import type { Dict } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  mr: () => import("./dictionaries/mr").then((m) => m.mr),
  en: () => import("./dictionaries/en").then((m) => m.en),
};

export const getDictionary = (lang: Locale) => dictionaries[lang]();
