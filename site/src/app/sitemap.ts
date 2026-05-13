import type { MetadataRoute } from "next";
import projectsData from "./data/projects";

const BASE_URL = "https://ugagbc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/games", "/about", "/how-it-works", "/frequently-asked-questions", "/contact"];
  const games = (projectsData as { slug: string }[]).map((g) => ({
    url: `${BASE_URL}/games/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [
    ...staticRoutes.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...games,
  ];
}
