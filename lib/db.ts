import { promises as fs } from "fs";
import path from "path";
import { OutletLocation, Lead, FAQItem, Testimonial, SiteSettings } from "@/types";
import {
  initialLocations,
  initialLeads,
  initialFAQs,
  initialTestimonials,
  initialSiteSettings,
} from "@/data/initialData";

const DATA_DIR = path.join(process.cwd(), "data");
const LOCATIONS_FILE = path.join(DATA_DIR, "locations.json");
const LEADS_FILE = path.join(DATA_DIR, "enquiries.json");
const FAQS_FILE = path.join(DATA_DIR, "faqs.json");
const TESTIMONIALS_FILE = path.join(DATA_DIR, "testimonials.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

// In-memory fallback caches for serverless execution environments (like Vercel read-only filesystem)
let inMemoryLocations: OutletLocation[] | null = null;
let inMemoryLeads: Lead[] | null = null;
let inMemoryFAQs: FAQItem[] | null = null;
let inMemoryTestimonials: Testimonial[] | null = null;
let inMemorySettings: SiteSettings | null = null;

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Ignore error if directory already exists or filesystem is read-only
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.warn(`[db] Write file failed (read-only filesystem or permissions): ${filePath}`);
    return false;
  }
}

// --- LOCATIONS DB ---
export async function getLocations(): Promise<OutletLocation[]> {
  if (!inMemoryLocations) {
    inMemoryLocations = await readJsonFile<OutletLocation[]>(LOCATIONS_FILE, initialLocations);
  }
  return inMemoryLocations;
}

export async function getLocationBySlug(slug: string): Promise<OutletLocation | null> {
  const locations = await getLocations();
  const normalizedSlug = slug.toLowerCase().replace(/^\/|\/$/g, "");
  return (
    locations.find(
      (loc) => loc.slug.toLowerCase() === normalizedSlug || `${loc.city.toLowerCase()}/${loc.area.toLowerCase()}` === normalizedSlug
    ) || null
  );
}

export async function saveLocation(location: OutletLocation): Promise<OutletLocation> {
  const locations = await getLocations();
  const index = locations.findIndex((l) => l.id === location.id);
  if (index >= 0) {
    locations[index] = { ...location, updatedAt: new Date().toISOString() };
  } else {
    locations.unshift({ ...location, createdAt: new Date().toISOString() });
  }
  inMemoryLocations = [...locations];
  await writeJsonFile(LOCATIONS_FILE, inMemoryLocations);
  return location;
}

export async function deleteLocation(id: string): Promise<boolean> {
  const locations = await getLocations();
  const filtered = locations.filter((l) => l.id !== id);
  inMemoryLocations = filtered;
  await writeJsonFile(LOCATIONS_FILE, inMemoryLocations);
  return true;
}

// --- LEADS DB ---
export async function getLeads(): Promise<Lead[]> {
  if (!inMemoryLeads) {
    inMemoryLeads = await readJsonFile<Lead[]>(LEADS_FILE, initialLeads);
  }
  return inMemoryLeads;
}

export async function saveLead(lead: Partial<Lead>): Promise<Lead> {
  const leads = await getLeads();
  const newLead: Lead = {
    id: lead.id || `PM-${Date.now().toString().slice(-6)}`,
    name: lead.name || "Anonymous",
    phone: lead.phone || "",
    whatsapp: lead.whatsapp || lead.phone || "",
    email: lead.email || "",
    city: lead.city || "Not Specified",
    preferredLocation: lead.preferredLocation || "Flexible",
    investmentBudget: lead.investmentBudget || "₹4–6 Lakh",
    ownsProperty: lead.ownsProperty ?? false,
    preferredStoreType: lead.preferredStoreType || "Takeaway",
    timeline: lead.timeline || "Immediate",
    message: lead.message || "",
    status: lead.status || "new",
    notes: lead.notes || [],
    assignedTo: lead.assignedTo || "Unassigned",
    source: lead.source || {},
    createdAt: lead.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const existingIndex = leads.findIndex((l) => l.id === newLead.id);
  if (existingIndex >= 0) {
    leads[existingIndex] = newLead;
  } else {
    leads.unshift(newLead);
  }

  inMemoryLeads = [...leads];
  await writeJsonFile(LEADS_FILE, inMemoryLeads);
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"], note?: string): Promise<Lead | null> {
  const leads = await getLeads();
  const leadIndex = leads.findIndex((l) => l.id === id);
  if (leadIndex === -1) return null;

  const target = leads[leadIndex];
  target.status = status;
  target.updatedAt = new Date().toISOString();
  if (note) {
    target.notes = [...(target.notes || []), `[${new Date().toLocaleDateString()}] ${note}`];
  }

  leads[leadIndex] = target;
  inMemoryLeads = [...leads];
  await writeJsonFile(LEADS_FILE, inMemoryLeads);
  return target;
}

// --- FAQS & TESTIMONIALS DB ---
export async function getFAQs(): Promise<FAQItem[]> {
  if (!inMemoryFAQs) {
    inMemoryFAQs = await readJsonFile<FAQItem[]>(FAQS_FILE, initialFAQs);
  }
  return inMemoryFAQs;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!inMemoryTestimonials) {
    inMemoryTestimonials = await readJsonFile<Testimonial[]>(TESTIMONIALS_FILE, initialTestimonials);
  }
  return inMemoryTestimonials;
}

// --- SITE SETTINGS DB ---
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!inMemorySettings) {
    inMemorySettings = await readJsonFile<SiteSettings>(SETTINGS_FILE, initialSiteSettings);
  }
  return inMemorySettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  inMemorySettings = { ...current, ...settings };
  await writeJsonFile(SETTINGS_FILE, inMemorySettings);
  return inMemorySettings;
}
