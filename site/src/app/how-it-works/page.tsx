import type { Metadata } from "next";
import { pageOg } from "../lib/seo";
import { HowPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "How It Works",
  description: "No experience needed. Learn how to join GBC, get on a team, and ship a game at the University of Georgia.",
  alternates: { canonical: "/how-it-works" },
  openGraph: pageOg("/how-it-works", "How It Works", "How to join GBC, get on a team, and ship a game."),
};

export default function HowItWorks() {
  return <HowPage />;
}
