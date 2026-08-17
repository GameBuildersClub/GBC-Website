import type { Metadata } from "next";
import { pageOg } from "../lib/seo";
import { ContactPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Game Builders Club — find us on Discord, Instagram, or email us at ugagbc@gmail.com.",
  alternates: { canonical: "/contact" },
  openGraph: pageOg("/contact", "Contact", "Reach GBC on Discord, Instagram, X, or by email."),
};

export default function Contact() {
  return <ContactPage />;
}
