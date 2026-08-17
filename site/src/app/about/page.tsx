import type { Metadata } from "next";
import { pageOg } from "../lib/seo";
import { AboutPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Game Builders Club — who we are, what we value, and the officers running the club at UGA.",
  alternates: { canonical: "/about" },
  openGraph: pageOg("/about", "About", "Who we are, what we value, and the officers running the club."),
};

export default function About() {
  return <AboutPage />;
}
