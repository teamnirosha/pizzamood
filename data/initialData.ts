import { PRICING_HEADLINE, MODEL_BY_ID } from "@/lib/pricing";
import { OutletLocation, Lead, FAQItem, Testimonial, SiteSettings } from "@/types";

export const initialSiteSettings: SiteSettings = {
  brandName: "Pizza Mood",
  tagline: "Your Pizza Business Starts Here.",
  primaryPhone: "+91 90969 70369",
  whatsappNumber: "+91 90969 70369",
  officialEmail: "info@pizzamood.in",
  headquartersAddress: "Pizza Mood HQ, Mauli Krupa Complex, Karve Nagar, Pune, Maharashtra 411052",
  startingInvestment: PRICING_HEADLINE,
  targetLaunchDays: "30 Days",
  supportLevel: "360° Support",
  totalOutletsCount: 18,
  citiesCount: 4,
  customerSatisfaction: "98.4%",
  disclaimerText: "*Investment requirements may vary based on store format, location size, city tier, site readiness and local cost factors. Figures provided are indicative starting estimates for a standard takeaway QSR format. Contact Pizza Mood for customized location assessment.",
  seoDefaultTitle: `Pizza Mood Franchise | ${PRICING_HEADLINE}`,
  seoDefaultDescription: "Own a high-profit Pizza Mood outlet in your city with 360° operational support, location selection assistance, staff training and store setup in 30 days.",
};

export const initialLocations: OutletLocation[] = [
  {
    id: "pm-pune-bavdhan",
    name: "Pizza Mood Bavdhan",
    slug: "pune/bavdhan",
    city: "Pune",
    area: "Bavdhan",
    state: "Maharashtra",
    country: "India",
    postalCode: "411021",
    address: "Shop no 7, Odela Square, opp. Vallonia Society, near LMD Chowk, Vaidehi Enclave, Bavdhan, Pune, Maharashtra 411021",
    phone: "+91 78880 85121",
    whatsapp: "+91 78880 85121",
    latitude: 18.511631,
    longitude: 73.7742609,
    googleMapsUrl: "https://www.google.com/maps?cid=2716788203343153877",
    shortDescription: "Pizza, burgers, momos, cold coffee, shakes and fries at Odela Square, near LMD Chowk, Bavdhan.",
    description: "Pizza Mood Bavdhan serves the best pizza in Bavdhan, Pune, along with burgers, momos, cafe-style cold coffee, thick shakes and crispy fries. Find us at Odela Square, opposite Vallonia Society, near LMD Chowk. Dine in, take away, or call to order.",
    status: "active",
    hours: [
      { day: "Monday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Tuesday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Wednesday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Thursday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Friday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Saturday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
      { day: "Sunday", isClosed: false, openingTime: "5:00 PM", closingTime: "11:00 PM" },
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80", alt: "Best pizza in Bavdhan, Pune at Pizza Mood" },
      { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80", alt: "Burgers at Pizza Mood Bavdhan" },
    ],
    model: "cafe",
    menuCategories: ["pizza", "burgers", "momos", "cold-coffee", "shakes", "fries"],
    amenities: ["Dine-In", "Takeaway", "Pizza", "Burgers", "Momos", "Cafe"],
    nearbyLandmarks: ["Odela Square", "LMD Chowk", "Vallonia Society", "Vaidehi Enclave"],
    seo: {
      title: "Best Pizza in Bavdhan, Pune | Pizza Mood Cafe",
      description: "Looking for the best pizza in Bavdhan? Pizza Mood, near LMD Chowk, serves cheese burst pizza, burgers, momos, cold coffee, shakes and fries. Open 5-11 PM. Call 078880 85121.",
      focusKeyword: "best pizza in bavdhan",
      secondaryKeywords: [
        "pizza in bavdhan",
        "pizza near me",
        "pizza near LMD Chowk",
        "pizza shop in bavdhan pune",
        "burger in bavdhan",
        "momos in bavdhan",
        "cafe in bavdhan",
        "cold coffee in bavdhan",
        "pizza restaurant bavdhan",
        "fast food in bavdhan",
        "cheese burst pizza pune",
      ],
    },
    createdAt: "2026-10-16T00:00:00.000Z",
  },
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    category: "Investment & Cost",
    question: "How much does a Pizza Mood franchise cost?",
    answer: `A Pizza Mood franchise comes in two models: ${PRICING_HEADLINE} (total investment). This indicative setup cost covers brand franchise rights, essential commercial kitchen equipment, store exterior branding, initial raw material inventory, staff uniform, and launch marketing support.`
  },
  {
    id: "faq-2",
    category: "Investment & Cost",
    question: `Can I really start a Pizza Mood franchise with ${MODEL_BY_ID.kiosk.lakh}?`,
    answer: `Yes! Our compact Kiosk model has been specifically engineered to eliminate unnecessary expensive fluff. With optimized space requirements starting at 120–250 sq. ft., aspiring entrepreneurs can launch a fully operational store with ${MODEL_BY_ID.kiosk.lakh} setup capital. The Cafe model is ${MODEL_BY_ID.cafe.lakh}.`
  },
  {
    id: "faq-3",
    category: "Store & Setup",
    question: "How long does it take to open a Pizza Mood outlet?",
    answer: "We guarantee a 30-day go-live* from site finalization. The process includes site assessment (Days 1–3), store design & setup (Days 8–15), equipment installation (Days 16–22), staff training (Days 23–26), and trial run leading to grand launch on Day 30."
  },
  {
    id: "faq-4",
    category: "Store & Setup",
    question: "Does Pizza Mood help with location selection?",
    answer: "Absolutely. Location is 80% of QSR success. Our location intelligence team analyzes footfall data, commercial viability, catchment areas, nearby student/office demographics, and competitor presence before approving any store site."
  },
  {
    id: "faq-5",
    category: "Training & Operations",
    question: "Do I need prior restaurant or kitchen experience?",
    answer: "No prior food industry experience is needed. Pizza Mood provides complete 360° operational training for you and your staff. Our simplified SOPs, pre-formulated dough mixes, and standardized sauces ensure anyone can prepare 5-star quality pizzas consistently."
  },
  {
    id: "faq-6",
    category: "Training & Operations",
    question: "Does Pizza Mood supply fresh raw materials?",
    answer: "Yes, we operate a centralized supply ecosystem that delivers standardized pizza dough mixes, proprietary pizza sauces, high-grade 100% mozzarella cheese, packaging boxes, and toppings directly to your store."
  },
  {
    id: "faq-7",
    category: "General",
    question: "What marketing support does Pizza Mood provide?",
    answer: "We provide comprehensive marketing assistance including local store launch campaigns, digital & social media ads setup, Google Business profile optimization, promotional flyers design, and integration with major online food delivery aggregators."
  },
  {
    id: "faq-8",
    category: "General",
    question: "How do I apply for a Pizza Mood franchise?",
    answer: "Simply click the 'Start Your Pizza Mood Franchise' button on this website and submit the 5-step enquiry form. Our franchise development team will call you within 24 hours to discuss site availability in your city."
  },
  {
    id: "faq-9",
    category: "Store & Setup",
    question: "Is the 30-day go-live really guaranteed?",
    answer: "Yes. Pizza Mood guarantees your outlet goes live within 30 days, with hand-holding from day one until opening day and after. The guarantee is subject to the terms of your franchise agreement."
  },
  {
    id: "faq-10",
    category: "General",
    question: "Can another Pizza Mood outlet open near mine?",
    answer: "No. We allow only ONE Pizza Mood outlet (Kiosk or Cafe) per area. Once an area is taken, it is gone, so enquire early."
  },
  {
    id: "faq-11",
    category: "Investment & Cost",
    question: "Are there any hidden charges?",
    answer: "No. There are no hidden charges, not even a visiting fee for site finalization. We also explain your return on investment clearly, in plain numbers."
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Kulkarni",
    role: "Franchise Partner",
    location: "Karve Nagar, Pune",
    investmentYear: "2025",
    content: "I started my Pizza Mood store in Karve Nagar with zero restaurant background. The team handled everything from location assessment to kitchen setup and staff training. We opened within 28 days and crossed our break-even in the first few months!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-2",
    name: "Amit Sharma",
    role: "Franchise Partner",
    location: "Andheri West, Mumbai",
    investmentYear: "2025",
    content: "The low investment barrier was the main reason I chose Pizza Mood over high-cost franchises. Their supply chain delivers fresh dough and sauces reliably, and the customer repeat rate in Adarsh Nagar has been fantastic.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-3",
    name: "Pooja Deshmukh",
    role: "Franchise Partner",
    location: "Warje, Pune",
    investmentYear: "2026",
    content: "Pizza Mood's student combo offerings are a huge hit near RMD Sinhgad college. The franchise support team is always available on WhatsApp for operational guidance whenever we need help.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const initialLeads: Lead[] = [
  {
    id: "PM-1001",
    name: "Vikram Patil",
    phone: "+91 98220 11223",
    whatsapp: "+91 98220 11223",
    email: "vikram.patil@example.com",
    city: "Pune",
    preferredLocation: "Kothrud / Karve Nagar",
    investmentBudget: "Kiosk – ₹7 Lakh",
    ownsProperty: true,
    preferredStoreType: "Takeaway",
    timeline: "Within 30 days",
    message: "I own a 180 sq ft commercial shop in Karve Nagar near Cummins College and want to start a pizza takeaway counter immediately.",
    status: "new",
    notes: ["Lead submitted via website homepage modal.", "Verified property ownership in Karve Nagar."],
    assignedTo: "Rajesh (Franchise Mgr)",
    source: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "pune_franchise_search",
      device: "mobile",
    },
    createdAt: "2026-03-01T14:32:00.000Z",
  },
  {
    id: "PM-1002",
    name: "Sanjay Mehta",
    phone: "+91 98900 44556",
    whatsapp: "+91 98900 44556",
    email: "mehta.sanjay@example.com",
    city: "Mumbai",
    preferredLocation: "Malad West",
    investmentBudget: "Cafe – ₹11 Lakh",
    ownsProperty: false,
    preferredStoreType: "Small QSR",
    timeline: "1–3 months",
    message: "Looking for a small QSR dine-in franchise opportunity in Western suburbs.",
    status: "contacted",
    notes: ["Initial discovery call completed on March 2. Interested in rental site in Malad."],
    assignedTo: "Priya (West Zone Lead)",
    source: {
      utm_source: "facebook",
      utm_medium: "social",
      utm_campaign: "mumbai_entrepreneurs",
      device: "desktop",
    },
    createdAt: "2026-03-02T10:15:00.000Z",
  }
];
