import Link from "next/link";
import { LEGAL_ENTITY } from "@/lib/legal";

const legalLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookies" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-center">
        <div>
          <p className="text-slate-300 text-sm font-medium">{LEGAL_ENTITY}</p>
          <p className="text-slate-500 text-xs mt-1">
            AI-powered contract review · Not legal advice
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-slate-400 hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center text-slate-600 text-xs pb-8 px-6">
        © {new Date().getFullYear()} {LEGAL_ENTITY}. All rights reserved.
      </p>
    </footer>
  );
}
