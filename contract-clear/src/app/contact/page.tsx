import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { CONTACT_EMAIL, LEGAL_ENTITY } from "@/lib/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Get in touch with Pinnacle Contract Analyzer for support, billing, or legal inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="max-w-3xl mx-auto w-full px-6 py-4 flex justify-between items-center border-b border-slate-800/60">
        <Logo className="h-10 w-auto" />
        <Link href="/" className="text-slate-400 hover:text-white text-sm">
          ← Home
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-3">Contact us</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Questions about {LEGAL_ENTITY}? Reach out for product support, billing, account help,
          privacy requests, or legal inquiries.
        </p>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-blue-400 hover:underline text-lg font-medium"
          >
            {CONTACT_EMAIL}
          </a>
        </section>

        <p className="text-slate-500 text-xs mt-10">
          We typically respond within 1–2 business days. For billing issues, include your account email in the subject line.
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
