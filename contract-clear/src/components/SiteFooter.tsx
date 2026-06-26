import Link from "next/link";
import { Logo } from "@/components/Logo";
import { tagline } from "@/lib/brand";
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
    <footer className="border-t border-pinnacle-elevated/60 bg-pinnacle-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="space-y-4">
          <div className="flex justify-center sm:justify-start">
            <Logo variant="footer" />
          </div>
          <p className="text-pinnacle-muted text-sm">{tagline}</p>
          <p className="text-pinnacle-muted/70 text-xs max-w-sm">
            AI-powered contract review for informational purposes only. Not legal advice.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm self-start justify-center md:justify-start w-full md:w-auto">
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-pinnacle-muted hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center text-pinnacle-muted/50 text-xs pb-8 px-6">
        © {new Date().getFullYear()} {LEGAL_ENTITY}. All rights reserved.
      </p>
    </footer>
  );
}
