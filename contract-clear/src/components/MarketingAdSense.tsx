import { AdSenseScript } from "@/components/AdSenseScript";
import { CookieConsent } from "@/components/CookieConsent";

/** Cookie consent + AdSense (marketing pages only, after consent). */
export function MarketingAdSense() {
  return (
    <>
      <CookieConsent />
      <AdSenseScript />
    </>
  );
}
