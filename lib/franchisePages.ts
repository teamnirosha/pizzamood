import type { Locale } from "@/lib/i18n";
import { MODEL_BY_ID, PRICING_HEADLINE } from "@/lib/pricing";

export type FranchiseSection = {
  heading: string;
  paras?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type FranchisePage = {
  slug: string;
  metaTitle: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  keywords: string[];
  sections: FranchiseSection[];
  faqs: { question: string; answer: string }[];
  related: string[];
  showStores?: boolean;
  showPricing?: boolean;
};

const KIOSK = MODEL_BY_ID.kiosk.lakh;
const CAFE = MODEL_BY_ID.cafe.lakh;
const PRICE_LINE = `${PRICING_HEADLINE}, taxes additional`;

const MENU = "pizza, momos, burgers, cold coffee, shakes and fries";

// One menu versus one product: reasoning only, no sales or profit claims (the site disclaimer says none are promised).
const COMPARE: FranchiseSection = {
  heading: "Single-product franchise vs Pizza Mood",
  table: {
    head: ["", "Single-product franchise", "Pizza Mood"],
    rows: [
      ["Menu", "One product category", "Pizza, momos, burgers, cold coffee, shakes and fries"],
      ["Why customers walk in", "One craving", "Something for every person in a group order"],
      ["Slow hours", "Rest on one product's peak", "Drinks, snacks and meals spread across the day"],
      ["Season", "Sales follow one product's season", "Cold drinks and hot food balance each other"],
      ["Setup and training", "One product kitchen", "One setup, one training, one supply system"],
      ["Territory", "Varies by brand", "Only one Pizza Mood outlet per area"],
    ],
  },
};

const INCLUDED: FranchiseSection = {
  heading: "What you get with a Pizza Mood franchise",
  bullets: [
    "Opening within 30 days of signing, guaranteed",
    "Site finalization support with no visiting fee",
    "Kitchen setup and equipment, including a commercial pizza oven",
    "Staff training on recipes, hygiene and billing",
    "Fresh raw materials every day, ordered through a simple app",
    "Digital marketing support so customers find your outlet",
    "A clear explanation of your return on investment, in plain numbers",
  ],
};

const COMMON_FAQS = [
  {
    question: "How much does a Pizza Mood franchise cost?",
    answer: `${PRICE_LINE}. The Kiosk model is ${KIOSK} and the Cafe model is ${CAFE}. Both include the franchise fee and kitchen setup; the Cafe also includes interiors, CCTV, billing and the opening ceremony.`,
  },
  {
    question: "How long does it take to open a Pizza Mood outlet?",
    answer: "We aim to open your outlet within 30 days of signing, and we guarantee it.",
  },
  {
    question: "Can two Pizza Mood outlets open in the same area?",
    answer: "No. We keep only one Pizza Mood outlet per area. Once an area is taken, it is gone.",
  },
];

export const FRANCHISE_PAGES: FranchisePage[] = [
  {
    slug: "pune",
    metaTitle: "Pizza Mood Franchise in Pune | Pizza, Momos, Burgers",
    description: `Open a Pizza Mood franchise in Pune: ${PRICE_LINE}. Pizza, momos, burgers, coffee and shakes in one outlet. Opens in 30 days. See live Pune stores.`,
    kicker: "Franchise in Pune",
    h1: "Pizza Mood Franchise in Pune",
    intro: `Own a Pizza Mood outlet in Pune and sell ${MENU} under one brand. ${PRICE_LINE}, with setup, training and daily supplies handled for you.`,
    keywords: ["pizza franchise in pune", "food franchise in pune", "cafe franchise in pune", "franchise business in pune", "pizza mood franchise pune"],
    showStores: true,
    showPricing: true,
    sections: [
      {
        heading: "Why start a food franchise in Pune with Pizza Mood",
        paras: [
          "Most food franchises in Pune sell one product. Pizza Mood sells a full menu from one small outlet, so one customer group can order everything in a single visit.",
          "We already run outlets across Pune, so you open with a brand that local customers can see and visit.",
        ],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        question: "Which areas of Pune can I open in?",
        answer: "We keep one outlet per area. The list above shows where Pizza Mood already operates. Tell us your preferred area and our team will confirm if it is available.",
      },
    ],
    related: ["under-10-lakhs", "cost-in-india", "kiosk"],
  },
  {
    slug: "under-10-lakhs",
    metaTitle: "Food Franchise Under ₹10 Lakhs in Pune | Pizza Mood",
    description: `Looking for a food franchise under ₹10 lakhs? The Pizza Mood Kiosk is ${KIOSK}, taxes additional, with setup and training. Opens in 30 days.`,
    kicker: "Low investment franchise",
    h1: `Food Franchise Under ₹10 Lakhs: Pizza Mood Kiosk at ${KIOSK}`,
    intro: `The Pizza Mood Kiosk starts at ${KIOSK} (taxes additional). It is a compact takeaway outlet with a commercial pizza oven and a full setup from us.`,
    keywords: ["food franchise in pune under 10 lakhs", "franchise in pune under 10 lakhs", "low investment food franchise", "pizza franchise under 10 lakhs"],
    showPricing: true,
    sections: [
      {
        heading: "What the ₹7 lakh Kiosk includes",
        bullets: [
          "Franchise fee: ₹4,00,000, taxes additional",
          "Kitchen setup and equipment: ₹3,00,000, including a commercial pizza oven, refrigeration and prep stations",
          "Site finalization support with no visiting fee",
          "Staff training and daily supply of fresh raw materials",
        ],
      },
      {
        heading: "Who the Kiosk suits",
        paras: [
          "The Kiosk fits a first-time food owner who wants a small footprint and a lower start-up cost. If you want seating and interiors, look at the Cafe model.",
        ],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        question: "Is the ₹7 lakh Kiosk price final?",
        answer: "Taxes are additional. Actual investment can vary with your site and equipment choices, and our team will explain the full cost before you commit.",
      },
    ],
    related: ["kiosk", "cost-in-india", "pune"],
  },
  {
    slug: "kiosk",
    metaTitle: "Pizza Kiosk Franchise in India | Pizza Mood Kiosk",
    description: `Start a pizza kiosk franchise with Pizza Mood: ${KIOSK}, taxes additional. Compact takeaway outlet, setup and training included. Opens in 30 days.`,
    kicker: "Kiosk model",
    h1: "Pizza Kiosk Franchise: The Pizza Mood Kiosk",
    intro: `A compact takeaway outlet built around a commercial pizza oven, at ${KIOSK} (taxes additional). Fast to set up and simple to run.`,
    keywords: ["pizza kiosk franchise", "kiosk franchise in india", "pizza stall franchise", "takeaway pizza franchise"],
    showPricing: true,
    sections: [
      {
        heading: "How the Kiosk works",
        paras: [
          "You get a standard counter-style outlet, kitchen equipment and a trained team. We supply fresh raw materials daily and help you with local marketing.",
          "Customers order at the counter, by phone or through delivery apps.",
        ],
      },
      INCLUDED,
      COMPARE,
    ],
    faqs: COMMON_FAQS,
    related: ["under-10-lakhs", "cafe-franchise", "cost-in-india"],
  },
  {
    slug: "pizza-franchise",
    metaTitle: "Pizza Franchise in India: Why Settle for Pizza Alone?",
    description: `A pizza franchise sells one product. Pizza Mood adds momos, burgers, coffee, shakes and fries to one outlet. ${KIOSK} Kiosk, ${CAFE} Cafe, taxes additional.`,
    kicker: "Pizza franchise",
    h1: "Why Settle for a Pizza Franchise When You Can Sell Everything?",
    intro: `Pizza is a strong anchor, and it is where Pizza Mood starts. Then we add ${MENU.replace("pizza, ", "")}, so one outlet serves more customers at more times of day.`,
    keywords: ["pizza franchise in india", "pizza franchise cost", "best pizza franchise in india", "pizza franchise low investment"],
    showPricing: true,
    sections: [
      {
        heading: "The limit of a pizza-only franchise",
        paras: [
          "A pizza-only outlet depends on one product at its peak hours. When a group wants a drink, a snack or something different, they go elsewhere.",
        ],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        question: "Is Pizza Mood a pizza franchise?",
        answer: "Pizza is our anchor product, and the brand also sells momos, burgers, cold coffee, shakes and fries.",
      },
    ],
    related: ["momos-franchise", "burger-franchise", "cost-in-india"],
  },
  {
    slug: "momos-franchise",
    metaTitle: "Momos Franchise in India: Why Settle for Momos Alone?",
    description: `Why settle for a momos franchise? Pizza Mood sells momos with pizza, burgers, coffee and shakes. ${KIOSK} Kiosk, ${CAFE} Cafe, taxes additional.`,
    kicker: "Momos franchise",
    h1: "Why Settle for a Momos Franchise When You Can Sell Pizza and Burgers Too?",
    intro: `Momos are popular, and Pizza Mood sells them. We also sell ${MENU.replace("momos, ", "")}, so a momos craving does not limit your outlet.`,
    keywords: ["momos franchise", "momos franchise in pune", "momos franchise cost", "momos franchise in india"],
    showPricing: true,
    sections: [
      {
        heading: "The limit of a momos-only franchise",
        paras: [
          "A momos-only outlet rests on one dish. A group of friends or a family with different tastes may pass it by for a place that serves everyone.",
        ],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: COMMON_FAQS,
    related: ["pizza-franchise", "burger-franchise", "cost-in-india"],
  },
  {
    slug: "burger-franchise",
    metaTitle: "Burger Franchise in India: Why Settle for Burgers Alone?",
    description: `Why settle for a burger franchise? Pizza Mood sells burgers with pizza, momos, coffee and shakes. ${KIOSK} Kiosk, ${CAFE} Cafe, taxes additional.`,
    kicker: "Burger franchise",
    h1: "Why Settle for a Burger Franchise When You Can Sell Pizza and Momos Too?",
    intro: `Burgers sell, and Pizza Mood has them. We add ${MENU.replace("burgers, ", "")} so your outlet serves more tastes and more orders.`,
    keywords: ["burger franchise", "burger franchise in pune", "burger franchise cost", "burger franchise in india"],
    showPricing: true,
    sections: [
      {
        heading: "The limit of a burger-only franchise",
        paras: ["A burger-only outlet rests on one product, and a larger group often picks a place with more choice."],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: COMMON_FAQS,
    related: ["pizza-franchise", "momos-franchise", "cafe-franchise"],
  },
  {
    slug: "cafe-franchise",
    metaTitle: "Cafe Franchise in Pune | Pizza Mood Cafe Model",
    description: `Start a cafe franchise with food: the Pizza Mood Cafe is ${CAFE}, taxes additional. Pizza, momos, burgers, coffee and shakes. Opens in 30 days.`,
    kicker: "Cafe model",
    h1: `Cafe Franchise in Pune: The Pizza Mood Cafe at ${CAFE}`,
    intro: `A cafe that also serves a full food menu. The Pizza Mood Cafe includes interiors, CCTV, billing and an opening ceremony, at ${CAFE} (taxes additional).`,
    keywords: ["cafe franchise in pune", "cafe franchise", "coffee shop franchise in pune", "cafe franchise with food"],
    showPricing: true,
    sections: [
      {
        heading: "What the ₹11 lakh Cafe includes",
        bullets: [
          "Franchise fee: ₹4,00,000, taxes additional",
          "Kitchen setup and equipment: ₹3,00,000",
          "Interiors, CCTV and billing set: ₹3,00,000",
          "First-day opening ceremony: ₹1,00,000, managed by Pizza Mood",
        ],
      },
      COMPARE,
      INCLUDED,
    ],
    faqs: COMMON_FAQS,
    related: ["kiosk", "under-10-lakhs", "cost-in-india"],
  },
  {
    slug: "cost-in-india",
    metaTitle: "Pizza & Food Franchise Cost in India | Pizza Mood",
    description: `What a food franchise costs in India, compared. Pizza Mood: ${KIOSK} Kiosk, ${CAFE} Cafe, taxes additional, with every cost listed.`,
    kicker: "Cost guide",
    h1: "Pizza and Food Franchise Cost in India",
    intro: "Franchise costs vary a lot by brand, city and format. Here is what Pizza Mood costs, itemised, and how other brands are reported.",
    keywords: ["pizza franchise cost in india", "food franchise cost", "momos franchise cost", "franchise cost comparison"],
    showPricing: true,
    sections: [
      {
        heading: "Pizza Mood cost, item by item",
        table: {
          head: ["Item", "Kiosk", "Cafe"],
          rows: [
            ["Franchise fee (taxes additional)", "₹4,00,000", "₹4,00,000"],
            ["Kitchen setup and equipment", "₹3,00,000", "₹3,00,000"],
            ["Interiors, CCTV and billing set", "Not included", "₹3,00,000"],
            ["Opening ceremony", "Not included", "₹1,00,000"],
            ["Total", MODEL_BY_ID.kiosk.formattedTotal, MODEL_BY_ID.cafe.formattedTotal],
          ],
        },
      },
      {
        heading: "How other brands are reported",
        paras: [
          "These are third-party estimates from franchise blogs, not figures confirmed by the brands. Sources disagree, and brands change their terms. Ask each brand for its current disclosure before you compare.",
        ],
        table: {
          head: ["Brand", "Reported investment (approximate)"],
          rows: [
            ["La Pino'z", "₹20 lakh to ₹1 crore"],
            ["Mojo Pizza", "₹10 lakh to ₹60 lakh"],
            ["Oven Story", "₹10 lakh to ₹70 lakh"],
            ["Wow! Momo", "₹8 lakh to ₹35 lakh, by city"],
          ],
        },
      },
      {
        heading: "What to compare besides the headline number",
        bullets: [
          "What the franchise fee covers and what is extra",
          "Whether kitchen equipment, interiors and the opening are included",
          "Ongoing fees and supply terms",
          "How many products you can sell from one outlet",
        ],
      },
    ],
    faqs: COMMON_FAQS,
    related: ["under-10-lakhs", "pune", "pizza-franchise"],
  },
];


// ---- Marathi (default language). Slugs, order and structure mirror the English pages above. ----
const KIOSK_MR = "₹7 लाख";
const CAFE_MR = "₹11 लाख";
const PRICE_LINE_MR = `किओस्क ${KIOSK_MR} · कॅफे ${CAFE_MR}, कर अतिरिक्त`;
const MENU_MR = "पिझ्झा, मोमोज, बर्गर, कोल्ड कॉफी, शेक्स आणि फ्राईज";

const COMPARE_MR: FranchiseSection = {
  heading: "एकाच प्रॉडक्टची फ्रँचायझी की Pizza Mood",
  table: {
    head: ["", "एकाच प्रॉडक्टची फ्रँचायझी", "Pizza Mood"],
    rows: [
      ["मेनू", "एकच प्रॉडक्ट कॅटेगरी", "पिझ्झा, मोमोज, बर्गर, कोल्ड कॉफी, शेक्स आणि फ्राईज"],
      ["ग्राहक का येतात", "एकच क्रेव्हिंग", "ग्रुप ऑर्डरमध्ये प्रत्येकासाठी काहीतरी"],
      ["कमी गर्दीचे तास", "एका प्रॉडक्टच्या पीक टाइमवर अवलंबून", "ड्रिंक्स, स्नॅक्स आणि जेवण दिवसभरात विभागलेले"],
      ["सीझन", "विक्री एका प्रॉडक्टच्या सीझनवर अवलंबून", "थंड ड्रिंक्स आणि गरम पदार्थ एकमेकांना संतुलित करतात"],
      ["सेटअप आणि ट्रेनिंग", "एका प्रॉडक्टचे किचन", "एक सेटअप, एक ट्रेनिंग, एक सप्लाय सिस्टीम"],
      ["टेरिटरी", "ब्रँडनुसार वेगळी", "प्रत्येक एरियात फक्त एक Pizza Mood आउटलेट"],
    ],
  },
};

const INCLUDED_MR: FranchiseSection = {
  heading: "Pizza Mood फ्रँचायझीसोबत तुम्हाला काय मिळते",
  bullets: [
    "करारानंतर 30 दिवसांत आउटलेट सुरू, हमीसह",
    "जागा निश्चित करण्यासाठी मदत, कोणतीही व्हिजिट फी नाही",
    "किचन सेटअप आणि उपकरणे, कमर्शियल पिझ्झा ओव्हनसह",
    "रेसिपी, स्वच्छता आणि बिलिंगचे स्टाफ ट्रेनिंग",
    "रोज ताजा कच्चा माल, सोप्या अॅपमधून ऑर्डर करा",
    "डिजिटल मार्केटिंग सपोर्ट, म्हणजे ग्राहकांना तुमचे आउटलेट सापडेल",
    "तुमच्या गुंतवणुकीवरील परताव्याचे सोप्या आकड्यांत स्पष्ट स्पष्टीकरण",
  ],
};

const COMMON_FAQS_MR = [
  {
    question: "Pizza Mood फ्रँचायझीची किंमत किती आहे?",
    answer: `${PRICE_LINE_MR}. किओस्क मॉडेल ${KIOSK_MR} आणि कॅफे मॉडेल ${CAFE_MR} आहे. दोन्हीमध्ये फ्रँचायझी फी आणि किचन सेटअप समाविष्ट आहे; कॅफेमध्ये इंटिरियर, CCTV, बिलिंग आणि ओपनिंग सेरेमनीसुद्धा आहे.`,
  },
  {
    question: "Pizza Mood आउटलेट सुरू व्हायला किती वेळ लागतो?",
    answer: "करार झाल्यापासून 30 दिवसांत तुमचे आउटलेट सुरू करण्याचे आमचे ध्येय आहे, आणि त्याची आम्ही हमी देतो.",
  },
  {
    question: "एकाच एरियात दोन Pizza Mood आउटलेट सुरू होऊ शकतात का?",
    answer: "नाही. आम्ही प्रत्येक एरियात फक्त एकच Pizza Mood आउटलेट ठेवतो. एकदा एरिया घेतला गेला की तो संपला.",
  },
];

const FRANCHISE_PAGES_MR: FranchisePage[] = [
  {
    slug: "pune",
    metaTitle: "पुण्यात फ्रँचायझी: Pizza Mood फ्रँचायझी | पिझ्झा, मोमोज, बर्गर",
    description: `पुण्यात Pizza Mood फ्रँचायझी सुरू करा: ${PRICE_LINE_MR}. एकाच आउटलेटमध्ये पिझ्झा, मोमोज, बर्गर, कॉफी आणि शेक्स. 30 दिवसांत सुरू. पुण्यातील सध्याची आउटलेट्स पहा.`,
    kicker: "पुण्यात फ्रँचायझी",
    h1: "पुण्यात Pizza Mood फ्रँचायझी",
    intro: `पुण्यात Pizza Mood आउटलेटचे मालक व्हा आणि एकाच ब्रँडखाली ${MENU_MR} विका. ${PRICE_LINE_MR}; सेटअप, ट्रेनिंग आणि रोजचा माल आम्ही सांभाळतो.`,
    keywords: ["पुण्यात फ्रँचायझी", "पुणे फ्रँचायझी", "पुण्यात पिझ्झा फ्रँचायझी", "पुण्यात फूड फ्रँचायझी", "पुण्यात कॅफे फ्रँचायझी", "फ्रँचायझी बिझनेस पुणे", "pizza franchise in pune", "food franchise in pune", "pizza mood franchise pune"],
    showStores: true,
    showPricing: true,
    sections: [
      {
        heading: "पुण्यात Pizza Mood सोबत फूड फ्रँचायझी का सुरू करावी",
        paras: [
          "पुण्यातील बहुतेक फूड फ्रँचायझी एकच प्रॉडक्ट विकतात. Pizza Mood एका छोट्या आउटलेटमधून पूर्ण मेनू विकते, त्यामुळे एका ग्रुपमधील प्रत्येकजण एकाच भेटीत हवे ते ऑर्डर करू शकतो.",
          "आमची आउटलेट्स पुण्यात आधीच सुरू आहेत, म्हणून तुम्ही स्थानिक ग्राहकांना दिसणाऱ्या, ओळखीच्या ब्रँडसह सुरुवात करता.",
        ],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: [
      ...COMMON_FAQS_MR,
      {
        question: "पुण्यातील कोणत्या एरियांत मी आउटलेट सुरू करू शकतो?",
        answer: "आम्ही प्रत्येक एरियात एकच आउटलेट ठेवतो. वरील यादीत Pizza Mood आधीच कुठे आहे ते दिसते. तुमचा आवडता एरिया सांगा, तो उपलब्ध आहे का ते आमची टीम कळवेल.",
      },
    ],
    related: ["under-10-lakhs", "cost-in-india", "kiosk"],
  },
  {
    slug: "under-10-lakhs",
    metaTitle: "10 लाखांखालील फूड फ्रँचायझी, पुणे | Pizza Mood",
    description: `10 लाखांखालील फ्रँचायझी हवी आहे? Pizza Mood किओस्क ${KIOSK_MR}, कर अतिरिक्त, सेटअप आणि ट्रेनिंगसह. 30 दिवसांत सुरू.`,
    kicker: "कमी गुंतवणुकीची फ्रँचायझी",
    h1: `१० लाखांखालील फूड फ्रँचायझी: Pizza Mood किओस्क ${KIOSK_MR} मध्ये`,
    intro: `Pizza Mood किओस्क ${KIOSK_MR} पासून सुरू होतो (कर अतिरिक्त). हे कमर्शियल पिझ्झा ओव्हन असलेले छोटे टेकअवे आउटलेट आहे, आणि पूर्ण सेटअप आम्ही करून देतो.`,
    keywords: ["१० लाखांखालील फ्रँचायझी", "10 लाखांखालील फ्रँचायझी", "10 लाखाखालील फ्रँचायझी", "पुण्यात 10 लाखांखालील फूड फ्रँचायझी", "कमी गुंतवणुकीची फ्रँचायझी", "कमी बजेट फ्रँचायझी", "food franchise in pune under 10 lakhs", "low investment food franchise"],
    showPricing: true,
    sections: [
      {
        heading: `${KIOSK_MR} च्या किओस्कमध्ये काय मिळते`,
        bullets: [
          "फ्रँचायझी फी: ₹4,00,000, कर अतिरिक्त",
          "किचन सेटअप आणि उपकरणे: ₹3,00,000, कमर्शियल पिझ्झा ओव्हन, रेफ्रिजरेशन आणि प्रेप स्टेशन्ससह",
          "जागा निश्चित करण्यासाठी मदत, कोणतीही व्हिजिट फी नाही",
          "स्टाफ ट्रेनिंग आणि रोज ताजा कच्चा माल",
        ],
      },
      {
        heading: "किओस्क कोणासाठी योग्य आहे",
        paras: [
          "पहिल्यांदाच फूड बिझनेस सुरू करणाऱ्यांसाठी, ज्यांना कमी जागा आणि कमी सुरुवाती खर्च हवा आहे, त्यांच्यासाठी किओस्क योग्य आहे. बसण्याची सोय आणि इंटिरियर हवे असल्यास कॅफे मॉडेल पहा.",
        ],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: [
      ...COMMON_FAQS_MR,
      {
        question: `${KIOSK_MR} ही किओस्कची अंतिम किंमत आहे का?`,
        answer: "कर अतिरिक्त आहे. तुमची जागा आणि उपकरणांच्या निवडीनुसार प्रत्यक्ष गुंतवणूक बदलू शकते, आणि तुम्ही निर्णय घेण्यापूर्वी आमची टीम पूर्ण खर्च समजावून सांगेल.",
      },
    ],
    related: ["kiosk", "cost-in-india", "pune"],
  },
  {
    slug: "kiosk",
    metaTitle: "पिझ्झा किओस्क फ्रँचायझी | Pizza Mood किओस्क",
    description: `Pizza Mood सोबत पिझ्झा किओस्क फ्रँचायझी सुरू करा: ${KIOSK_MR}, कर अतिरिक्त. छोटे टेकअवे आउटलेट, सेटअप आणि ट्रेनिंगसह. 30 दिवसांत सुरू.`,
    kicker: "किओस्क मॉडेल",
    h1: "पिझ्झा किओस्क फ्रँचायझी: Pizza Mood किओस्क",
    intro: `कमर्शियल पिझ्झा ओव्हनभोवती बांधलेले छोटे टेकअवे आउटलेट, ${KIOSK_MR} मध्ये (कर अतिरिक्त). सेटअप लवकर होतो आणि चालवायला सोपे आहे.`,
    keywords: ["पिझ्झा किओस्क फ्रँचायझी", "किओस्क फ्रँचायझी", "पिझ्झा स्टॉल फ्रँचायझी", "टेकअवे पिझ्झा फ्रँचायझी", "pizza kiosk franchise", "kiosk franchise in india"],
    showPricing: true,
    sections: [
      {
        heading: "किओस्क कसा चालतो",
        paras: [
          "तुम्हाला स्टँडर्ड काउंटर-स्टाइल आउटलेट, किचन उपकरणे आणि प्रशिक्षित टीम मिळते. आम्ही रोज ताजा कच्चा माल पुरवतो आणि स्थानिक मार्केटिंगमध्ये मदत करतो.",
          "ग्राहक काउंटरवर, फोनवर किंवा डिलिव्हरी अॅप्सवरून ऑर्डर करतात.",
        ],
      },
      INCLUDED_MR,
      COMPARE_MR,
    ],
    faqs: COMMON_FAQS_MR,
    related: ["under-10-lakhs", "cafe-franchise", "cost-in-india"],
  },
  {
    slug: "pizza-franchise",
    metaTitle: "पिझ्झा फ्रँचायझी: फक्त पिझ्झावरच का थांबायचे? | Pizza Mood",
    description: `पिझ्झा फ्रँचायझी एकच प्रॉडक्ट विकते. Pizza Mood एकाच आउटलेटमध्ये मोमोज, बर्गर, कॉफी, शेक्स आणि फ्राईजची भर घालते. किओस्क ${KIOSK_MR}, कॅफे ${CAFE_MR}, कर अतिरिक्त.`,
    kicker: "पिझ्झा फ्रँचायझी",
    h1: "सगळे विकता येत असताना फक्त पिझ्झा फ्रँचायझीवर का थांबायचे?",
    intro: `पिझ्झा हा मजबूत आधार आहे, आणि Pizza Mood तिथूनच सुरू होते. त्यात आम्ही मोमोज, बर्गर, कोल्ड कॉफी, शेक्स आणि फ्राईज जोडतो, म्हणजे एक आउटलेट दिवसाच्या जास्त वेळांत जास्त ग्राहकांना सेवा देते.`,
    keywords: ["पिझ्झा फ्रँचायझी", "पिझ्झा फ्रँचायझी किंमत", "पिझ्झा फ्रँचायझी कमी गुंतवणूक", "भारतातील सर्वोत्तम पिझ्झा फ्रँचायझी", "pizza franchise in india", "pizza franchise cost"],
    showPricing: true,
    sections: [
      {
        heading: "फक्त पिझ्झा फ्रँचायझीची मर्यादा",
        paras: [
          "फक्त पिझ्झा विकणारे आउटलेट त्याच्या पीक तासांत एकाच प्रॉडक्टवर अवलंबून असते. ग्रुपला ड्रिंक, स्नॅक किंवा काहीतरी वेगळे हवे असेल तर ते दुसरीकडे जातात.",
        ],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: [
      ...COMMON_FAQS_MR,
      {
        question: "Pizza Mood ही पिझ्झा फ्रँचायझी आहे का?",
        answer: "पिझ्झा हे आमचे मुख्य प्रॉडक्ट आहे, आणि ब्रँड मोमोज, बर्गर, कोल्ड कॉफी, शेक्स आणि फ्राईजसुद्धा विकतो.",
      },
    ],
    related: ["momos-franchise", "burger-franchise", "cost-in-india"],
  },
  {
    slug: "momos-franchise",
    metaTitle: "मोमोज फ्रँचायझी: फक्त मोमोजवरच का थांबायचे? | Pizza Mood",
    description: `मोमोज फ्रँचायझीवरच का थांबायचे? Pizza Mood मोमोजसोबत पिझ्झा, बर्गर, कॉफी आणि शेक्स विकते. किओस्क ${KIOSK_MR}, कॅफे ${CAFE_MR}, कर अतिरिक्त.`,
    kicker: "मोमोज फ्रँचायझी",
    h1: "पिझ्झा आणि बर्गरही विकता येत असताना फक्त मोमोज फ्रँचायझीवर का थांबायचे?",
    intro: "मोमोज लोकप्रिय आहेत, आणि Pizza Mood ते विकते. आम्ही पिझ्झा, बर्गर, कोल्ड कॉफी, शेक्स आणि फ्राईजही विकतो, म्हणून मोमोजच्या क्रेव्हिंगवर तुमचे आउटलेट मर्यादित राहत नाही.",
    keywords: ["मोमोज फ्रँचायझी", "पुण्यात मोमोज फ्रँचायझी", "मोमोज फ्रँचायझी किंमत", "momos franchise", "momos franchise in pune", "momos franchise cost"],
    showPricing: true,
    sections: [
      {
        heading: "फक्त मोमोज फ्रँचायझीची मर्यादा",
        paras: [
          "फक्त मोमोज विकणारे आउटलेट एकाच पदार्थावर अवलंबून असते. वेगवेगळ्या आवडीनिवडी असलेले मित्र किंवा कुटुंब सगळ्यांना काही ना काही मिळेल अशा ठिकाणी जाणे पसंत करू शकतात.",
        ],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: COMMON_FAQS_MR,
    related: ["pizza-franchise", "burger-franchise", "cost-in-india"],
  },
  {
    slug: "burger-franchise",
    metaTitle: "बर्गर फ्रँचायझी: फक्त बर्गरवरच का थांबायचे? | Pizza Mood",
    description: `बर्गर फ्रँचायझीवरच का थांबायचे? Pizza Mood बर्गरसोबत पिझ्झा, मोमोज, कॉफी आणि शेक्स विकते. किओस्क ${KIOSK_MR}, कॅफे ${CAFE_MR}, कर अतिरिक्त.`,
    kicker: "बर्गर फ्रँचायझी",
    h1: "पिझ्झा आणि मोमोजही विकता येत असताना फक्त बर्गर फ्रँचायझीवर का थांबायचे?",
    intro: "बर्गर विकले जातात, आणि Pizza Mood कडे ते आहेत. आम्ही पिझ्झा, मोमोज, कोल्ड कॉफी, शेक्स आणि फ्राईज जोडतो, म्हणजे तुमचे आउटलेट जास्त आवडीनिवडी आणि जास्त ऑर्डर्स सांभाळते.",
    keywords: ["बर्गर फ्रँचायझी", "पुण्यात बर्गर फ्रँचायझी", "बर्गर फ्रँचायझी किंमत", "burger franchise", "burger franchise in pune", "burger franchise cost"],
    showPricing: true,
    sections: [
      {
        heading: "फक्त बर्गर फ्रँचायझीची मर्यादा",
        paras: ["फक्त बर्गर विकणारे आउटलेट एकाच प्रॉडक्टवर अवलंबून असते, आणि मोठा ग्रुप अनेकदा जास्त पर्याय असलेले ठिकाण निवडतो."],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: COMMON_FAQS_MR,
    related: ["pizza-franchise", "momos-franchise", "cafe-franchise"],
  },
  {
    slug: "cafe-franchise",
    metaTitle: "पुण्यात कॅफे फ्रँचायझी | Pizza Mood कॅफे मॉडेल",
    description: `फूडसह कॅफे फ्रँचायझी सुरू करा: Pizza Mood कॅफे ${CAFE_MR}, कर अतिरिक्त. पिझ्झा, मोमोज, बर्गर, कॉफी आणि शेक्स. 30 दिवसांत सुरू.`,
    kicker: "कॅफे मॉडेल",
    h1: `पुण्यात कॅफे फ्रँचायझी: Pizza Mood कॅफे ${CAFE_MR} मध्ये`,
    intro: `पूर्ण फूड मेनू असलेला कॅफे. Pizza Mood कॅफेमध्ये इंटिरियर, CCTV, बिलिंग आणि ओपनिंग सेरेमनी समाविष्ट आहे, ${CAFE_MR} मध्ये (कर अतिरिक्त).`,
    keywords: ["पुण्यात कॅफे फ्रँचायझी", "कॅफे फ्रँचायझी", "कॉफी शॉप फ्रँचायझी पुणे", "फूडसह कॅफे फ्रँचायझी", "cafe franchise in pune", "cafe franchise with food"],
    showPricing: true,
    sections: [
      {
        heading: `${CAFE_MR} च्या कॅफेमध्ये काय मिळते`,
        bullets: [
          "फ्रँचायझी फी: ₹4,00,000, कर अतिरिक्त",
          "किचन सेटअप आणि उपकरणे: ₹3,00,000",
          "इंटिरियर, CCTV आणि बिलिंग सेट: ₹3,00,000",
          "पहिल्या दिवसाची ओपनिंग सेरेमनी: ₹1,00,000, Pizza Mood कडून व्यवस्थापित",
        ],
      },
      COMPARE_MR,
      INCLUDED_MR,
    ],
    faqs: COMMON_FAQS_MR,
    related: ["kiosk", "under-10-lakhs", "cost-in-india"],
  },
  {
    slug: "cost-in-india",
    metaTitle: "पिझ्झा आणि फूड फ्रँचायझी किंमत, भारत | Pizza Mood",
    description: `भारतात फूड फ्रँचायझीला किती खर्च येतो, तुलनेसह. Pizza Mood: किओस्क ${KIOSK_MR}, कॅफे ${CAFE_MR}, कर अतिरिक्त, प्रत्येक खर्च यादीसह.`,
    kicker: "किंमत मार्गदर्शक",
    h1: "पिझ्झा आणि फूड फ्रँचायझीची किंमत, भारत",
    intro: "फ्रँचायझीचा खर्च ब्रँड, शहर आणि फॉरमॅटनुसार खूप बदलतो. Pizza Mood चा खर्च बाबीनिहाय आणि इतर ब्रँड्सबद्दल काय नोंदवले जाते ते येथे आहे.",
    keywords: ["फ्रँचायझी किंमत", "फ्रँचायझी खर्च", "पिझ्झा फ्रँचायझी किंमत", "फूड फ्रँचायझी खर्च", "मोमोज फ्रँचायझी किंमत", "pizza franchise cost in india", "food franchise cost", "franchise cost comparison"],
    showPricing: true,
    sections: [
      {
        heading: "Pizza Mood चा खर्च, बाबीनिहाय",
        table: {
          head: ["बाब", "किओस्क", "कॅफे"],
          rows: [
            ["फ्रँचायझी फी (कर अतिरिक्त)", "₹4,00,000", "₹4,00,000"],
            ["किचन सेटअप आणि उपकरणे", "₹3,00,000", "₹3,00,000"],
            ["इंटिरियर, CCTV आणि बिलिंग सेट", "समाविष्ट नाही", "₹3,00,000"],
            ["ओपनिंग सेरेमनी", "समाविष्ट नाही", "₹1,00,000"],
            ["एकूण", MODEL_BY_ID.kiosk.formattedTotal, MODEL_BY_ID.cafe.formattedTotal],
          ],
        },
      },
      {
        heading: "इतर ब्रँड्सबद्दल काय नोंदवले जाते",
        paras: [
          "हे फ्रँचायझी ब्लॉग्समधील तिसऱ्या पक्षाचे अंदाज आहेत, ब्रँड्सनी पुष्टी केलेले आकडे नाहीत. स्रोतांमध्ये तफावत असते आणि ब्रँड्स त्यांच्या अटी बदलतात. तुलना करण्यापूर्वी प्रत्येक ब्रँडकडून त्यांचा सध्याचा तपशील मागवा.",
        ],
        table: {
          head: ["ब्रँड", "नोंदवलेली गुंतवणूक (अंदाजे)"],
          rows: [
            ["La Pino'z", "₹20 लाख ते ₹1 कोटी"],
            ["Mojo Pizza", "₹10 लाख ते ₹60 लाख"],
            ["Oven Story", "₹10 लाख ते ₹70 लाख"],
            ["Wow! Momo", "₹8 लाख ते ₹35 लाख, शहरानुसार"],
          ],
        },
      },
      {
        heading: "मुख्य आकड्याशिवाय आणखी काय तपासावे",
        bullets: [
          "फ्रँचायझी फीमध्ये काय येते आणि काय वेगळे द्यावे लागते",
          "किचन उपकरणे, इंटिरियर आणि ओपनिंग समाविष्ट आहे का",
          "सततचे शुल्क आणि सप्लायच्या अटी",
          "एका आउटलेटमधून किती प्रॉडक्ट्स विकता येतात",
        ],
      },
    ],
    faqs: COMMON_FAQS_MR,
    related: ["under-10-lakhs", "pune", "pizza-franchise"],
  },
];

export const getFranchisePages = (lang: Locale) => (lang === "mr" ? FRANCHISE_PAGES_MR : FRANCHISE_PAGES);
export const getFranchisePage = (slug: string, lang: Locale = "en") => getFranchisePages(lang).find((p) => p.slug === slug);

// Fills {placeholders} in dictionary strings.
export const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");
