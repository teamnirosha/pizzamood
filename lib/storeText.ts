import type { OutletLocation, FAQItem } from "@/types";
import type { Locale } from "@/lib/i18n";
import { menuItems, menuPhrase } from "@/lib/menu";

// Store records are English-only; Marathi store text is generated from the fields below.
const AREA_MR: Record<string, string> = {
  bavdhan: "बावधन",
  kothrud: "कोथरूड",
  "kothrud/gujrat colony": "कोथरूड / गुजरात कॉलनी",
  warje: "वारजे",
  narhe: "नऱ्हे",
  "ganga dham": "गंगाधाम",
  kondhwa: "कोंढवा",
  parvati: "पर्वती",
  deccan: "डेक्कन",
  baner: "बाणेर",
  wakad: "वाकड",
  shivane: "शिवणे",
  bibwewadi: "बिबवेवाडी",
  nigdi: "निगडी",
  ravet: "रावेत",
  hinjawadi: "हिंजवडी",
  pimpri: "पिंपरी",
  ambegaon: "आंबेगाव",
};
const CITY_MR: Record<string, string> = { pune: "पुणे", mumbai: "मुंबई" };
const DAY_MR: Record<string, string> = {
  Monday: "सोमवार", Tuesday: "मंगळवार", Wednesday: "बुधवार", Thursday: "गुरुवार",
  Friday: "शुक्रवार", Saturday: "शनिवार", Sunday: "रविवार",
};

export const areaName = (area: string, lang: Locale) => (lang === "mr" ? AREA_MR[area.trim().toLowerCase()] ?? area : area);
export const cityName = (city: string, lang: Locale) => (lang === "mr" ? CITY_MR[city.trim().toLowerCase()] ?? city : city);
export const dayName = (day: string, lang: Locale) => (lang === "mr" ? DAY_MR[day] ?? day : day);

// "5:00 PM" -> "संध्याकाळी 5:00" in Marathi; English unchanged.
export function timeLabel(t: string, lang: Locale) {
  if (lang === "en") return t;
  const m = t.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)$/i);
  if (!m) return t;
  const h = parseInt(m[1], 10);
  const pm = m[3].toUpperCase() === "PM";
  const part = pm ? (h === 12 || h < 4 ? "दुपारी" : h < 8 ? "संध्याकाळी" : "रात्री") : h === 12 || h < 4 ? "रात्री" : "सकाळी";
  return `${part} ${m[1]}:${m[2] ?? "00"}`;
}

export function storeMeta(loc: OutletLocation, lang: Locale) {
  const a = areaName(loc.area, lang);
  const c = cityName(loc.city, lang);
  if (lang === "en") {
    return {
      title: loc.seo?.title || `Best Pizza Store in ${loc.area}, ${loc.city} | Pizza Mood`,
      description:
        loc.seo?.description ||
        `Looking for delicious pizza in ${loc.area}? Visit Pizza Mood ${loc.area} for fresh pizzas, fast food, store timings, contact & directions.`,
      keywords: loc.seo?.secondaryKeywords || [
        `best pizza store in ${loc.area}`, `pizza in ${loc.area}`, `pizza near ${loc.area}`, `fast food in ${loc.area}`, "pizza near me", "pizza shop near me",
      ],
    };
  }
  return {
    title: `${a}, ${c} मधील सर्वोत्तम पिझ्झा स्टोअर | Pizza Mood`,
    description: `${a} मध्ये ताजा पिझ्झा शोधताय? Pizza Mood ${a} येथे पिझ्झा, फास्ट फूड, स्टोअरच्या वेळा, संपर्क क्रमांक आणि दिशा एकाच ठिकाणी.`,
    keywords: [`${a} मध्ये पिझ्झा`, `${a} मधील सर्वोत्तम पिझ्झा स्टोअर`, `${a} जवळ पिझ्झा`, `${a} मध्ये फास्ट फूड`, `${c}त पिझ्झा`, "जवळचा पिझ्झा", `Pizza Mood ${loc.area}`, `pizza in ${loc.area}`],
  };
}

// Hero paragraph and schema description (English keeps the stored description).
export function storeDescription(loc: OutletLocation, lang: Locale) {
  if (lang === "en") return loc.description;
  const a = areaName(loc.area, lang);
  return `Pizza Mood ${a} हे ${cityName(loc.city, lang)}मधील ${a} येथील आउटलेट आहे. येथे ${menuPhrase(loc, lang)} मिळतात. वेळा, पत्ता आणि संपर्क क्रमांक या पेजवर पाहता येतील.`;
}

export function storeFaqs(loc: OutletLocation, lang: Locale): FAQItem[] {
  const a = areaName(loc.area, lang);
  const c = cityName(loc.city, lang);
  const phrase = menuPhrase(loc, lang);
  const items = menuItems(loc, lang);
  const h = loc.hours[0];
  const lm = loc.nearbyLandmarks[0];
  const en = lang === "en";
  const faq = (n: number, question: string, answer: string) => ({ id: `faq-${loc.id}-${n}`, category: "General" as const, question, answer });
  return [
    en
      ? faq(1, `Where is Pizza Mood ${a} located?`, `Pizza Mood ${a} is located at ${loc.address}. Nearby landmarks include ${loc.nearbyLandmarks.join(", ")}.`)
      : faq(1, `Pizza Mood ${a} कुठे आहे?`, `Pizza Mood ${a} येथे आहे: ${loc.address}. जवळच्या खुणा: ${loc.nearbyLandmarks.join(", ")}.`),
    ...(h
      ? [en
          ? faq(2, `What are the opening hours of Pizza Mood ${a}?`, `Pizza Mood ${a} is open daily from ${h.openingTime} to ${h.closingTime}.`)
          : faq(2, `Pizza Mood ${a} च्या वेळा काय आहेत?`, `Pizza Mood ${a} दररोज ${timeLabel(h.openingTime, lang)} ते ${timeLabel(h.closingTime, lang)} पर्यंत सुरू असते.`)]
      : []),
    en
      ? faq(3, `Can I order pizza, burgers and momos from Pizza Mood ${a}?`, `Yes. Dine in or take away at the counter${loc.phone ? `, or call or WhatsApp ${loc.phone}` : ""} to order ${phrase}.`)
      : faq(3, `Pizza Mood ${a} मधून पिझ्झा, बर्गर आणि मोमोज ऑर्डर करता येतात का?`, `हो. स्टोअरमध्ये बसून खा किंवा काउंटरवरून पार्सल घ्या. ${loc.phone ? `${loc.phone} वर कॉल किंवा WhatsApp करूनही ` : ""}${phrase} ऑर्डर करता येतात.`),
    en
      ? faq(6, `Does Pizza Mood ${a} offer pizza takeaway?`, `Yes. Pick up fresh ${phrase} for takeaway from Pizza Mood ${a}${lm ? `, near ${lm}` : ""}${loc.phone ? `. Call ${loc.phone} ahead to have it ready` : ""}.`)
      : faq(6, `Pizza Mood ${a} मध्ये पिझ्झा टेकअवे मिळतो का?`, `हो. Pizza Mood ${a} मधून ताजे ${phrase} टेकअवेसाठी घ्या${lm ? `, ${lm} जवळ` : ""}.${loc.phone ? ` तयार ठेवण्यासाठी आधी ${loc.phone} वर कॉल करा.` : ""}`),
    en
      ? faq(4, `Which is the best pizza place in ${a}, ${c}?`, `Pizza Mood ${a} serves ${phrase} in ${a}. Find us near ${lm || a}.`)
      : faq(4, `${a}, ${c} मधील सर्वोत्तम पिझ्झा प्लेस कोणते?`, `Pizza Mood ${a} येथे ${phrase} मिळतात. ${lm || a} जवळ आम्हाला भेटा.`),
    en
      ? faq(5, `What is on the menu at Pizza Mood ${a}?`, `${items.map((x) => x.name).join(", ")}.`)
      : faq(5, `Pizza Mood ${a} च्या मेनूमध्ये काय आहे?`, `${items.map((x) => x.name).join(", ")}.`),
  ];
}

// Fills {placeholders} in dictionary strings.
export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
