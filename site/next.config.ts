import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "shared.akamai.steamstatic.com" },
      { protocol: "https", hostname: "img.itch.zone" },
      { protocol: "https", hostname: "static.itch.io" },
    ],
  },
};

export default nextConfig;
