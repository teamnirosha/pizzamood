import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { toRow } from "../lib/leadRows.ts";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, e.g. node --env-file=.env.local scripts/import-leads.mjs");
  process.exit(1);
}

const leads = JSON.parse(readFileSync(new URL("../data/enquiries.json", import.meta.url), "utf-8"));
const sb = createClient(url, key, { auth: { persistSession: false } });
const { error } = await sb.from("leads").upsert(leads.map(toRow));
if (error) {
  console.error(error);
  process.exit(1);
}
console.log(`imported ${leads.length} leads`);
