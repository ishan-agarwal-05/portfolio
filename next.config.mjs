/** @type {import('next').NextConfig} */

// Projects used to live under /work/ too, and some entries no longer have a
// page of their own. Old links (LinkedIn, emails) keep working through these.
const movedToProjects = ["qa-reranker", "fake-news-fairness", "lectureai", "eg1311-robot", "educrypto"];
const nowShortEntries = {
  "pwc-rag": "/#work",
  "quadrafort-salesforce": "/#work",
  bundl: "/#projects",
  "teachers-pet": "/#projects",
  "this-site": "/#projects",
};

const nextConfig = {
  async redirects() {
    return [
      ...movedToProjects.map((slug) => ({
        source: `/work/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      ...Object.entries(nowShortEntries).map(([slug, destination]) => ({
        source: `/work/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
  experimental: {
    // The link-preview cards read their fonts from disk at request time.
    outputFileTracingIncludes: {
      "/work/[slug]/opengraph-image": ["./assets/og/**"],
      "/projects/[slug]/opengraph-image": ["./assets/og/**"],
      "/opengraph-image": ["./assets/og/**"],
    },
  },
};

export default nextConfig;
