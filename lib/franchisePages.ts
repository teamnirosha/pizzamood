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

export const getFranchisePage = (slug: string) => FRANCHISE_PAGES.find((p) => p.slug === slug);
