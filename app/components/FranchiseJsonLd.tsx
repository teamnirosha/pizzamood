import { getSiteSettings } from "@/lib/db";
import { generateOrganizationSchema, generateUspListSchema } from "@/lib/seo";

export default async function FranchiseJsonLd() {
  const settings = await getSiteSettings();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema(settings)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateUspListSchema()) }} />
    </>
  );
}
