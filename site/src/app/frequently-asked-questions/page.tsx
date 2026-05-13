import type { Metadata } from "next";
import { FaqPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Game Builders Club at UGA — meetings, experience, tools, and more.",
  openGraph: { title: "FAQ | Game Builders Club", description: "Common questions answered." },
};

export default function FrequentlyAskedQuestions() {
  return <FaqPage />;
}
