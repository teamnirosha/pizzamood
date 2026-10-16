import { getSupabase } from "./supabase";
import { fromRow, toRow, type LeadRow } from "./leadRows";
import { DEFAULT_BUDGET } from "./pricing";
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
// Uses Supabase (jsonb `locations` table, see supabase/locations.sql) when configured; otherwise the file / in-memory fallback.
const LOCATIONS_TABLE = "locations";

export async function getLocations(): Promise<OutletLocation[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from(LOCATIONS_TABLE).select("data").order("created_at", { ascending: false });
    if (!error) return (data as { data: OutletLocation }[]).map((r) => r.data);
    console.error("[db] locations read failed, using fallback data:", error.message);
  }
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
  const sb = getSupabase();
  if (sb) {
    const saved = { ...location, updatedAt: new Date().toISOString(), createdAt: location.createdAt || new Date().toISOString() };
    const { error } = await sb
      .from(LOCATIONS_TABLE)
      .upsert({ id: saved.id, slug: saved.slug, data: saved, created_at: saved.createdAt });
    if (error) throw error;
    return saved;
  }
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
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from(LOCATIONS_TABLE).delete().eq("id", id);
    if (error) throw error;
    return true;
  }
  const locations = await getLocations();
  inMemoryLocations = locations.filter((l) => l.id !== id);
  await writeJsonFile(LOCATIONS_FILE, inMemoryLocations);
  return true;
}

// --- LEADS DB ---
// Uses Supabase when configured; otherwise the local file / in-memory fallback (dev only; not persistent on Vercel).
const LEADS_TABLE = "leads";

function mergeLead(lead: Partial<Lead>, existing: Lead | null): Lead {
  return {
    id: lead.id || existing?.id || `PM-${Date.now().toString().slice(-6)}`,
    name: lead.name || existing?.name || "Anonymous",
    phone: lead.phone || existing?.phone || "",
    whatsapp: lead.whatsapp || lead.phone || existing?.whatsapp || "",
    email: lead.email !== undefined ? lead.email : (existing?.email || ""),
    city: lead.city || existing?.city || "Not Specified",
    preferredLocation: lead.preferredLocation || existing?.preferredLocation || "Flexible",
    investmentBudget: lead.investmentBudget || existing?.investmentBudget || DEFAULT_BUDGET,
    ownsProperty: lead.ownsProperty ?? existing?.ownsProperty ?? false,
    preferredStoreType: lead.preferredStoreType || existing?.preferredStoreType || "Takeaway",
    timeline: lead.timeline || existing?.timeline || "Immediate",
    message: lead.message !== undefined ? lead.message : (existing?.message || ""),
    status: lead.status || existing?.status || "new",
    notes: lead.notes || existing?.notes || [],
    assignedTo: lead.assignedTo || existing?.assignedTo || "Unassigned",
    source: lead.source || existing?.source || {},
    createdAt: lead.createdAt || existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function fetchLeadById(id: string): Promise<Lead | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from(LEADS_TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as LeadRow) : null;
}

async function upsertLead(lead: Lead) {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from(LEADS_TABLE).upsert(toRow(lead));
  if (error) throw error;
}

export async function getLeads(): Promise<Lead[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from(LEADS_TABLE).select("*").order("created_at", { ascending: false }).limit(5000);
    if (error) throw error;
    return (data as LeadRow[]).map(fromRow);
  }
  if (!inMemoryLeads) {
    inMemoryLeads = await readJsonFile<Lead[]>(LEADS_FILE, initialLeads);
  }
  return inMemoryLeads;
}

export async function saveLead(lead: Partial<Lead>): Promise<Lead> {
  if (getSupabase()) {
    const existing = lead.id ? await fetchLeadById(lead.id) : null;
    const merged = mergeLead(lead, existing);
    await upsertLead(merged);
    return merged;
  }

  const leads = await getLeads();
  const existingIndex = lead.id ? leads.findIndex((l) => l.id === lead.id) : -1;
  const existing = existingIndex >= 0 ? leads[existingIndex] : null;
  const newLead = mergeLead(lead, existing);

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
  const apply = (target: Lead): Lead => {
    target.status = status;
    target.updatedAt = new Date().toISOString();
    if (note) {
      target.notes = [...(target.notes || []), `[${new Date().toLocaleDateString()}] ${note}`];
    }
    return target;
  };

  if (getSupabase()) {
    const existing = await fetchLeadById(id);
    if (!existing) return null;
    const updated = apply(existing);
    await upsertLead(updated);
    return updated;
  }

  const leads = await getLeads();
  const leadIndex = leads.findIndex((l) => l.id === id);
  if (leadIndex === -1) return null;

  const target = apply(leads[leadIndex]);
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
