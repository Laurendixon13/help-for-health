import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <article className="prose mx-auto max-w-2xl text-sm leading-7 text-muted">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">
            Terms
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">Terms of Use</h1>
          <p className="mt-4">
            <em>Placeholder.</em> By using Help 4 Health, volunteers agree to
            log hours honestly, follow chapter and host-hospital guidelines, and
            treat fellow members and the children we serve with respect.
          </p>
          <h2 className="mt-6 font-bold text-navy">Donations</h2>
          <p>
            Donations are processed by Stripe and are final once submitted. A
            receipt is emailed by Stripe at the time of the gift.
          </p>
          <h2 className="mt-6 font-bold text-navy">Contact</h2>
          <p>
            Reach out via the{" "}
            <a href="/contact" className="text-teal">
              contact form
            </a>{" "}
            with any questions.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
