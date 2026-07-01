import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { getAdsenseClientId, shouldIncludeAdSenseScript } from "@/lib/adsense";
import { brand } from "@/lib/brand";
import { createPageMetadata, DEFAULT_TITLE, SITE_NAME } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const adsenseClientId = getAdsenseClientId();
const includeAdSense = shouldIncludeAdSenseScript();

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
      <head>
        {includeAdSense && adsenseClientId ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className={`${inter.className} bg-pinnacle-bg antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
