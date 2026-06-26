import type { Metadata } from "next";
import "./globals.css";
import { createPageMetadata, DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";

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
      <body className="bg-slate-950 antialiased">{children}</body>
    </html>
  );
}
