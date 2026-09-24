import type { MetadataRoute } from "next";
import { agentEnabled, caseStudies, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...(agentEnabled ? [{ url: `${site.url}/ask` }] : []),
    { url: `${site.url}/contact` },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}` })),
  ];
}
