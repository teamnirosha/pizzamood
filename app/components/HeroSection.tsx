"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import FranchiseModal from "./FranchiseModal";
import PricingCards from "./PricingCards";
import { useLocale } from "./LocaleProvider";
import { fill, pricingHeadline, splitGraphemes } from "./homeI18n";
import UspChecklist from "./UspChecklist";
import {
  FRANCHISE_PHONE_DISPLAY,
  FRANCHISE_PHONE_TEL,
  whatsappLink,
} from "@/lib/usps";

// Fixed width AND height per use: identical intrinsic sizes keep later slides from registering as a new (larger) LCP candidate, and keep files small.
const unsplash = (id: string, w: number, h: number, q: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;

const IMG_IDS = [
  "photo-1513104890138-7c749659a591",
  "photo-1568901346375-23c9450c58cd",
  "photo-1625220194771-7ebdea0b70b9",
  "photo-1461023058943-07fcbe16d735",
  "photo-1572490122747-3968b75cc699",
  "photo-1573080496219-bb080dd4f877",
];
// Soft 12%-opacity backdrop needs very little detail; the card image is what visitors look at.
const BG_IMGS = IMG_IDS.map((id) => unsplash(id, 480, 640, 40));
const MENU_IMGS = IMG_IDS.map((id) => unsplash(id, 800, 920, 70));

export default function HeroSection() {
  const { lang, t } = useLocale();
  const h = t.home.hero;
  const MENU_ITEMS = h.items.map((it, i) => ({ ...it, img: MENU_IMGS[i], bg: BG_IMGS[i] }));
  const [modalOpen, setModalOpen] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // Only the first slide loads up front; the rest (and the rotation) start after the page has finished loading.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const go = () => { t = setTimeout(() => setReady(true), 1000); };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => { window.removeEventListener("load", go); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let swap: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setWordIdx((i) => (i + 1) % MENU_IMGS.length);
        setLeaving(false);
      }, 450);
    }, 3200);
    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, [ready]);
  const item = MENU_ITEMS[wordIdx];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Product background, crossfades with the headline word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
      >
        {MENU_ITEMS.map((m, i) => (i === 0 || ready) && (
          <img
            key={m.word}
            src={m.bg}
            alt=""
            width={480}
            height={640}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            className={`hero-slide absolute inset-0 h-full w-full object-cover blur-[2px] ${i === wordIdx ? (ready ? "active" : "static") : ""}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-slate-50" />

      {/* Subtle Background Accent Blobs */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headlines & Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black text-red-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{t.home.exclusivity}</span>
            </div>

            <h1
              aria-label={h.ariaTitle}
              className={`whitespace-nowrap ${lang === "mr" ? "text-[1.45rem]" : "text-[1.7rem]"} font-black ${lang === "mr" ? "tracking-normal leading-[1.45]" : "tracking-tight leading-[1.1]"} text-slate-900 sm:text-[2.6rem] xl:text-[3.4rem]`}
            >
              <span className="block">{h.line1}</span>
              <span className="block">
                <span key={wordIdx} aria-hidden="true" className="text-red-600">
                  {splitGraphemes(item.word).map((ch, i) => (
                    <span
                      key={i}
                      className={leaving ? "letter-out" : "letter-flip"}
                      style={{ animationDelay: `${i * (leaving ? 25 : 60)}ms` }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </span>{" "}
                <span aria-hidden="true">{h.cafe}</span>
              </span>
              <span className="block">
                {h.lineIn && <>{h.lineIn}{" "}</>}
                <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 bg-clip-text text-transparent">
                  {h.days}
                </span>
              </span>
            </h1>

            <p className="text-base font-semibold text-slate-600 sm:text-lg leading-relaxed max-w-2xl">
              {h.introPre && `${h.introPre} `}
              <strong className="text-slate-900 underline decoration-yellow-400 decoration-4">
                {pricingHeadline(t)}
              </strong>
              {h.introPost}
            </p>

            <PricingCards />

            <UspChecklist />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2.5 rounded-full bg-sky-500 border-2 border-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-600 active:translate-y-0"
              >
                {t.home.cta.getDetails}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" /> {t.home.cta.whatsapp}
              </a>
            </div>

            <p className="text-xs font-bold text-slate-500">
              {h.orCall}{" "}
              <a
                href={`tel:${FRANCHISE_PHONE_TEL}`}
                className="font-black text-slate-900 underline"
              >
                {FRANCHISE_PHONE_DISPLAY}
              </a>
              {h.reply}
            </p>
          </div>

          {/* Right Column: High Quality Food Visuals */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Banner Image Container */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-sky-900/20 border-4 border-yellow-400">
                {MENU_ITEMS.map((m, i) => (i === 0 || ready) && (
                  <img
                    key={m.word}
                    src={m.img}
                    alt={fill(h.imgAlt, { word: m.word })}
                    width={800}
                    height={920}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "low"}
                    className={`hero-slide h-[460px] w-full object-cover ${i === wordIdx ? (ready ? "active" : "static") : "absolute inset-0"}`}
                  />
                ))}

                {/* Overlaid Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Overlay Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur-md border border-white/20 shadow-lg">
                  <div
                    key={wordIdx}
                    className="hero-caption flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                        {item.tag}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-xl bg-yellow-400 px-3 py-1 text-xs font-black text-slate-900">
                      {h.highDemand}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge Left */}
              <div className="absolute -top-4 -left-4 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 font-bold">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">
                      {h.expansion}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500">
                      {h.activeOutlets}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-slate-900 p-4 text-white shadow-2xl border border-slate-800 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white font-bold">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">
                      {h.guaranteedOpening}
                    </div>
                    <div className="text-[10px] font-semibold text-yellow-400">
                      {h.locationToLaunch}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FranchiseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
