import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "./fonts/outfit";
import { poppins } from "./fonts/poppins";
import { orienta } from "./fonts/orienta";

const BASE_URL = "https://ugagbc.com";
const DESC = "The University of Georgia's student-run game development club. We build games, run jams, and teach each other everything from code to art to music.";

export const metadata: Metadata = {
  title: { default: "Game Builders Club", template: "%s | Game Builders Club" },
  description: DESC,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Game Builders Club",
    title: "Game Builders Club",
    description: DESC,
    url: BASE_URL,
    type: "website",
    images: [{ url: "/assets/club-fall-2025-showcase.jpg", width: 4032, height: 3024, alt: "Game Builders Club" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GameBuilderClub",
    title: "Game Builders Club",
    description: DESC,
    images: ["/assets/club-fall-2025-showcase.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${poppins.className} ${orienta.variable}`}>{children}</body>
    </html>
  );
}
