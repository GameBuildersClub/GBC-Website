import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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

// Exposes Cloudflare bindings (env.IMAGES, future KV/R2/D1) to `next dev`.
initOpenNextCloudflareForDev();
