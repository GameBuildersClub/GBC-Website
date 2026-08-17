import type { Metadata } from "next";
import { GamesPage } from "../components/SitePages";
import { JsonLd, breadcrumbSchema, gamesListSchema, pageOg } from "../lib/seo";

export const metadata: Metadata = {
  title: "Games",
  description: "Browse all games made by UGA Game Builders Club members — from short jams to full semester projects.",
  alternates: { canonical: "/games" },
  openGraph: pageOg("/games", "Games", "Games made by UGA students, from weekend jams to semester projects."),
};

export default function Games() {
  return (
    <>
      <GamesPage />
      <JsonLd data={gamesListSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Games", path: "/games" },
        ])}
      />
    </>
  );
}
