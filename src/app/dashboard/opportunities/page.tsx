import Link from "next/link";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import {
  type OpportunityCategory,
  type OpportunityWithSignup,
  CATEGORY_LABELS,
  getOpportunitiesForUser,
} from "@/lib/opportunities";
import { setSignupStatus } from "./actions";
import { LearnMoreLink } from "./learn-more-link";
import { PostClickPrompt } from "./post-click-prompt";

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

function OpportunityCard({ opp }: { opp: OpportunityWithSignup }) {
  const date = formatDate(opp.starts_at);
  const signedUp = opp.signup_status === "signed_up";
  const considering = opp.signup_status === "considering";

  return (
    <li className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-navy">{opp.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${CATEGORY_BADGE_STYLES[opp.category]}`}
        >
          {CATEGORY_LABELS[opp.category]}
        </span>
      </div>

      <p className="mt-1.5 text-xs leading-5 text-muted">{opp.description}</p>

      <dl className="mt-3 space-y-1 text-xs">
        {date && (
          <div className="flex gap-1.5">
            <dt className="font-semibold text-navy">When:</dt>
            <dd className="text-teal">{date}</dd>
          </div>
        )}
        {opp.location && (
          <div className="flex gap-1.5">
            <dt className="font-semibold text-navy">Where:</dt>
            <dd className="text-muted">{opp.location}</dd>
          </div>
        )}
        {opp.age_range && (
          <div className="flex gap-1.5">
            <dt className="font-semibold text-navy">Age:</dt>
            <dd className="text-muted">{opp.age_range}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <form action={setSignupStatus}>
          <input type="hidden" name="opportunity_id" value={opp.id} />
          <input type="hidden" name="next_status" value="signed_up" />
          <input
            type="hidden"
            name="current_status"
            value={opp.signup_status ?? ""}
          />
          <button
            type="submit"
            className={
              signedUp
                ? "rounded-full bg-teal px-4 py-1.5 text-xs font-bold text-white"
                : "rounded-full border-2 border-teal px-4 py-1.5 text-xs font-bold text-teal hover:bg-teal/5"
            }
          >
            {signedUp ? "Signed up ✓" : "Sign up"}
          </button>
        </form>
        <form action={setSignupStatus}>
          <input type="hidden" name="opportunity_id" value={opp.id} />
          <input type="hidden" name="next_status" value="considering" />
          <input
            type="hidden"
            name="current_status"
            value={opp.signup_status ?? ""}
          />
          <button
            type="submit"
            className={
              considering
                ? "rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-white"
                : "rounded-full border-2 border-amber-400 px-4 py-1.5 text-xs font-bold text-amber-600 hover:bg-amber-50"
            }
          >
            {considering ? "Considering ✓" : "Considering"}
          </button>
        </form>
        {opp.source_url && (
          <LearnMoreLink
            id={opp.id}
            title={opp.title}
            href={opp.source_url}
          />
        )}
      </div>
    </li>
  );
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { view } = await searchParams;
  const mineOnly = view === "mine";

  const all = await getOpportunitiesForUser(user.id);
  const visible = mineOnly ? all.filter((o) => o.signup_status) : all;
  const myCount = all.filter((o) => o.signup_status).length;

  const sections = groupByTiming(visible);
  const categories = Array.from(
    new Set(visible.map((o) => o.category)),
  ).sort() as OpportunityCategory[];
  const ageOptions = Array.from(
    new Set(visible.map((o) => o.age_range).filter(Boolean) as string[]),
  ).sort();

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
        <div className="mb-5 inline-flex rounded-full border border-border bg-white p-1 shadow-sm">
          <Link
            href="/dashboard/opportunities"
            className={
              !mineOnly
                ? "rounded-full bg-teal px-4 py-1.5 text-xs font-semibold text-white"
                : "rounded-full px-4 py-1.5 text-xs font-semibold text-navy hover:bg-surface"
            }
          >
            Browse all
          </Link>
          <Link
            href="/dashboard/opportunities?view=mine"
            className={
              mineOnly
                ? "rounded-full bg-teal px-4 py-1.5 text-xs font-semibold text-white"
                : "rounded-full px-4 py-1.5 text-xs font-semibold text-navy hover:bg-surface"
            }
          >
            My list
            {myCount > 0 && (
              <span
                className={`ml-1 inline-block rounded-full px-1.5 text-[10px] ${
                  mineOnly ? "bg-white/20" : "bg-teal/10 text-teal"
                }`}
              >
                {myCount}
              </span>
            )}
          </Link>
        </div>

        {visible.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white p-6 text-sm text-muted">
            {mineOnly
              ? "You haven't signed up for anything yet. Browse all to find an opportunity."
              : "No opportunities posted right now. Check back soon!"}
          </p>
        ) : (
          <>
            {!mineOnly && (
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
            )}

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
                    {section.items.map((opp) => (
                      <OpportunityCard key={opp.id} opp={opp} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </main>

      <PostClickPrompt knownIds={all.map((o) => o.id)} />
      <BottomNav />
    </>
  );
}
