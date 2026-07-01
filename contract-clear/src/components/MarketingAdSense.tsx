import { CookieConsent } from "@/components/CookieConsent";

/** Cookie consent banner on marketing pages (AdSense script is in root layout for verification). */
export function MarketingAdSense() {
  return <CookieConsent />;
}
