import type { MetadataRoute } from "next";
import { BASE_URL } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything is public club info, and being cited by AI answer engines is a win,
    // so assistant crawlers are allowed alongside search crawlers.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
