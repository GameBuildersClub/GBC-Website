import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "./fonts/outfit";
import { poppins } from "./fonts/poppins";
import { orienta } from "./fonts/orienta";
import { BASE_URL, JsonLd, OG_IMAGE, OG_IMAGE_H, OG_IMAGE_W, SITE_DESC, SITE_NAME, siteGraph } from "./lib/seo";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  keywords: [
    "Game Builders Club",
    "UGA game development club",
    "University of Georgia games",
    "student game development",
    "game jam Athens GA",
    "learn game development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESC,
    url: BASE_URL,
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: OG_IMAGE_W, height: OG_IMAGE_H, alt: `${SITE_NAME} — UGA` }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GameBuilderClub",
    title: SITE_NAME,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${poppins.className} ${orienta.variable}`}>
        {children}
        <JsonLd data={siteGraph} />
      </body>
    </html>
  );
}
