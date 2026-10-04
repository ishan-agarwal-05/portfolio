/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // The link-preview cards read their fonts from disk at request time.
    outputFileTracingIncludes: {
      "/work/[slug]/opengraph-image": ["./assets/og/**"],
      "/opengraph-image": ["./assets/og/**"],
    },
  },
};

export default nextConfig;
