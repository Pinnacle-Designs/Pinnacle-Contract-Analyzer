"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import type { AccountData } from "@/types/account";

const planLabels: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  credits: "Pay as you go",
};

const riskColors = {
  high: "text-red-400 bg-red-950/50 border-red-800",
  medium: "text-yellow-400 bg-yellow-950/50 border-yellow-800",
  low: "text-green-400 bg-green-950/50 border-green-800",
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch("/api/account")
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/login";
          return null;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load account.");
        }
        return res.json() as Promise<AccountData>;
      })
      .then((json) => {
        if (json) setData(json);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const openBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/account/portal", { method: "POST" });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else setError(json.error ?? "Could not open billing portal.");
    } catch {
      setError("Could not open billing portal.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <AppNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Account</h1>
          <p className="text-slate-400 text-sm">Profile, subscription, payments, and scan history.</p>
        </div>

        {loading && <p className="text-slate-400 text-sm">Loading account…</p>}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-xl p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {data && (
          <>
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Profile</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-500 mb-1">Email</dt>
                  <dd className="text-white">{data.profile.email}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Member since</dt>
                  <dd className="text-white">{formatDate(data.profile.memberSince)}</dd>
                </div>
              </dl>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold">Subscription</h2>
                {data.profile.isPro ? (
                  <span className="text-xs font-medium uppercase tracking-wide text-blue-300 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
                    Pro active
                  </span>
                ) : null}
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
                <div>
                  <dt className="text-slate-500 mb-1">Plan</dt>
                  <dd className="text-white font-medium">
                    {planLabels[data.profile.plan] ?? data.profile.plan}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Credits remaining</dt>
                  <dd className="text-white font-medium">
                    {data.profile.isPro ? "Unlimited" : data.profile.credits}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Billing</dt>
                  <dd className="text-white">
                    {data.profile.isPro
                      ? "$19 / month"
                      : data.profile.credits > 0
                      ? "Pay per analysis"
                      : "No active subscription"}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3">
                {!data.profile.isPro && (
                  <Link
                    href="/pricing"
                    className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Upgrade plan
                  </Link>
                )}
                {data.profile.hasStripeCustomer && (
                  <button
                    onClick={openBillingPortal}
                    disabled={portalLoading}
                    className="border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                  >
                    {portalLoading ? "Opening…" : "Manage billing & payment methods"}
                  </button>
                )}
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Payment history</h2>
              {data.payments.length === 0 ? (
                <p className="text-slate-500 text-sm">No payments yet.</p>
              ) : (
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm min-w-[520px]">
                    <thead>
                      <tr className="text-slate-500 text-left border-b border-slate-800">
                        <th className="pb-3 px-2 font-medium">Date</th>
                        <th className="pb-3 px-2 font-medium">Description</th>
                        <th className="pb-3 px-2 font-medium">Amount</th>
                        <th className="pb-3 px-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-slate-800/60 last:border-0">
                          <td className="py-3 px-2 text-slate-300">{formatDate(payment.date)}</td>
                          <td className="py-3 px-2 text-white">{payment.description}</td>
                          <td className="py-3 px-2 text-slate-300">
                            {formatMoney(payment.amount, payment.currency)}
                          </td>
                          <td className="py-3 px-2 capitalize text-slate-400">{payment.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold">Scan history</h2>
                <Link href="/dashboard" className="text-blue-400 text-sm hover:underline">
                  New scan →
                </Link>
              </div>
              {data.analyses.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  No contracts analyzed yet.{" "}
                  <Link href="/dashboard" className="text-blue-400 hover:underline">
                    Analyze your first contract
                  </Link>
                </p>
              ) : (
                <ul className="space-y-3">
                  {data.analyses.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/account/analyses/${item.id}`}
                        className="block bg-slate-950/60 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-colors"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="font-medium text-white">{item.contractType}</p>
                            <p className="text-slate-500 text-xs mt-0.5">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                              riskColors[item.overallRiskScore]
                            }`}
                          >
                            {item.overallRiskScore} risk
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-2">{item.summary}</p>
                        <p className="text-slate-600 text-xs mt-2 line-clamp-1">{item.contractPreview}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
