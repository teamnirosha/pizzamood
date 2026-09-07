declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export type EventCategory = "lead_form" | "whatsapp_click" | "call_click" | "location_view" | "map_interaction";

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window === "undefined") return;

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}:`, params);
  }

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Google Tag Manager Data Layer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
};

export const trackLeadFormStep = (step: number, stepName: string) => {
  trackEvent("franchise_lead_step", {
    step_number: step,
    step_name: stepName,
  });
};

export const trackLeadFormSubmission = (leadId: string, city: string, budget: string) => {
  trackEvent("franchise_lead_submitted", {
    lead_id: leadId,
    target_city: city,
    investment_budget: budget,
  });
};

export const trackWhatsAppClick = (source: string, outletName?: string) => {
  trackEvent("whatsapp_click", {
    source,
    outlet_name: outletName || "General Franchise",
  });
};

export const trackPhoneClick = (source: string, phone: string) => {
  trackEvent("call_click", {
    source,
    phone_number: phone,
  });
};

export const getUTMParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};

  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const val = searchParams.get(key);
    if (val) utms[key] = val;
  });

  utms.landingPage = window.location.pathname;
  utms.referrer = document.referrer || "direct";
  utms.device = window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";

  return utms;
};
