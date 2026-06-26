import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">Get in touch</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Questions about Help 4 Health, starting a chapter, or working
            together? Send us a note and a student volunteer will get back to
            you.
          </p>

          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
