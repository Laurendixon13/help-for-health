import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <article className="prose mx-auto max-w-2xl text-sm leading-7 text-muted">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">
            Privacy
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">Privacy Policy</h1>
          <p className="mt-4">
            <em>Placeholder.</em> Help 4 Health is a student-led nonprofit. This
            page will describe what information we collect from volunteers and
            donors, how we use it, and the choices you have.
          </p>
          <h2 className="mt-6 font-bold text-navy">What we collect</h2>
          <p>
            Account info (name, email), volunteer hours you log, and donation
            details processed by Stripe.
          </p>
          <h2 className="mt-6 font-bold text-navy">How to reach us</h2>
          <p>
            Questions? Use the{" "}
            <a href="/contact" className="text-teal">
              contact form
            </a>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
