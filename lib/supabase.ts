import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

// Server-only (uses the service-role key). Returns null when not configured: lib/db.ts then falls back to files.
export function getSupabase(): SupabaseClient | null {
  if (client === undefined) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
    if (!client && process.env.VERCEL) {
      console.warn("[db] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set: leads are NOT persisted on Vercel.");
    }
  }
  return client;
}
