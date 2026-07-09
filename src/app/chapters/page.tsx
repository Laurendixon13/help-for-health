import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPublicChapters } from "@/lib/chapters";

export const metadata = {
  title: "Chapters | Help 4 Health",
  description:
    "Find the Help 4 Health student chapters bringing service, fundraisers, and Joy Visits to children in hospitals.",
};

const US_STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

function stateName(code: string): string {
  const upper = code.trim().toUpperCase();
  return US_STATE_NAMES[upper] ?? code;
}

export default async function ChaptersPage() {
  const chapters = await getPublicChapters();

  const byState = new Map<string, typeof chapters>();
  for (const c of chapters) {
    const key = (c.school_state || "").trim().toUpperCase();
    if (!byState.has(key)) byState.set(key, []);
    byState.get(key)!.push(c);
  }
  const stateGroups = [...byState.entries()].sort(([a], [b]) =>
    stateName(a).localeCompare(stateName(b)),
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-b from-sky-50 to-white">
          <div className="page-container py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Chapters
              </p>
              <h1 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
                Our chapters
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">
                Help 4 Health student chapters run service projects,
                fundraisers, and Joy Visits at hospitals and schools around
                the country. Find one near you — or start one at your school.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/start-a-chapter"
                  className="rounded-full bg-teal px-6 py-3 text-base font-semibold text-white hover:bg-teal-light"
                >
                  Start a chapter
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border-2 border-teal px-6 py-3 text-base font-semibold text-teal hover:bg-teal/5"
                >
                  About Help 4 Health
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="page-container py-12 sm:py-16">
          {chapters.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Just getting started
              </p>
              <h2 className="mt-2 text-xl font-bold text-navy">
                Be the first chapter
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                We&apos;re a young organization and haven&apos;t approved any
                student chapters yet. If you&apos;re passionate about helping
                kids in hospitals, you could be one of the founding chapter
                leaders.
              </p>
              <Link
                href="/start-a-chapter"
                className="mt-5 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
              >
                Start your chapter
              </Link>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-sm text-muted">
                {chapters.length}{" "}
                {chapters.length === 1 ? "chapter" : "chapters"} across{" "}
                {stateGroups.length}{" "}
                {stateGroups.length === 1 ? "state" : "states"}.
              </p>
              <div className="space-y-10">
                {stateGroups.map(([code, list]) => (
                  <section key={code}>
                    <h2 className="mb-3 text-lg font-bold text-navy">
                      {stateName(code)}
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {list.map((c) => (
                        <li
                          key={c.id}
                          className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 21h18M6 21V10l6-4 6 4v11" />
                              <path d="M10 21v-6h4v6" />
                            </svg>
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-navy">
                              {c.school_name}
                            </p>
                            <p className="text-xs text-muted">
                              {c.school_city}, {code}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-14 rounded-2xl bg-navy p-8 text-white">
                <h3 className="text-xl font-bold">
                  Don&apos;t see a chapter near you?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
                  You could be one of the next chapter leaders. Bring Help 4
                  Health to your school and start running events for kids in
                  hospitals near you.
                </p>
                <Link
                  href="/start-a-chapter"
                  className="mt-5 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
                >
                  Start a chapter
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
