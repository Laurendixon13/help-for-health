import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JoyVisitRequestForm } from "./request-form";

export const metadata = {
  title: "Joy Visits | Help 4 Health",
  description:
    "Joy Visits bring brighter moments to children in hospitals — through special guest visits, video messages, performances, and surprise moments of joy.",
};

const CAMPAIGN_GOAL = 1000;
const CAMPAIGN_RAISED = 620;
const CAMPAIGN_PCT = Math.min(
  100,
  Math.round((CAMPAIGN_RAISED / CAMPAIGN_GOAL) * 100),
);

const guestTypes = [
  { label: "Athletes", icon: "trophy" },
  { label: "Musicians", icon: "music" },
  { label: "Authors", icon: "book" },
  { label: "Creators", icon: "video" },
  { label: "Performers", icon: "mic" },
  { label: "Mascots", icon: "smile" },
  { label: "Community leaders", icon: "users" },
  { label: "Local celebrities", icon: "star" },
] as const;

const steps = [
  {
    n: 1,
    title: "A need is shared",
    body: "Hospitals, families, or Help 4 Health chapters identify a child, group, or hospital program that could use encouragement.",
  },
  {
    n: 2,
    title: "A guest is suggested",
    body: "Students, donors, families, or supporters can suggest athletes, musicians, creators, authors, performers, or community leaders.",
  },
  {
    n: 3,
    title: "The visit is approved",
    body: "Help 4 Health works with the hospital or approved organization to make sure the experience is safe, appropriate, and respectful.",
  },
  {
    n: 4,
    title: "A brighter moment happens",
    body: "The child or hospital group receives a visit, message, performance, or special experience designed to bring joy.",
  },
];

const safetyPoints = [
  "Hospital approval required",
  "Patient privacy protected",
  "Parent or guardian permission when needed",
  "No photos or names shared without permission",
  "In-person visits depend on hospital rules",
  "Virtual options are available when in-person visits are not possible",
];

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className ?? "h-6 w-6";
  const props = {
    viewBox: "0 0 24 24",
    className: cls,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "sparkle":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.8 6.6a5.5 5.5 0 00-7.8 0L12 7.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 20v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1" />
          <circle cx="9" cy="7" r="3" />
          <path d="M22 20v-1a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <path d="M12 3l2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 16.7 6.75 19.2l1-5.85L3.5 9.2l5.9-.9L12 3z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...props}>
          <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" />
          <path d="M17 5h2a2 2 0 010 4h-2M7 5H5a2 2 0 000 4h2" />
        </svg>
      );
    case "music":
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z" />
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <path d="M3 7a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          <path d="M16 10l5-3v10l-5-3" />
        </svg>
      );
    case "mic":
      return (
        <svg {...props}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0014 0M12 18v4M8 22h8" />
        </svg>
      );
    case "smile":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <path d="M9 9h.01M15 9h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function JoyVisitsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-sky-50 to-white">
          <div className="page-container py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Icon name="sparkle" className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-teal">
                Help 4 Health
              </p>
              <h1 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
                Joy Visits
              </h1>
              <p className="mt-3 text-lg font-semibold text-navy sm:text-xl">
                Bringing brighter moments to children in hospitals.
              </p>
              <p className="mt-4 text-base leading-7 text-muted">
                Joy Visits help children in hospitals feel seen, encouraged,
                and supported through special guest visits, video messages,
                performances, and surprise moments of joy.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/donate"
                  className="rounded-full bg-teal px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-light"
                >
                  Support a Joy Visit
                </Link>
                <Link
                  href="#request"
                  className="rounded-full border-2 border-teal px-6 py-3 text-base font-semibold text-teal hover:bg-teal/5"
                >
                  Suggest a Guest
                </Link>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
                <Icon name="shield" className="h-4 w-4 text-teal" />
                All Joy Visits are coordinated with hospital approval, patient
                safety rules, and privacy requirements.
              </p>
            </div>
          </div>
        </section>

        <div className="page-container space-y-14 py-14 sm:space-y-20 sm:py-20">
          {/* Section 1: What Are Joy Visits? */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                The idea
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                What are Joy Visits?
              </h2>
              <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <p className="text-base leading-7 text-muted">
                  Joy Visits are uplifting experiences created for children
                  going through difficult medical moments. A Joy Visit could be
                  an in-person visit, a virtual message, a music performance, a
                  book reading, a mascot visit, or a special surprise from
                  someone a child admires.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Who Can Participate? */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Special guests
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                Who can participate?
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                We welcome guests from many walks of life. Each one helps a
                child in a different way.
              </p>
            </div>
            <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {guestTypes.map((g) => (
                <li
                  key={g.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Icon name={g.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy">
                    {g.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: How Joy Visits Work */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                The process
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                How Joy Visits work
              </h2>
            </div>
            <ol className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 4: Ways to Support */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Get involved
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                Ways to support a Joy Visit
              </h2>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <article className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10 text-coral">
                  <Icon name="heart" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">Donate</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  Help fund care items, event supplies, guest coordination, or
                  special experiences for children in hospitals.
                </p>
                <Link
                  href="/donate"
                  className="mt-5 inline-flex justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
                >
                  Donate to Joy Visits
                </Link>
              </article>

              <article className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-navy">
                  <Icon name="users" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">
                  Suggest a Guest
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  Know an athlete, musician, creator, author, performer, or
                  local hero who could brighten a child&apos;s day?
                </p>
                <Link
                  href="#request"
                  className="mt-5 inline-flex justify-center rounded-full border-2 border-teal px-5 py-2.5 text-sm font-semibold text-teal hover:bg-teal/5"
                >
                  Suggest a Guest
                </Link>
              </article>

              <article className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Icon name="star" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">
                  Become a Guest
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  Athletes, musicians, creators, authors, performers, and
                  community leaders can volunteer to create uplifting moments
                  for kids.
                </p>
                <Link
                  href="#request"
                  className="mt-5 inline-flex justify-center rounded-full border-2 border-teal px-5 py-2.5 text-sm font-semibold text-teal hover:bg-teal/5"
                >
                  Become a Guest
                </Link>
              </article>
            </div>
          </section>

          {/* Section 5: Featured Campaign */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Featured campaign
              </p>
              <article className="mt-2 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-navy sm:text-2xl">
                  Help Fund Our First Joy Visit
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Your support can help create a special moment for children in
                  hospitals through encouragement, entertainment, and care.
                </p>

                <div className="mt-6 flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-navy">
                    ${CAMPAIGN_RAISED.toLocaleString()}
                    <span className="ml-1 text-sm font-medium text-muted">
                      raised of ${CAMPAIGN_GOAL.toLocaleString()} goal
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-teal">
                    {CAMPAIGN_PCT}%
                  </p>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal"
                    style={{ width: `${CAMPAIGN_PCT}%` }}
                    aria-label={`${CAMPAIGN_PCT}% funded`}
                  />
                </div>

                <Link
                  href="/donate"
                  className="mt-6 inline-flex w-full justify-center rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark sm:w-auto"
                >
                  Support This Campaign
                </Link>
              </article>
            </div>
          </section>

          {/* Section 6: Safety and Trust */}
          <section>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Safety first
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                Safety and trust
              </h2>
              <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                    <Icon name="shield" className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-7 text-muted">
                    Children&apos;s hospitals have important safety, privacy,
                    and health rules. Help 4 Health does not allow students or
                    guests to directly arrange patient visits without approval.
                    Every Joy Visit must be reviewed and approved by the
                    hospital or approved partner before it happens.
                  </p>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {safetyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-navy"
                    >
                      <span className="mt-0.5 text-teal">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="leading-6">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Request Form */}
          <section id="request" className="scroll-mt-20">
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Icon name="send" className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-teal">
                  Get in touch
                </p>
                <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                  Request or Suggest a Joy Visit
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Tell us how you&apos;d like to help — we&apos;ll follow up by
                  email within a few days.
                </p>
              </div>
              <JoyVisitRequestForm />
            </div>
          </section>
        </div>

        {/* Section 8: Closing CTA */}
        <section className="bg-navy py-14 sm:py-20">
          <div className="page-container">
            <div className="mx-auto max-w-2xl text-center text-white">
              <h2 className="text-2xl font-bold sm:text-3xl">
                A small moment of joy can make a hard day feel lighter.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Help 4 Health brings students, donors, hospitals, and special
                guests together to support children when they need
                encouragement most.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/donate"
                  className="rounded-full bg-teal px-6 py-3 text-base font-semibold text-white hover:bg-teal-light"
                >
                  Support a Joy Visit
                </Link>
                <Link
                  href="#request"
                  className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                >
                  Suggest a Guest
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
