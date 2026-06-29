import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import {
  type OpportunityCategory,
  type OpportunityWithSignup,
  CATEGORY_LABELS,
  getOpportunitiesForUser,
} from "@/lib/opportunities";
import { toggleSignup } from "./actions";

const CATEGORY_BADGE_STYLES: Record<OpportunityCategory, string> = {
  virtual: "bg-sky-100 text-sky-700",
  in_person: "bg-teal/10 text-teal",
  fundraiser: "bg-amber-100 text-amber-700",
  joy_visit: "bg-violet-100 text-violet-700",
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type Section = { key: string; title: string; items: OpportunityWithSignup[] };

function groupByTiming(opps: OpportunityWithSignup[]): Section[] {
  const now = Date.now();
  const weekFromNow = now + 7 * 24 * 60 * 60 * 1000;

  const thisWeek: OpportunityWithSignup[] = [];
  const upcoming: OpportunityWithSignup[] = [];
  const ongoing: OpportunityWithSignup[] = [];

  for (const o of opps) {
    if (!o.starts_at) {
      ongoing.push(o);
    } else {
      const t = new Date(o.starts_at).getTime();
      if (t < now) continue;
      if (t <= weekFromNow) thisWeek.push(o);
      else upcoming.push(o);
    }
  }

  return [
    { key: "this-week", title: "This week", items: thisWeek },
    { key: "upcoming", title: "Upcoming events", items: upcoming },
    { key: "ongoing", title: "Ongoing programs", items: ongoing },
  ].filter((s) => s.items.length > 0);
}

export default async function OpportunitiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const opportunities = await getOpportunitiesForUser(user.id);
  const sections = groupByTiming(opportunities);

  const ageOptions = Array.from(
    new Set(opportunities.map((o) => o.age_range).filter(Boolean) as string[]),
  ).sort();

  const categories = Array.from(
    new Set(opportunities.map((o) => o.category)),
  ).sort() as OpportunityCategory[];

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <h1 className="text-xl font-bold text-navy sm:text-2xl">
            Opportunities
          </h1>
          <p className="text-sm text-muted">Find ways to serve near you</p>
        </div>
      </header>

      <main className="page-container py-6 pb-24 lg:pb-8">
        {opportunities.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white p-6 text-sm text-muted">
            No opportunities posted right now. Check back soon!
          </p>
        ) : (
          <>
            <section
              aria-label="Filters"
              className="mb-6 space-y-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <span
                      key={c}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_BADGE_STYLES[c]}`}
                    >
                      {CATEGORY_LABELS[c]}
                    </span>
                  ))}
                </div>
              </div>
              {ageOptions.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Age requirements
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ageOptions.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-navy"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.key}>
                  <div className="mb-3 flex items-baseline gap-2">
                    <h2 className="font-bold text-navy">{section.title}</h2>
                    <span className="text-xs text-muted">
                      {section.items.length}
                    </span>
                  </div>
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {section.items.map((opp) => {
                      const date = formatDate(opp.starts_at);
                      return (
                        <li
                          key={opp.id}
                          className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-navy">
                              {opp.title}
                            </h3>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${CATEGORY_BADGE_STYLES[opp.category]}`}
                            >
                              {CATEGORY_LABELS[opp.category]}
                            </span>
                          </div>

                          <p className="mt-1.5 text-xs leading-5 text-muted">
                            {opp.description}
                          </p>

                          <dl className="mt-3 space-y-1 text-xs">
                            {date && (
                              <div className="flex gap-1.5">
                                <dt className="font-semibold text-navy">
                                  When:
                                </dt>
                                <dd className="text-teal">{date}</dd>
                              </div>
                            )}
                            {opp.location && (
                              <div className="flex gap-1.5">
                                <dt className="font-semibold text-navy">
                                  Where:
                                </dt>
                                <dd className="text-muted">{opp.location}</dd>
                              </div>
                            )}
                            {opp.age_range && (
                              <div className="flex gap-1.5">
                                <dt className="font-semibold text-navy">
                                  Age:
                                </dt>
                                <dd className="text-muted">{opp.age_range}</dd>
                              </div>
                            )}
                          </dl>

                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <form action={toggleSignup}>
                              <input
                                type="hidden"
                                name="opportunity_id"
                                value={opp.id}
                              />
                              <input
                                type="hidden"
                                name="signed_up"
                                value={opp.signed_up ? "1" : "0"}
                              />
                              <button
                                type="submit"
                                className={
                                  opp.signed_up
                                    ? "rounded-full border-2 border-teal px-4 py-1.5 text-xs font-bold text-teal"
                                    : "rounded-full bg-teal px-4 py-1.5 text-xs font-bold text-white hover:bg-teal-light"
                                }
                              >
                                {opp.signed_up
                                  ? "Signed up · Cancel"
                                  : "Sign up"}
                              </button>
                            </form>
                            {opp.source_url && (
                              <a
                                href={opp.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-teal hover:underline"
                              >
                                Learn more →
                              </a>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
}
