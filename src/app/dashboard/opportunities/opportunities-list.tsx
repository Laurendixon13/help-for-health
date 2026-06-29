"use client";

import { useMemo, useState } from "react";
import {
  type OpportunityCategory,
  type OpportunityWithSignup,
  CATEGORY_LABELS,
} from "@/lib/opportunities";
import { setSignupStatus } from "./actions";
import { LearnMoreLink } from "./learn-more-link";

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
          <LearnMoreLink id={opp.id} title={opp.title} href={opp.source_url} />
        )}
      </div>
    </li>
  );
}

export function OpportunitiesList({
  opportunities,
  mineOnly,
}: {
  opportunities: OpportunityWithSignup[];
  mineOnly: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    Set<OpportunityCategory>
  >(new Set());
  const [selectedAges, setSelectedAges] = useState<Set<string>>(new Set());

  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(opportunities.map((o) => o.category)),
      ).sort() as OpportunityCategory[],
    [opportunities],
  );

  const allAges = useMemo(
    () =>
      Array.from(
        new Set(
          opportunities.map((o) => o.age_range).filter(Boolean) as string[],
        ),
      ).sort(),
    [opportunities],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((o) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(o.category))
        return false;
      if (
        selectedAges.size > 0 &&
        (!o.age_range || !selectedAges.has(o.age_range))
      )
        return false;
      if (q) {
        const hay = `${o.title} ${o.description} ${o.location ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [opportunities, query, selectedCategories, selectedAges]);

  const sections = useMemo(() => groupByTiming(filtered), [filtered]);
  const anyFilter =
    query.trim() !== "" ||
    selectedCategories.size > 0 ||
    selectedAges.size > 0;

  const toggleCategory = (c: OpportunityCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };
  const toggleAge = (a: string) => {
    setSelectedAges((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };
  const clearFilters = () => {
    setQuery("");
    setSelectedCategories(new Set());
    setSelectedAges(new Set());
  };

  return (
    <>
      <section
        aria-label="Filters"
        className="mb-6 space-y-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
      >
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, or location"
            className="w-full rounded-xl border border-border bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-teal"
          />
        </div>

        {allCategories.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allCategories.map((c) => {
                const active = selectedCategories.has(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={
                      active
                        ? "rounded-full bg-teal px-2.5 py-1 text-xs font-semibold text-white"
                        : `rounded-full px-2.5 py-1 text-xs font-medium hover:opacity-80 ${CATEGORY_BADGE_STYLES[c]}`
                    }
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {allAges.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
              Age requirements
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allAges.map((a) => {
                const active = selectedAges.has(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAge(a)}
                    className={
                      active
                        ? "rounded-full bg-teal px-2.5 py-1 text-xs font-semibold text-white"
                        : "rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-navy hover:bg-slate-200"
                    }
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {anyFilter && (
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-muted">
              {filtered.length} of {opportunities.length} match
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-teal hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-white p-6 text-sm text-muted">
          {mineOnly
            ? "You haven't signed up for anything matching these filters yet."
            : "Nothing matches those filters. Try clearing them."}
        </p>
      ) : (
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
      )}
    </>
  );
}
