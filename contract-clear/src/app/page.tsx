import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <nav className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        <Logo />
        <div className="flex gap-4 items-center text-sm">
          <Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link>
          <Link href="/login" className="text-slate-400 hover:text-white">Log in</Link>
          <Link href="/signup" className="bg-white text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-slate-100">
            Try free
          </Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full mb-6">
          Powered by Claude AI
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Understand any contract<br />
          <span className="text-blue-400">in 60 seconds.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
          Paste your NDA, freelance agreement, SaaS terms, or lease. Get plain-English
          red flags, missing clauses, and negotiation tips — no lawyer required.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-colors"
        >
          Analyze your first contract free →
        </Link>
        <p className="text-slate-500 text-sm mt-4">No credit card required. 1 free analysis.</p>
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
            { step: "2", title: "Claude reads every clause", body: "The AI analyzes the full document, checking for one-sided terms, missing protections, and unusual clauses." },
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
