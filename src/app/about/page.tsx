import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pillars = [
  {
    title: "Service",
    body: "Care packages, handwritten cards, toy drives, and supply efforts that reach children and families during hospital stays.",
  },
  {
    title: "Fundraising",
    body: "Student-led campaigns that raise meaningful support for children's hospitals and the programs that make a difference.",
  },
  {
    title: "Local Volunteering",
    body: "Helping students plug into hospital and community volunteer opportunities near them — and earn service hours doing it.",
  },
  {
    title: "Joy Visits",
    body: "Special guests, video messages, and small performances that bring a little extra brightness to a hospital day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container space-y-12 py-10">
        <section className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">
            About us
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Students helping kids in hospitals feel supported.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Help 4 Health is a student-led movement focused on the kids whose
            childhoods take a detour through a hospital. We organize service
            projects, fundraisers, local volunteering, and Joy Visits — and we
            make it easy for any student, anywhere, to take part.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">What we do</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-navy p-8 text-white">
          <h2 className="text-xl font-bold">Start a chapter at your school</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
            Bring Help 4 Health to your campus. We&apos;ll give you everything
            you need to organize your first event and start logging service
            hours with your friends.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/start-a-chapter"
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
            >
              Start a chapter
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
