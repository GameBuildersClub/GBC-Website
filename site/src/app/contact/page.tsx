import type { Metadata } from "next";
import { ContactPage } from "../components/SitePages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Game Builders Club — find us on Discord, Instagram, or email us at ugagbc@gmail.com.",
  openGraph: { title: "Contact | Game Builders Club", description: "Reach out to GBC." },
};

export default function Contact() {
  return <ContactPage />;
}
