"use client";
import { useState } from "react";

const plans = [
  {
    name: "Single Analysis",
    price: "$7",
    period: "one time",
    description: "Perfect for reviewing one contract.",
    features: [
      "1 contract analysis",
      "Full red flag report",
      "Missing clause check",
      "Negotiation tips",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE,
    mode: "payment" as const,
    cta: "Buy one analysis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For freelancers and small teams who review contracts regularly.",
    features: [
      "Unlimited analyses",
      "Full red flag report",
      "Missing clause check",
      "Negotiation tips",
      "Analysis history",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION,
    mode: "subscription" as const,
    cta: "Start Pro",
    highlighted: true,
  },
];

export default function PricingPage() {
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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-center mb-2">Simple pricing</h1>
        <p className="text-slate-400 text-center mb-12">
          Cheaper than one hour of a lawyer&apos;s time.
        </p>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-950 border border-red-800 rounded-xl p-4">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.highlighted
                  ? "border-blue-500 bg-blue-950"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {plan.highlighted && (
                <p className="text-xs text-blue-400 font-medium uppercase tracking-wide mb-3">
                  Most popular
                </p>
              )}
              <p className="text-xl font-bold mb-1">{plan.name}</p>
              <p className="text-3xl font-extrabold mb-1">
                {plan.price}
                <span className="text-base font-normal text-slate-400"> / {plan.period}</span>
              </p>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-slate-300 flex items-center gap-2">
                    <span className="text-green-400 flex-shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.priceId, plan.mode)}
                disabled={loading === plan.priceId}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 ${
                  plan.highlighted
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                {loading === plan.priceId ? "Redirecting…" : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
