import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Mood Franchise | Start Your Pizza Business from ₹4 Lakh",
  description: "Own a high-profit Pizza Mood QSR outlet in your city. Complete 360° operational support, store setup in 30 days, location assistance and fresh raw materials.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.svg",
    apple: "/apple-icon.png",
  },
};

import SmoothScroll from "./components/SmoothScroll";
import WhatsAppBubble from "./components/WhatsAppBubble";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppBubble />
      </body>
    </html>
  );
}
