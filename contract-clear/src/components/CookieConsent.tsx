"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { COOKIE_CONSENT_KEY, isAdsenseConfigured } from "@/lib/adsense";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("pinnacle-consent-update", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("pinnacle-consent-update", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getConsentSnapshot(): boolean {
  return !localStorage.getItem(COOKIE_CONSENT_KEY);
}

function getConsentServerSnapshot(): boolean {
  return false;
}

export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("pinnacle-consent-update"));
  };

  const dismiss = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential-only");
    window.dispatchEvent(new Event("pinnacle-consent-update"));
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl shadow-2xl shadow-black/40 p-5 sm:p-6">
        <p className="text-sm text-pinnacle-muted leading-relaxed mb-4">
          We use essential cookies to run the site and sign you in.
          {isAdsenseConfigured() ? (
            <>
              {" "}
              With your consent, we also use cookies for analytics and Google advertising to
              support our free content. See our{" "}
              <Link href="/cookies" className="text-pinnacle-blue-bright hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-pinnacle-blue-bright hover:underline">
                Privacy Policy
              </Link>
              .
            </>
          ) : (
            <>
              {" "}
              See our{" "}
              <Link href="/cookies" className="text-pinnacle-blue-bright hover:underline">
                Cookie Policy
              </Link>
              .
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={accept}
            className="bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="border border-pinnacle-elevated hover:border-pinnacle-muted text-pinnacle-muted hover:text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
