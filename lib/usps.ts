import type { Locale } from "@/lib/i18n";

export type UspIconName =
  | "Rocket"
  | "HeartHandshake"
  | "UtensilsCrossed"
  | "Megaphone"
  | "Truck"
  | "ShieldCheck"
  | "TrendingUp";

export type Usp = { id: string; title: string; line: string; icon: UspIconName };

// Owner supplies the facts; the plain-English wording below is a draft for the owner to confirm.
export const USPS: Usp[] = [
  { id: "go-live", title: "Guaranteed 30-day go-live", line: "Your outlet opens within 30 days. Guaranteed.", icon: "Rocket" },
  { id: "hand-holding", title: "Complete hand-holding", line: "We stay with you from day one until opening day, and after.", icon: "HeartHandshake" },
  { id: "menu", title: "A menu that sells to everyone", line: "Pizzas, Momos, Cold Coffee, Shakes, French Fries and Burgers: something for every customer.", icon: "UtensilsCrossed" },
  { id: "marketing", title: "Full digital marketing support", line: "We help promote your outlet online so customers find you.", icon: "Megaphone" },
  { id: "supply", title: "Fresh supplies every day", line: "Fresh raw materials daily. Order through our simple app.", icon: "Truck" },
  { id: "no-hidden-charges", title: "No hidden charges", line: "No surprise costs, not even a visiting fee for site finalization.", icon: "ShieldCheck" },
  { id: "roi", title: "Crystal-clear ROI", line: "We explain your return on investment clearly, in plain numbers.", icon: "TrendingUp" },
];

const USPS_MR: Record<string, { title: string; line: string }> = {
  "go-live": { title: "30 दिवसांत सुरू होण्याची हमी", line: "तुमचे आउटलेट 30 दिवसांत सुरू होते. हमीसह." },
  "hand-holding": { title: "संपूर्ण मार्गदर्शन", line: "पहिल्या दिवसापासून उद्घाटनाच्या दिवसापर्यंत आणि त्यानंतरही आम्ही तुमच्या सोबत असतो." },
  menu: { title: "सर्वांना आवडणारा मेनू", line: "पिझ्झा, मोमोज, कोल्ड कॉफी, शेक्स, फ्रेंच फ्राईज आणि बर्गर: प्रत्येक ग्राहकासाठी काहीतरी." },
  marketing: { title: "संपूर्ण डिजिटल मार्केटिंग सपोर्ट", line: "ग्राहकांना तुमचे आउटलेट सापडावे म्हणून आम्ही ऑनलाइन प्रमोशनमध्ये मदत करतो." },
  supply: { title: "दररोज ताजा पुरवठा", line: "दररोज ताजा कच्चा माल. आमच्या सोप्या ॲपवरून ऑर्डर करा." },
  "no-hidden-charges": { title: "कोणतेही छुपे शुल्क नाही", line: "कोणताही अनपेक्षित खर्च नाही, जागा निश्चित करण्यासाठीचे व्हिजिटिंग शुल्कही नाही." },
  roi: { title: "स्पष्ट ROI", line: "तुमच्या गुंतवणुकीवरील परतावा आम्ही सोप्या आकड्यांत स्पष्ट समजावून सांगतो." },
};

export const getUsps = (lang: Locale): Usp[] =>
  lang === "en" ? USPS : USPS.map((u) => ({ ...u, ...USPS_MR[u.id] }));

export const exclusivityLine = (lang: Locale) =>
  lang === "en" ? EXCLUSIVITY_LINE : "प्रत्येक एरियात फक्त एकच Pizza Mood आउटलेट. एकदा एरिया दिला की संपला.";
export const slogan = (lang: Locale) =>
  lang === "en" ? SLOGAN : "तुमचे Pizza Mood 30 दिवसांत सुरू करा. हमीसह.";

export const EXCLUSIVITY_LINE = "Only ONE Pizza Mood outlet per area. Once it's taken, it's gone.";
export const SLOGAN = "Open your Pizza Mood in 30 days. Guaranteed.";

export const FRANCHISE_PHONE_DISPLAY = "+91 90969 70369";
export const FRANCHISE_PHONE_TEL = "+919096970369";

export const whatsappLink = (text = "Hi Pizza Mood, I want franchise info.") =>
  `https://wa.me/919096970369?text=${encodeURIComponent(text)}`;
