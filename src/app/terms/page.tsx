import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Terms of Use | Help 4 Health",
  description:
    "The terms that govern your use of the Help 4 Health website and programs.",
};

/*
 * These terms are a starting point. They reflect what the site does today
 * but are NOT a substitute for legal review. Have a lawyer (or a nonprofit
 * legal clinic) review before relying on them.
 */

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <article className="mx-auto max-w-2xl space-y-6 text-sm leading-7 text-muted">
          <header>
            <p className="text-xs font-bold uppercase tracking-wide text-teal">
              Terms
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy">Terms of Use</h1>
            <p className="mt-2 text-xs text-muted">
              Last updated: June 26, 2026
            </p>
          </header>

          <p>
            These Terms of Use govern your use of the Help 4 Health website
            and programs (the &ldquo;Service&rdquo;). By creating an account,
            submitting a form, or otherwise using the Service, you agree to
            these terms. If you do not agree, please do not use the Service.
          </p>

          <section>
            <h2 className="font-bold text-navy">Eligibility</h2>
            <p className="mt-2">
              The Service is open to anyone who wants to help kids in
              hospitals feel supported. If you are under 18, you should have a
              parent or guardian&apos;s permission to participate. If you are
              under 13, a parent or guardian must create the account on your
              behalf and provide consent (see our{" "}
              <a href="/privacy" className="text-teal hover:underline">
                Privacy Policy
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Your account</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You are responsible for keeping your password secure.</li>
              <li>
                Please provide accurate information when creating an account
                and let us know if it changes.
              </li>
              <li>
                You may not impersonate another person, share your account, or
                use it to harass anyone.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-navy">Volunteer hours</h2>
            <p className="mt-2">
              Help 4 Health verifies service hours so they can be recognized
              by schools and chapters. By logging hours, you agree to log them
              honestly and only for activities you actually completed. Hours
              are reviewed by Help 4 Health admins and the listed event
              organizer when applicable. We may decline or reverse hours that
              cannot be verified.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Hospital safety and Joy Visits</h2>
            <p className="mt-2">
              Children&apos;s hospitals have strict safety, privacy, and
              health rules. You agree that:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You will not contact a hospitalized child, family, or
                care-team member directly without Help 4 Health and hospital
                approval.
              </li>
              <li>
                Every Joy Visit must be coordinated and approved by the
                hospital or partner organization before it happens.
              </li>
              <li>
                You will not share photos, names, or identifying details of
                patients without explicit written permission.
              </li>
              <li>
                You will follow all rules of the host hospital or partner
                organization, including age, background-check, vaccination,
                and orientation requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-navy">Content you submit</h2>
            <p className="mt-2">
              You retain ownership of anything you submit (chapter
              applications, Joy Visit requests, messages, hours, etc.). By
              submitting, you give Help 4 Health permission to use that
              content to operate the program — including reviewing it,
              following up with you, and sharing relevant details with
              partner organizations and approved hospital staff.
            </p>
            <p className="mt-2">
              Do not submit content that is unlawful, harassing, deceptive,
              violates someone&apos;s privacy, or includes confidential health
              or patient information.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Donations</h2>
            <p className="mt-2">
              When donation processing is enabled, gifts will be handled by
              Stripe and are final at the time of submission. A receipt is
              emailed by Stripe. Help 4 Health is not yet a registered
              501(c)(3) nonprofit, so contributions are{" "}
              <strong>not currently tax-deductible</strong>. We will update
              this section if and when 501(c)(3) status is granted.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Suspension and termination</h2>
            <p className="mt-2">
              We may suspend or close any account that breaks these terms,
              endangers a child or volunteer, misrepresents service hours, or
              misuses the Service. You may close your account at any time by
              emailing{" "}
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
            <h2 className="font-bold text-navy">Disclaimers</h2>
            <p className="mt-2">
              Help 4 Health does not provide medical advice. Nothing on the
              Service is intended to diagnose, treat, or cure any condition.
              The Service is provided &ldquo;as is&rdquo; without warranties
              of any kind. We do our best to keep it accurate and available
              but cannot guarantee that it will always be error-free or
              uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent allowed by law, Help 4 Health and its
              volunteers will not be liable for any indirect, incidental, or
              consequential damages arising out of your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Governing law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the District of
              Columbia, without regard to its conflict-of-laws rules. Any
              dispute will be resolved in the courts located in the District
              of Columbia.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Changes</h2>
            <p className="mt-2">
              We may update these terms from time to time. If we make a
              material change, we will update the &ldquo;last updated&rdquo;
              date and, for active accounts, notify you by email. Continued
              use of the Service after a change means you accept the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-navy">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
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
