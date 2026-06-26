import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const programs = [
  {
    title: "Service Projects",
    description: "Care packages, cards, toy drives, and more.",
    icon: "gift",
    color: "bg-teal/10 text-teal",
  },
  {
    title: "Fundraisers",
    description: "Student-led campaigns for children's hospitals.",
    icon: "heart-hand",
    color: "bg-coral/10 text-coral",
  },
  {
    title: "Local Volunteering",
    description: "Find and apply for hospital opportunities near you.",
    icon: "hospital",
    color: "bg-blue-50 text-navy",
  },
  {
    title: "Joy Visits",
    description: "Special guests, video messages, and performances.",
    icon: "star",
    color: "bg-amber-50 text-amber-600",
  },
];

function ProgramIcon({ icon }: { icon: string }) {
  if (icon === "gift") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13M3 12h18M8 8c0-2 1.5-4 4-4s4 2 4 4" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "heart-hand") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.5-9-9a5 5 0 019-2 5 5 0 019 2c-2 4.5-9 9-9 9z" strokeLinejoin="round" />
        <path d="M8 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "hospital") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21V7l9-4 9 4v14" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6M12 10v4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17l-6.3 4 2.3-7-6-4.6h7.6z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="page-container pb-12 pt-8 lg:pb-16 lg:pt-12">
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
              Helping kids in hospitals feel supported.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
              A student-led movement bringing comfort, joy, and hope to children
              through service, fundraising, local volunteering, and Joy Visits.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/donate"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-coral-dark sm:min-w-[180px] sm:flex-none"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                DONATE NOW
              </Link>
            <Link
              href="/sign-in"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-teal-light sm:min-w-[180px] sm:flex-none"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21V12M12 12C12 12 8 9 8 6a4 4 0 118 0c0 3-4 6-4 6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                VOLUNTEER
              </Link>
            <Link
              href="/start-a-chapter"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-navy-dark sm:min-w-[180px] sm:flex-none"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="7" r="3" />
                  <path d="M2 20a7 7 0 0114 0M10 20a7 7 0 0110 0" strokeLinecap="round" />
                </svg>
                START A CHAPTER
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-48 lg:mx-0 lg:ml-auto lg:w-72 xl:w-80">
            <div className="overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581594693702-fbdc5a717633?auto=format&fit=crop&w=640&q=80"
                alt="Child in hospital holding a teddy bear"
                width={320}
                height={320}
                className="aspect-square w-full object-cover"
                priority
              />
            </div>
            <span className="absolute -right-1 top-2 text-3xl lg:-right-3 lg:top-4 lg:text-4xl" aria-hidden="true">
              ❤️
            </span>
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <h2 className="text-2xl font-bold text-navy">What We Do</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <article
                key={program.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${program.color}`}>
                  <ProgramIcon icon={program.icon} />
                </div>
                <h3 className="font-bold text-navy">{program.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy">Featured Campaign</h2>
            <button type="button" className="text-sm font-medium text-teal hover:text-teal-light">
              View all
            </button>
          </div>
          <article className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="min-h-[12rem] bg-gradient-to-br from-teal/20 to-coral/20 lg:min-h-full" />
            <div className="flex flex-col justify-center p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                National Campaign
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy">
                National Children&apos;s Hospital Fundraiser
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Support hospitals across the country through student-led
                fundraising and care package drives.
              </p>
              <Link
                href="/donate"
                className="mt-4 inline-block text-sm font-semibold text-coral hover:text-coral-dark"
              >
                Donate now →
              </Link>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
