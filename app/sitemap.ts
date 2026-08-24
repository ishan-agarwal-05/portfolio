import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/ask` },
    { url: `${site.url}/contact` },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}` })),
  ];
}
