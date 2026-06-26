import Link from "next/link";
import { Logo } from "@/components/Logo";
import { appPath } from "@/lib/app-url";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-800/60">
        <Logo className="h-14 w-auto" />
        <div className="flex gap-4 items-center text-sm">
          <Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link>
          <Link href={appPath("/login")} className="text-slate-400 hover:text-white">Log in</Link>
          <Link href={appPath("/signup")} className="bg-white text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-slate-100">
            Try free
          </Link>
        </div>
      </nav>

      <section className="relative max-w-6xl mx-auto px-6 pt-14 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-96 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_65%)]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 tracking-tight">
              Understand any contract<br />
              <span className="text-blue-400">in 60 seconds.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-9 max-w-xl md:max-w-none mx-auto md:mx-0 leading-relaxed">
              Paste your NDA, freelance agreement, SaaS terms, or lease. Get plain-English
              red flags, missing clauses, and negotiation tips — no lawyer required.
            </p>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link
                href={appPath("/signup")}
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                Analyze your first contract free →
              </Link>
              <p className="text-slate-500 text-sm">No credit card required · 1 free analysis</p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Logo linked={false} className="h-52 sm:h-56 md:h-64 lg:h-72 w-auto" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: "60 sec", label: "Average analysis time" },
            { stat: "$300/hr", label: "What lawyers charge for this" },
            { stat: "10+", label: "Contract types supported" },
          ].map((item) => (
            <div key={item.stat} className="bg-slate-900 rounded-2xl p-6 text-center border border-slate-800">
              <p className="text-4xl font-bold text-blue-400">{item.stat}</p>
              <p className="text-slate-400 mt-1 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="space-y-6">
          {[
            { step: "1", title: "Paste or upload your contract", body: "Supports PDF uploads or plain text paste. Works with NDAs, freelance contracts, leases, SaaS agreements, and more." },
            { step: "2", title: "Every clause gets reviewed", body: "We scan the full document for one-sided terms, missing protections, and unusual language — built for contracts, not general chat." },
            { step: "3", title: "Get your plain-English report", body: "Red flags with severity ratings, missing protections, key terms extracted, and specific negotiation suggestions — in plain English." },
          ].map((item) => (
            <div key={item.step} className="flex gap-5 items-start bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <span className="text-blue-400 text-xl font-bold min-w-[1.5rem]">{item.step}</span>
              <div>
                <p className="font-semibold mb-1">{item.title}</p>
                <p className="text-slate-400 text-sm">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
