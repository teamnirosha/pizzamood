import type { Lead } from "@/types";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  city: string | null;
  preferred_location: string | null;
  investment_budget: string | null;
  owns_property: boolean;
  preferred_store_type: string | null;
  timeline: string | null;
  message: string | null;
  status: string;
  notes: string[];
  assigned_to: string | null;
  source: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

// Tolerates sparse leads (older records may lack fields).
export const toRow = (l: Partial<Lead> & Pick<Lead, "id" | "name" | "phone" | "status" | "createdAt">): LeadRow => ({
  id: l.id,
  name: l.name,
  phone: l.phone,
  whatsapp: l.whatsapp ?? null,
  email: l.email ?? null,
  city: l.city ?? "Not Specified",
  preferred_location: l.preferredLocation ?? "Flexible",
  investment_budget: l.investmentBudget ?? null,
  owns_property: l.ownsProperty === true || l.ownsProperty === "yes",
  preferred_store_type: l.preferredStoreType ?? null,
  timeline: l.timeline ?? null,
  message: l.message ?? "",
  status: l.status,
  notes: l.notes ?? [],
  assigned_to: l.assignedTo ?? "Unassigned",
  source: (l.source ?? {}) as Record<string, unknown>,
  created_at: l.createdAt,
  updated_at: l.updatedAt ?? l.createdAt,
});

export const fromRow = (r: LeadRow): Lead => ({
  id: r.id,
  name: r.name,
  phone: r.phone,
  whatsapp: r.whatsapp ?? undefined,
  email: r.email ?? "",
  city: r.city ?? "Not Specified",
  preferredLocation: r.preferred_location ?? "Flexible",
  investmentBudget: r.investment_budget as Lead["investmentBudget"],
  ownsProperty: r.owns_property,
  preferredStoreType: r.preferred_store_type as Lead["preferredStoreType"],
  timeline: r.timeline ?? "",
  message: r.message ?? "",
  status: r.status as Lead["status"],
  notes: r.notes ?? [],
  assignedTo: r.assigned_to ?? undefined,
  source: r.source as Lead["source"],
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});
