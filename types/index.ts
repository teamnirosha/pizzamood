export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "site_discussion"
  | "converted"
  | "not_interested"
  | "closed";

export type InvestmentBudget =
  | "₹4–6 Lakh"
  | "₹6–10 Lakh"
  | "₹10–15 Lakh"
  | "₹15 Lakh+"
  | "Need guidance";

export type StoreType =
  | "Cafe"
  | "Kiosk"
  | "Takeaway"
  | "Small QSR"
  | "High Street"
  | "Food Court"
  | "Other";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  city: string;
  preferredLocation: string;
  investmentBudget: InvestmentBudget;
  ownsProperty: boolean | "yes" | "no";
  preferredStoreType: StoreType;
  timeline: string;
  message?: string;
  status: LeadStatus;
  notes?: string[];
  assignedTo?: string;
  source?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    landingPage?: string;
    referrer?: string;
    device?: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export type OpeningHours = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  isClosed: boolean;
  openingTime: string;
  closingTime: string;
};

export type OutletLocation = {
  id: string;
  name: string;
  slug: string;
  city: string;
  area: string;
  state: string;
  country: string;
  postalCode: string;
  address: string;
  phone: string;
  whatsapp: string;
  email?: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  osmUrl?: string;
  shortDescription: string;
  description: string;
  status: "active" | "opening_soon" | "inactive";
  hours: OpeningHours[];
  images: {
    url: string;
    alt: string;
  }[];
  popularProducts: {
    name: string;
    price: string;
    description: string;
    badge?: string;
    image?: string;
  }[];
  amenities: string[];
  nearbyLandmarks: string[];
  seo: {
    title: string;
    description: string;
    focusKeyword: string;
    secondaryKeywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export type FAQItem = {
  id: string;
  category: "Investment & Cost" | "Store & Setup" | "Training & Operations" | "General";
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  investmentYear: string;
  content: string;
  rating: number;
  avatarUrl?: string;
};

export type InvestmentItem = {
  category: string;
  amount: string;
  details: string;
};

export type SiteSettings = {
  brandName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  officialEmail: string;
  headquartersAddress: string;
  startingInvestment: string;
  targetLaunchDays: string;
  supportLevel: string;
  totalOutletsCount: number;
  citiesCount: number;
  customerSatisfaction: string;
  investmentBreakdown: InvestmentItem[];
  disclaimerText: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
};
