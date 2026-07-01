import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT_EMAIL, LEGAL_ENTITY } from "@/lib/legal";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("contact");

function ContactJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: absoluteUrl("/contact"),
    description: `Contact ${LEGAL_ENTITY} for support, billing, and account help.`,
    mainEntity: {
      "@type": "Organization",
      name: LEGAL_ENTITY,
      email: CONTACT_EMAIL,
      url: absoluteUrl("/"),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-pinnacle-bg text-white flex flex-col">
      <ContactJsonLd />
      <BreadcrumbJsonLd
        crumbs={[
          { name: SITE_NAME, path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <SiteHeader variant="minimal" />

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-3">Contact us</h1>
        <p className="text-pinnacle-muted mb-10 leading-relaxed">
          Questions about {LEGAL_ENTITY}? Reach out for product support, billing, account help,
          or legal and privacy inquiries.
        </p>

        <div className="bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl p-6 space-y-4">
          <div>
            <p className="text-pinnacle-muted text-xs uppercase tracking-wide mb-1">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-pinnacle-blue-bright hover:underline text-lg font-medium"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <p className="text-pinnacle-muted text-sm leading-relaxed">
            We aim to respond within one business day. For urgent billing issues, include your
            account email and a brief description of the problem.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
