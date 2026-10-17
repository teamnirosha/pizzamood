"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/i18n/dictionaries/en";

const Ctx = createContext<{ lang: Locale; t: Dict } | null>(null);

export function LocaleProvider({ lang, t, children }: { lang: Locale; t: Dict; children: React.ReactNode }) {
  return <Ctx.Provider value={{ lang, t }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLocale outside LocaleProvider");
  return v;
}
