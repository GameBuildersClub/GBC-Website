import type { Metadata } from "next";
import { HowPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "How It Works",
  description: "No experience needed. Learn how to join GBC, get on a team, and ship a game at the University of Georgia.",
  openGraph: { title: "How It Works | Game Builders Club", description: "How to join and get involved." },
};

export default function HowItWorks() {
  return <HowPage />;
}
