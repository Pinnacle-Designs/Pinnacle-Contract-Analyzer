import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { EFFECTIVE_DATE } from "@/lib/legal";

type Section = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalLayoutProps = {
  title: string;
  description: string;
  sections: Section[];
};

export function LegalLayout({ title, description, sections }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <SiteHeader variant="minimal" />

      <article className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-slate-400 text-sm">Last updated: {EFFECTIVE_DATE}</p>
          <p className="text-slate-300 mt-4 leading-relaxed">{description}</p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
              <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-2">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="text-slate-500 text-xs mt-12 pt-8 border-t border-slate-800">
          See also:{" "}
          <Link href="/terms" className="text-blue-400 hover:underline">Terms</Link>
          {" · "}
          <Link href="/privacy" className="text-blue-400 hover:underline">Privacy</Link>
          {" · "}
          <Link href="/disclaimer" className="text-blue-400 hover:underline">Disclaimer</Link>
          {" · "}
          <Link href="/cookies" className="text-blue-400 hover:underline">Cookies</Link>
          {" · "}
          <Link href="/contact" className="text-blue-400 hover:underline">Contact</Link>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
