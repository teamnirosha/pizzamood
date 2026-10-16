import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const file = process.argv[2];
if (!url || !key || !file) {
  console.error("Usage: node --env-file=.env.local scripts/import-locations.mjs <locations.json>");
  process.exit(1);
}

const locations = JSON.parse(readFileSync(file, "utf-8"));
const sb = createClient(url, key, { auth: { persistSession: false } });
const { error } = await sb
  .from("locations")
  .upsert(locations.map((l) => ({ id: l.id, slug: l.slug, data: l, created_at: l.createdAt })));
if (error) {
  console.error(error);
  process.exit(1);
}
console.log(`imported ${locations.length} locations`);
