import type { Metadata } from "next";
import { GamesPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "Games",
  description: "Browse all games made by UGA Game Builders Club members — from short jams to full semester projects.",
  openGraph: { title: "Games | Game Builders Club", description: "Games made by UGA students." },
};

export default function Games() {
  return <GamesPage />;
}
