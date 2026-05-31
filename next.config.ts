import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // / → /sv (permanent: false so it's easy to change later)
      { source: "/", destination: "/sv", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
