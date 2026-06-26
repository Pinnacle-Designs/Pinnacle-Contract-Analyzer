"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { appPath, isStaticMarketingSite } from "@/lib/app-url";

const singleFeatures = [
  "1 full contract analysis",
  "Visual risk score (0–100)",
  "Red flags with severity ratings",
  "Missing clause detection",
  "Negotiation scripts you can copy-paste",
  "PDF or text upload",
];

const proFeatures = [
  "Unlimited contract analyses",
  "Everything in Single Analysis",
  "Analysis history & search",
  "Re-run past contracts anytime",
  "Priority processing",
  "Cancel anytime from your account",
];

const comparisonRows = [
  { feature: "Time to first insight", pinnacle: "~60 seconds", lawyer: "Days to schedule", nothing: "Hours of guessing" },
  { feature: "Plain-English output", pinnacle: "Yes", lawyer: "Yes (billable)", nothing: "No" },
  { feature: "Cost per review", pinnacle: "$7–$19/mo", lawyer: "$300+/hr", nothing: "$0 (until it costs you)" },
  { feature: "Negotiation scripts", pinnacle: "Included", lawyer: "Extra fees", nothing: "DIY" },
  { feature: "Missing clause check", pinnacle: "Automatic", lawyer: "Manual review", nothing: "Easy to miss" },
  { feature: "Available 24/7", pinnacle: "Yes", lawyer: "Business hours", nothing: "Yes" },
  { feature: "Legal advice", pinnacle: "No (informational)", lawyer: "Yes", nothing: "No" },
  { feature: "Best for", pinnacle: "Freelancers & SMBs", lawyer: "Complex deals", nothing: "Low-stakes only" },
];

const plans = [
  {
    id: "single",
    name: "Single Analysis",
    monthlyPrice: 7,
    annualPrice: null,
    description: "Review one contract today.",
    features: singleFeatures,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE,
    mode: "payment" as const,
    cta: "Buy one analysis",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 19,
    annualPrice: 190,
    description: "For freelancers and small teams who review contracts regularly.",
    features: proFeatures,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION,
    annualPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION_ANNUAL,
    mode: "subscription" as const,
    cta: "Start Pro",
    highlighted: true,
  },
];

function PlanAccordion({ features }: { features: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 border-t border-pinnacle-elevated pt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm text-pinnacle-blue-bright hover:underline"
      >
        {open ? "Hide what's included" : "See what's included"}
      </button>
      {open && (
        <ul className="mt-3 space-y-2">
          {features.map((f) => (
            <li key={f} className="text-sm text-pinnacle-muted flex gap-2">
              <span className="text-pinnacle-green shrink-0">✓</span> {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PricingPage() {
  const staticSite = isStaticMarketingSite();
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (
    priceId: string | undefined,
    mode: "payment" | "subscription"
  ) => {
    if (!priceId) return;
    setLoading(priceId);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });

      const data = await res.json();

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        setError(data.error ?? "Checkout failed. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-pinnacle-bg text-white flex flex-col">
      <SiteHeader />

      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 flex-1 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Simple pricing</h1>
        <p className="text-pinnacle-muted text-center mb-2">
          Cheaper than one hour of a lawyer&apos;s time.
        </p>
        <p className="text-pinnacle-muted/70 text-center text-sm mb-10">
          vs. $300/hr average attorney rate
        </p>

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-sm ${!annual ? "text-white" : "text-pinnacle-muted"}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-pinnacle-blue" : "bg-pinnacle-elevated"}`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : ""}`}
            />
          </button>
          <span className={`text-sm ${annual ? "text-white" : "text-pinnacle-muted"}`}>
            Annual <span className="text-pinnacle-green text-xs">(2 months free)</span>
          </span>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-950/50 border border-pinnacle-danger/40 rounded-xl p-4">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {plans.map((plan) => {
            const isPro = plan.id === "pro";
            const displayPrice =
              isPro && annual && plan.annualPrice
                ? `$${plan.annualPrice}`
                : `$${plan.monthlyPrice}`;
            const period =
              isPro && annual && plan.annualPrice
                ? "per year"
                : isPro
                ? "per month"
                : "one time";
            const savings =
              isPro && annual && plan.annualPrice
                ? `Save $${plan.monthlyPrice * 12 - plan.annualPrice}`
                : null;
            const checkoutId =
              isPro && annual && plan.annualPriceId
                ? plan.annualPriceId
                : plan.priceId;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border bg-pinnacle-surface ${
                  plan.highlighted
                    ? "border-pinnacle-green/50 ring-1 ring-pinnacle-green/20"
                    : "border-pinnacle-elevated"
                }`}
              >
                {plan.highlighted && (
                  <p className="text-xs text-pinnacle-green font-medium uppercase tracking-wide mb-3">
                    Most popular
                  </p>
                )}
                <p className="text-xl font-bold mb-1">{plan.name}</p>
                <p className="text-3xl font-extrabold text-pinnacle-blue-bright mb-0.5">
                  {displayPrice}
                  <span className="text-base font-normal text-pinnacle-muted"> / {period}</span>
                </p>
                {savings && (
                  <p className="text-pinnacle-green text-xs mb-2">{savings}</p>
                )}
                <p className="text-pinnacle-muted text-sm mb-2">{plan.description}</p>
                <PlanAccordion features={plan.features} />

                <div className="mt-6">
                  {staticSite ? (
                    <a
                      href={appPath("/pricing")}
                      className={`block text-center py-3 rounded-xl font-medium text-sm transition-colors ${
                        plan.highlighted
                          ? "bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white"
                          : "bg-pinnacle-elevated hover:bg-pinnacle-blue/20 text-white border border-pinnacle-elevated"
                      }`}
                    >
                      {plan.cta} →
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCheckout(checkoutId, plan.mode)}
                      disabled={loading === checkoutId || (isPro && annual && !plan.annualPriceId)}
                      className={`w-full py-3 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 ${
                        plan.highlighted
                          ? "bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white"
                          : "bg-pinnacle-elevated hover:bg-pinnacle-blue/20 text-white"
                      }`}
                    >
                      {loading === checkoutId
                        ? "Redirecting…"
                        : isPro && annual && !plan.annualPriceId
                        ? "Annual — contact us"
                        : plan.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-center mb-8">How Pinnacle compares</h2>
          <div className="overflow-x-auto rounded-2xl border border-pinnacle-elevated">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-pinnacle-surface text-left border-b border-pinnacle-elevated">
                  <th className="p-4 font-medium text-pinnacle-muted"> </th>
                  <th className="p-4 font-medium text-pinnacle-blue-bright">Pinnacle</th>
                  <th className="p-4 font-medium text-pinnacle-muted">Lawyer</th>
                  <th className="p-4 font-medium text-pinnacle-muted">Doing nothing</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-pinnacle-elevated/60 last:border-0">
                    <td className="p-4 text-pinnacle-muted">{row.feature}</td>
                    <td className="p-4 font-medium">{row.pinnacle}</td>
                    <td className="p-4 text-pinnacle-muted">{row.lawyer}</td>
                    <td className="p-4 text-pinnacle-muted">{row.nothing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-center text-pinnacle-muted/60 text-xs max-w-md mx-auto mt-6">
          By purchasing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-white">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
          Subscriptions renew until canceled.
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
