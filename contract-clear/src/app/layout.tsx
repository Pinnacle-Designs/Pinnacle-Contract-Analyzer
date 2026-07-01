import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { getAdsenseClientId } from "@/lib/adsense";
import { brand } from "@/lib/brand";
import { createPageMetadata, DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const adsenseClientId = getAdsenseClientId();

export const metadata: Metadata = {
  ...createPageMetadata(),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  ...(adsenseClientId
    ? { other: { "google-adsense-account": adsenseClientId } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brand.bg,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pinnacle-bg antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
