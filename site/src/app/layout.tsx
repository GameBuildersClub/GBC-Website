import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "./fonts/outfit";
import { poppins } from "./fonts/poppins";

export const metadata: Metadata = {
  title: "Game Builders Club",
  description: "The University of Georgia's premier game development organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${poppins.className}`}>{children}</body>
    </html>
  );
}
