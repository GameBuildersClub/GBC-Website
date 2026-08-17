import type { Metadata } from "next";
import { FaqPage } from "../components/SitePages";
import faqs from "../data/faqs";
import { JsonLd, breadcrumbSchema, faqSchema, pageOg } from "../lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Game Builders Club at UGA — meetings, experience, tools, and more.",
  alternates: { canonical: "/frequently-asked-questions" },
  openGraph: pageOg("/frequently-asked-questions", "FAQ", "Common questions about experience, commitment, engines, and fees."),
};

export default function FrequentlyAskedQuestions() {
  return (
    <>
      <FaqPage />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/frequently-asked-questions" },
        ])}
      />
    </>
  );
}
