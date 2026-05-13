import type { Metadata } from "next";
import { AboutPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Game Builders Club — who we are, what we value, and the officers running the club at UGA.",
  openGraph: { title: "About Us | Game Builders Club", description: "Who we are and what we're about." },
};

export default function About() {
  return <AboutPage />;
}
