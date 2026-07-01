"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAdsenseClientId,
  hasStoredAdConsent,
  isMarketingPath,
} from "@/lib/adsense";

export function AdSenseScript() {
  const clientId = getAdsenseClientId();
  const pathname = usePathname();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const sync = () => setConsented(hasStoredAdConsent());
    sync();
    window.addEventListener("pinnacle-consent-update", sync);
    return () => window.removeEventListener("pinnacle-consent-update", sync);
  }, []);

  if (!clientId || !consented || !isMarketingPath(pathname)) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
