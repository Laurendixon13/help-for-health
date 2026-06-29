import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Privacy Policy | Help 4 Health",
  description:
    "How Help 4 Health collects, uses, and protects information about volunteers, donors, and families.",
};

/*
 * This privacy policy is a starting point written for the data practices
 * the app actually performs today. It is NOT a substitute for legal review.
 * Have a lawyer (or a nonprofit legal clinic) review before relying on it,
 * especially because Help 4 Health serves children.
 */

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <article className="mx-auto max-w-2xl space-y-6 text-sm leading-7 text-muted">
          <header>
            <p className="text-xs font-bold uppercase tracking-wide text-teal">
              Privacy
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-muted">
              Last updated: June 26, 2026
            </p>
          </header>

          <p>
            Help 4 Health is a student-led nonprofit that helps children in
            hospitals through service projects, fundraisers, local volunteering,
            and Joy Visits. We take privacy seriously, especially because we
            work with and on behalf of children. This policy explains what
            information we collect, how we use it, and the choices you have.
          </p>

          <section>
            <h2 className="font-bold text-navy">Information we collect</h2>
            <p className="mt-2">When you use the site we may collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Account information</strong> — your name, email
                address, and a password (stored securely by our authentication
                provider; we never see plaintext passwords).
              </li>
              <li>
                <strong>Volunteer activity</strong> — the hours you log
                (activity, date, location, optional notes), the opportunities
                you sign up for or mark as &ldquo;considering,&rdquo; and the
                organizer email you provide when requesting verification.
              </li>
              <li>
                <strong>Form submissions</strong> — chapter applications, Joy
                Visit requests, and contact-form messages, including any
                information you choose to include.
              </li>
              <li>
                <strong>Technical information</strong> — standard server logs
                from our hosting provider (IP address, browser, pages visited)
                used to keep the site running and secure.
              </li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> collect medical records, patient
              names, or any protected health information.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">How we use information</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To create and manage your volunteer account.</li>
              <li>
                To track and verify volunteer hours so chapters and schools
                can recognize service.
              </li>
              <li>
                To coordinate opportunities and Joy Visits with hospitals,
                organizers, and special guests.
              </li>
              <li>
                To send you transactional emails (sign-up confirmation,
                application status, contact replies). We do not send marketing
                emails.
              </li>
              <li>
                To improve the program based on aggregate, non-identifying
                usage patterns.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-navy">Who we share information with</h2>
            <p className="mt-2">
              We share information only with the service providers that make
              the site work, and only to the extent they need it to provide
              that service:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Supabase</strong> — stores account, hours, and form
                data in a secure Postgres database.
              </li>
              <li>
                <strong>Vercel</strong> — hosts the website and processes
                requests.
              </li>
              <li>
                <strong>Resend</strong> — sends transactional emails on our
                behalf.
              </li>
              <li>
                <strong>Hospitals and approved partner organizations</strong>{" "}
                — when you sign up for a specific opportunity or Joy Visit,
                relevant details (your name, email, and activity) may be
                shared with the host so they can include you.
              </li>
            </ul>
            <p className="mt-2">
              We do not sell personal information, and we do not share it with
              advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Children&apos;s privacy</h2>
            <p className="mt-2">
              Help 4 Health is designed for student volunteers and serves
              children in hospitals. Volunteers under the age of 18 should
              have a parent or guardian&apos;s permission to create an account.
            </p>
            <p className="mt-2">
              We do not knowingly collect personal information from children
              under 13 without verifiable parental consent (as required by the
              U.S. Children&apos;s Online Privacy Protection Act, or COPPA).
              If you are a parent or guardian and believe your child under 13
              has provided us information, please email{" "}
              <a
                href="mailto:hello@help4health.net"
                className="text-teal hover:underline"
              >
                hello@help4health.net
              </a>{" "}
              and we will delete it promptly.
            </p>
            <p className="mt-2">
              For Joy Visits and any program involving identifiable
              information about a hospitalized child, we require approval from
              the hospital or partner organization and parent or guardian
              permission before any visit, message, or photo is shared.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Your choices and rights</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Access or update</strong> — sign in to view and edit
                your account information.
              </li>
              <li>
                <strong>Delete</strong> — email{" "}
                <a
                  href="mailto:hello@help4health.net"
                  className="text-teal hover:underline"
                >
                  hello@help4health.net
                </a>{" "}
                to request deletion of your account and associated data.
              </li>
              <li>
                <strong>Export</strong> — request a copy of the data we hold
                about you.
              </li>
              <li>
                <strong>Withdraw consent</strong> — stop using the site at any
                time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-navy">Cookies and similar technology</h2>
            <p className="mt-2">
              We use a small number of strictly necessary cookies to keep you
              signed in. We do not use third-party advertising or analytics
              cookies.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Security</h2>
            <p className="mt-2">
              We rely on our hosting and database providers&apos; industry-
              standard security practices (encrypted connections, encrypted
              data at rest, role-based access). No system is 100% secure;
              please use a unique password and report any suspicious activity
              to{" "}
              <a
                href="mailto:hello@help4health.net"
                className="text-teal hover:underline"
              >
                hello@help4health.net
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Changes to this policy</h2>
            <p className="mt-2">
              If our practices change in a meaningful way, we will update this
              page and the &ldquo;last updated&rdquo; date above. If the
              change is material, we will notify active accounts by email.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Contact</h2>
            <p className="mt-2">
              Questions, concerns, or requests about this policy can be sent
              to{" "}
              <a
                href="mailto:hello@help4health.net"
                className="text-teal hover:underline"
              >
                hello@help4health.net
              </a>{" "}
              or through our{" "}
              <a href="/contact" className="text-teal hover:underline">
                contact form
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
