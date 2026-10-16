import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import { getLocations } from "@/lib/db";
import { FRANCHISE_AREAS, getArea, isAreaTaken } from "@/lib/areas";
import { PRICING_HEADLINE } from "@/lib/pricing";
import { generateBreadcrumbSchema, generateFAQSchema, baseUrl } from "@/lib/seo";
import { EXCLUSIVITY_LINE, FRANCHISE_PHONE_DISPLAY, FRANCHISE_PHONE_TEL, whatsappLink } from "@/lib/usps";
import EnquiryButton from "../../../components/EnquiryButton";
import FranchiseJsonLd from "../../../components/FranchiseJsonLd";
import PricingCards from "../../../components/PricingCards";

interface PageProps {
  params: Promise<{ area: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return FRANCHISE_AREAS.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const area = getArea((await params).area);
  if (!area) return {};
  const taken = isAreaTaken(area, await getLocations());
  const title = `Pizza Mood Franchise in ${area.name}, Pune | Pizza, Momos, Burgers`;
  const description = `Open a Pizza Mood franchise in ${area.name}, Pune. ${PRICING_HEADLINE}, taxes additional. One outlet per area. Opens in 30 days.`;
  const url = `${baseUrl}/franchise/pune/${area.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: !taken, follow: true },
    openGraph: { title, description, url, siteName: "Pizza Mood", locale: "en_IN", type: "website" },
  };
}

export default async function AreaFranchisePage({ params }: PageProps) {
  const area = getArea((await params).area);
  if (!area) notFound();
  const stores = await getLocations();
  const taken = isAreaTaken(area, stores);

  const faqs = [
    {
      question: `Is a Pizza Mood franchise available in ${area.name}?`,
      answer: taken
        ? `${area.name} already has a Pizza Mood outlet, and we keep only one outlet per area. Ask us about nearby areas.`
        : `${area.name} does not have a Pizza Mood outlet yet. We keep only one outlet per area, so contact us to check that it is still open and to reserve it.`,
    },
    {
      question: `How much does a Pizza Mood franchise in ${area.name} cost?`,
      answer: `${PRICING_HEADLINE}, taxes additional. Our team will confirm the full cost for your site in ${area.name}.`,
    },
    {
      question: "How long does it take to open?",
      answer: "We aim to open your outlet within 30 days of signing, and we guarantee it.",
    },
  ];

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Franchise", url: "/franchise" },
    { name: "Pune", url: "/franchise/pune" },
    { name: area.name, url: `/franchise/pune/${area.slug}` },
  ]);
  const faqSchema = generateFAQSchema(faqs.map((f, i) => ({ id: `${area.slug}-${i}`, category: "General" as const, ...f })));

  return (
    <div className="bg-white min-h-screen">
      <FranchiseJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-b from-red-600 via-red-500 to-amber-500 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider ${
              taken ? "bg-slate-900/60 text-slate-200" : "bg-emerald-500 text-white"
            }`}
          >
            {taken ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            {taken ? "Area taken" : "Area available"}
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Pizza Mood Franchise in {area.name}, Pune
          </h1>
          <p className="mt-4 text-base font-semibold text-red-50 max-w-2xl mx-auto sm:text-lg">
            {taken
              ? `${area.name} already has a Pizza Mood outlet. Ask us about nearby areas.`
              : `Be the one Pizza Mood owner in ${area.name}. Pizza, momos, burgers, coffee, shakes and fries from one outlet.`}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <EnquiryButton label={taken ? "Ask About Nearby Areas" : `Reserve ${area.name}`} />
            <a
              href={whatsappLink(`Hi Pizza Mood, I want franchise info for ${area.name}.`)}
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
        <section>
          <h2 className="text-2xl font-black text-slate-900">About {area.name}</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{area.about}</p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            A food outlet here serves local residents and workers. Pizza Mood sells pizza, momos, burgers, cold coffee, shakes and fries, so one outlet suits groups with different tastes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900">Investment</h2>
          <div className="mt-4"><PricingCards /></div>
          <p className="mt-2 text-xs font-semibold text-slate-500">Taxes additional.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
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

        <nav aria-label="Related pages" className="flex flex-wrap gap-4 text-sm font-bold text-sky-700">
          <Link href="/franchise/pune" className="hover:underline">Franchise in Pune</Link>
          <Link href="/franchise/under-10-lakhs" className="hover:underline">Under ₹10 lakhs</Link>
          <Link href="/franchise/cost-in-india" className="hover:underline">Cost guide</Link>
        </nav>
      </div>
    </div>
  );
}
