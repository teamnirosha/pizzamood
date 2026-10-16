import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, MapPin } from "lucide-react";
import { getLocations } from "@/lib/db";
import { FRANCHISE_PAGES, getFranchisePage } from "@/lib/franchisePages";
import { generateBreadcrumbSchema, generateFAQSchema, baseUrl } from "@/lib/seo";
import { EXCLUSIVITY_LINE, FRANCHISE_PHONE_DISPLAY, FRANCHISE_PHONE_TEL, whatsappLink } from "@/lib/usps";
import EnquiryButton from "../../components/EnquiryButton";
import FranchiseJsonLd from "../../components/FranchiseJsonLd";
import PricingCards from "../../components/PricingCards";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return FRANCHISE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getFranchisePage((await params).slug);
  if (!page) return {};
  const url = `${baseUrl}/franchise/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: { title: page.metaTitle, description: page.description, url, siteName: "Pizza Mood", locale: "en_IN", type: "website" },
  };
}

export default async function FranchiseLandingPage({ params }: PageProps) {
  const page = getFranchisePage((await params).slug);
  if (!page) notFound();

  const stores = page.showStores ? (await getLocations()).filter((l) => l.status === "active") : [];
  const related = page.related.map(getFranchisePage).filter((p) => !!p);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Franchise", url: "/franchise" },
    { name: page.kicker, url: `/franchise/${page.slug}` },
  ]);
  const faqSchema = generateFAQSchema(page.faqs.map((f, i) => ({ id: `${page.slug}-${i}`, category: "General" as const, ...f })));

  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-100">
            {page.kicker}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{page.h1}</h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">{page.intro}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-black text-white shadow-xl hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs font-bold text-amber-100">{EXCLUSIVITY_LINE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-12">
        {page.showPricing && (
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Investment</h2>
            <PricingCards />
            <p className="mt-2 text-xs font-semibold text-slate-500">Taxes additional.</p>
          </section>
        )}

        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-black text-slate-900">{s.heading}</h2>
            {s.paras?.map((p) => (
              <p key={p} className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-medium text-slate-700">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>{s.table.head.map((h, i) => <th key={i} className="px-4 py-3 font-black">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        {r.map((c, j) => (
                          <td key={j} className={`px-4 py-3 ${j === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {stores.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-slate-900">Where Pizza Mood already operates in Pune</h2>
            <p className="mt-3 text-sm font-medium text-slate-700">
              We keep one outlet per area, so these areas already have a Pizza Mood. Ask us about other areas.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stores.map((s) => (
                <li key={s.id}>
                  <Link href={`/locations/${s.slug}`} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 hover:border-sky-300">
                    <MapPin className="h-4 w-4 text-sky-600" /> {s.area}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-black text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {page.faqs.map((f) => (
              <details key={f.question} className="rounded-2xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-black text-slate-900">{f.question}</summary>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-2xl font-black">Get free franchise details</h2>
          <p className="mt-2 text-sm font-semibold text-slate-300">Our team replies within 24 hours.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton />
            <a href={`tel:${FRANCHISE_PHONE_TEL}`} className="text-sm font-black text-yellow-400 underline">
              {FRANCHISE_PHONE_DISPLAY}
            </a>
          </div>
        </section>

        <nav aria-label="Related pages">
          <h2 className="text-lg font-black text-slate-900">Related</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/franchise/${r.slug}`} className="text-sm font-bold text-sky-700 hover:underline">{r.kicker}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
