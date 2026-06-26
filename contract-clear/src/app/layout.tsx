import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createPageMetadata, DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  ...createPageMetadata(),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pinnacle-bg antialiased`}>{children}</body>
    </html>
  );
}
