"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

// Drop-in for next/link: internal paths get the current language prefix.
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { lang } = useLocale();
  const h = typeof href === "string" && href.startsWith("/") ? localePath(lang, href) : href;
  return <NextLink href={h} {...props} />;
}
