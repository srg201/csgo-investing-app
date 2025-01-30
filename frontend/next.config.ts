import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "community.cloudflare.steamstatic.com",
      },
    ],
  },
};

export default nextConfig;
