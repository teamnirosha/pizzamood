import type { OutletLocation } from "@/types";

// Pune areas with no Pizza Mood outlet yet. `about` = widely known facts only; add local specifics (rent range, footfall) as the owner supplies them.
export type FranchiseArea = { slug: string; name: string; about: string };

export const FRANCHISE_AREAS: FranchiseArea[] = [
  { slug: "hadapsar", name: "Hadapsar", about: "Hadapsar is a large, busy part of east Pune on the Pune-Solapur Road, next to Magarpatta City and Amanora Park Town, with dense housing and an industrial belt." },
  { slug: "kharadi", name: "Kharadi", about: "Kharadi is an IT hub in east Pune, home to EON IT Park and many office campuses, surrounded by fast-growing residential societies." },
  { slug: "wagholi", name: "Wagholi", about: "Wagholi, on the Pune-Ahilyanagar (Nagar) Road, is a fast-growing residential area with many new housing societies." },
  { slug: "fursungi", name: "Fursungi", about: "Fursungi sits on the Pune-Saswad Road beyond Hadapsar and is growing with new residential projects and local commerce." },
  { slug: "manjari", name: "Manjari", about: "Manjari is an east Pune neighbourhood near Hadapsar on the Solapur Road, with new housing and the Serum Institute campus nearby." },
  { slug: "viman-nagar", name: "Viman Nagar", about: "Viman Nagar is a busy east Pune locality near the airport, known for Phoenix Marketcity, offices, colleges and a large young population." },
  { slug: "magarpatta", name: "Magarpatta", about: "Magarpatta City is a large planned township in Hadapsar with housing, offices and retail in one campus." },
  { slug: "undri", name: "Undri", about: "Undri is a growing residential area in south-east Pune, close to Kondhwa and NIBM Road." },
];

export const getArea = (slug: string) => FRANCHISE_AREAS.find((a) => a.slug === slug);

// An area is taken when an active Pizza Mood outlet already sits in it (one outlet per area).
export const isAreaTaken = (area: FranchiseArea, stores: OutletLocation[]) =>
  stores.some(
    (s) => s.status === "active" && (s.area.toLowerCase() === area.name.toLowerCase() || s.address.toLowerCase().includes(area.name.toLowerCase())),
  );
