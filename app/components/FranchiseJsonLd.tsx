import { getSiteSettings } from "@/lib/db";
import { generateOrganizationSchema, generateUspListSchema } from "@/lib/seo";

import type { Locale } from "@/lib/i18n";

export default async function FranchiseJsonLd({ lang = "en" }: { lang?: Locale }) {
  const settings = await getSiteSettings();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema(settings)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateUspListSchema(lang)) }} />
    </>
  );
}
