import Link from "next/link";
import { ContractScanAnimation } from "@/components/landing/ContractScanAnimation";
import { FaqSection } from "@/components/landing/FaqSection";
import { SampleReportPreview } from "@/components/landing/SampleReportPreview";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { appPath } from "@/lib/app-url";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("home");

const stats = [
  { stat: "60 sec", label: "Average analysis time" },
  { stat: "$300/hr", label: "What lawyers charge for this" },
  { stat: "10+", label: "Contract types supported" },
  { stat: "$7", label: "Cost of your first review" },
];

const problems = [
  {
    title: "Auto-renewal traps",
    body: "Hidden clauses that lock you in for another year with 90 days' notice required to cancel.",
  },
  {
    title: "IP grabs",
    body: "Language that claims ownership of everything you create — even on your own time.",
  },
  {
    title: "One-sided exit terms",
    body: "They can terminate in 24 hours. You need 60 days' notice.",
  },
];

const steps = [
  {
    step: "1",
    title: "Paste or upload your contract",
    body: "PDF or plain text. Works with NDAs, freelance contracts, leases, SaaS agreements, employment offers, and more.",
  },
  {
    step: "2",
    title: "Every clause gets reviewed",
    body: "Not a keyword search. Every clause is read in context, flagged by severity, and cross-checked against what should be there but isn't.",
  },
  {
    step: "3",
    title: "Get your plain-English report",
    body: "Red flags with severity ratings. Missing protections. Key terms extracted. Specific negotiation suggestions — in plain English, not legalese.",
  },
];

const contractTypes = [
  { name: "NDA", tip: "Check for overly broad confidentiality scope" },
  { name: "Freelance Agreement", tip: "Watch for IP ownership and late payment terms" },
  { name: "SaaS Terms", tip: "Auto-renewal and data ownership clauses" },
  { name: "Lease Agreement", tip: "Security deposit and early termination penalties" },
  { name: "Employment Contract", tip: "Non-compete scope and severance terms" },
  { name: "Consulting Agreement", tip: "Exclusivity and deliverable ownership" },
  { name: "Partnership Agreement", tip: "Profit split and dissolution terms" },
  { name: "Service Contract", tip: "Liability caps and change order language" },
];

const trustPoints = [
  {
    quote:
      "I finally understood what I was signing before sending it back — the termination clause was wildly one-sided.",
    role: "Freelance designer",
  },
  {
    quote:
      "Caught a missing liability cap in our SaaS vendor agreement. Saved us a awkward conversation with our lawyer.",
    role: "Startup founder",
  },
  {
    quote:
      "Faster than waiting for counsel on a standard NDA. I still run big deals by my attorney, but this catches the obvious stuff.",
    role: "Small business owner",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pinnacle-bg text-white flex flex-col">
      <JsonLd />

      <SiteHeader />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 sm:pt-16 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-96 bg-[radial-gradient(ellipse_at_top,rgba(45,125,210,0.14),transparent_65%)]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 tracking-tight">
              Understand any contract
              <br />
              <span className="text-pinnacle-blue-bright">in 60 seconds.</span>
            </h1>
            <p className="text-lg sm:text-xl text-pinnacle-muted mb-9 max-w-xl md:max-w-none mx-auto md:mx-0 leading-relaxed">
              Paste your NDA, freelance agreement, SaaS terms, or lease. Get plain-English
              red flags, missing clauses, and negotiation tips — no lawyer required.
            </p>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link
                href={appPath("/signup")}
                className="inline-block w-full sm:w-auto text-center bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white text-base sm:text-lg px-6 sm:px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg shadow-pinnacle-blue/20"
              >
                Analyze your first contract free →
              </Link>
              <p className="text-pinnacle-muted text-sm">No credit card required · 1 free analysis</p>
              <p className="text-pinnacle-muted/70 text-xs max-w-sm">
                Not legal advice.{" "}
                <Link href="/disclaimer" className="text-pinnacle-muted hover:text-white underline">
                  Read our disclaimer
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <ContractScanAnimation />
          </div>
        </div>
      </section>

      {/* Social proof — no fabricated user counts or star ratings */}
      <section className="border-y border-pinnacle-elevated/60 bg-pinnacle-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-center text-pinnacle-muted text-sm mb-8">
            Built for freelancers, founders, and small teams who sign contracts every week
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
            {trustPoints.map((item) => (
              <blockquote
                key={item.role}
                className="min-w-[280px] md:min-w-0 snap-start shrink-0 md:shrink bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl p-5"
              >
                <p className="text-sm text-pinnacle-muted leading-relaxed mb-3">&ldquo;{item.quote}&rdquo;</p>
                <footer className="text-xs text-pinnacle-muted/70">{item.role}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => (
            <div
              key={item.stat}
              className="bg-pinnacle-surface rounded-2xl p-5 sm:p-6 text-center border border-pinnacle-elevated"
            >
              <p className="text-3xl sm:text-4xl font-bold text-pinnacle-blue-bright">{item.stat}</p>
              <p className="text-pinnacle-muted mt-2 text-xs sm:text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / stakes */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Contracts are written by their lawyers. Not yours.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item) => (
            <div
              key={item.title}
              className="bg-pinnacle-surface border border-pinnacle-elevated border-l-4 border-l-pinnacle-danger rounded-2xl p-6"
            >
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-pinnacle-danger">⚠</span>
                {item.title}
              </p>
              <p className="text-pinnacle-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            aria-hidden
            className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-pinnacle-elevated"
          />
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-pinnacle-surface rounded-2xl p-6 border border-pinnacle-elevated"
            >
              <span className="text-4xl font-bold text-pinnacle-blue-bright mb-4 block">{item.step}</span>
              <p className="font-semibold mb-2">{item.title}</p>
              <p className="text-pinnacle-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SampleReportPreview />

      {/* Contract types */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
          Works with the contracts you actually deal with
        </h2>
        <p className="text-pinnacle-muted text-center text-sm mb-10">Common types we see every day</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contractTypes.map((item) => (
            <div
              key={item.name}
              className="bg-pinnacle-surface border border-pinnacle-elevated rounded-xl p-4 hover:border-pinnacle-blue/40 transition-colors"
            >
              <p className="font-medium text-sm mb-1">{item.name}</p>
              <p className="text-pinnacle-muted text-xs leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Less than one paragraph of a lawyer&apos;s time
        </h2>
        <p className="text-pinnacle-muted text-center text-sm mb-10">
          vs. $300/hr average attorney rate
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          <div className="bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl p-8">
            <p className="text-lg font-bold mb-1">Single Analysis</p>
            <p className="text-3xl font-extrabold text-pinnacle-blue-bright mb-2">$7</p>
            <p className="text-pinnacle-muted text-sm mb-6">Review one contract today</p>
            <Link
              href="/pricing"
              className="block text-center bg-pinnacle-elevated hover:bg-pinnacle-blue/20 border border-pinnacle-elevated text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Buy one analysis →
            </Link>
          </div>
          <div className="bg-pinnacle-surface border border-pinnacle-green/40 rounded-2xl p-8 relative">
            <span className="absolute top-4 right-4 text-xs font-medium uppercase tracking-wide text-pinnacle-green bg-pinnacle-green/10 border border-pinnacle-green/30 px-2 py-0.5 rounded-full">
              Most popular
            </span>
            <p className="text-lg font-bold mb-1">Pro</p>
            <p className="text-3xl font-extrabold text-pinnacle-blue-bright mb-2">
              $19<span className="text-base font-normal text-pinnacle-muted">/mo</span>
            </p>
            <p className="text-pinnacle-muted text-sm mb-6">Unlimited reviews + history</p>
            <Link
              href="/pricing"
              className="block text-center bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Start Pro →
            </Link>
          </div>
        </div>
        <p className="text-center">
          <Link href="/pricing" className="text-pinnacle-blue-bright hover:underline text-sm font-medium">
            See full pricing →
          </Link>
        </p>
      </section>

      <FaqSection />

      <SiteFooter />
    </main>
  );
}
