import { PRICING_HEADLINE } from "@/lib/pricing";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { LocaleProvider } from "@/app/components/LocaleProvider";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Script from "next/script";
import { baseUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist has no Devanagari glyphs; this covers Marathi text.
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: `Pizza Mood Franchise | ${PRICING_HEADLINE}`,
  description: "Own a high-profit Pizza Mood QSR outlet in your city. Complete 360° operational support, store setup in 30 days, location assistance and fresh raw materials.",
  // Search Console HTML-tag token (only needed if the property is not verified by DNS).
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    // Bing Webmaster Tools meta token (not needed if the site is imported from Search Console).
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }),
  },
  openGraph: { images: [{ url: "/logo.png", width: 512, height: 512, alt: "Pizza Mood" }] },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.png",
    apple: "/apple-icon.png",
  },
};

import SmoothScroll from "@/app/components/SmoothScroll";
import WhatsAppBubble from "@/app/components/WhatsAppBubble";

// The Measurement ID is public. Production-only default keeps local dev out of the data.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? (process.env.NODE_ENV === "production" ? "G-ZK134KYTVR" : undefined);

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider lang={lang} t={t}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppBubble />
        </LocaleProvider>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
