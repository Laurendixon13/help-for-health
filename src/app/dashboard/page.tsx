import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { getHoursForUser, summarizeHours } from "@/lib/hours";
import { BottomNav } from "@/components/bottom-nav";
import {
  ensureAdminRequestFromSignup,
  getJoyVisitRequests,
  getPendingHours,
  isCurrentUserAdmin,
} from "@/lib/admin";
import {
  type OpportunityCategory,
  CATEGORY_LABELS,
  getOpportunitiesForUser,
} from "@/lib/opportunities";
import {
  getMyChapterApplications,
  getMyChapterMemberships,
} from "@/lib/chapters";

const badges = [
  { name: "First Hour", threshold: 1, color: "bg-teal text-white" },
  { name: "5 Hours", threshold: 5, color: "bg-violet-500 text-white" },
  { name: "10 Hours", threshold: 10, color: "bg-amber-500 text-white" },
  { name: "25 Hours", threshold: 25, color: "bg-coral text-white" },
];

const CATEGORY_BADGE_STYLES: Record<OpportunityCategory, string> = {
  virtual: "bg-sky-100 text-sky-700",
  in_person: "bg-teal/10 text-teal",
  fundraiser: "bg-amber-100 text-amber-700",
  joy_visit: "bg-violet-100 text-violet-700",
};

function formatUpcoming(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const tools = [
  { label: "Log Hours", icon: "clock", href: "/dashboard/hours" },
  { label: "Community", icon: "users", href: "/dashboard/community" },
  { label: "Opportunities", icon: "search", href: "/dashboard/opportunities" },
];

function StatIcon({ icon }: { icon: string }) {
  const cls = "h-4 w-4 text-teal-light";
  if (icon === "check") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "heart") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function ToolIcon({ icon }: { icon: string }) {
  const cls = "mx-auto h-6 w-6 text-navy";
  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 20v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1" strokeLinecap="round" />
        <circle cx="9" cy="7" r="3" />
        <path d="M22 20v-1a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const firstName =
    (user?.user_metadata?.first_name as string | undefined) ?? "Student";

  const entries = user ? await getHoursForUser(user.id) : [];
  const hoursStats = summarizeHours(entries);
  const isAdmin = await isCurrentUserAdmin();
  const [pendingHoursCount, newJoyVisitCount] = isAdmin
    ? await Promise.all([
        getPendingHours().then((r) => r.length),
        getJoyVisitRequests().then(
          (r) => r.filter((x) => x.status === "new").length,
        ),
      ])
    : [0, 0];
  const adminItemsCount = pendingHoursCount + newJoyVisitCount;

  if (user) await ensureAdminRequestFromSignup();
  const myChapters = user ? await getMyChapterApplications() : [];
  const myMemberships = user ? await getMyChapterMemberships() : [];
  const approvedChapters = myChapters.filter((c) => c.status === "approved");
  const pendingChapters = myChapters.filter(
    (c) => c.status === "new" || c.status === "in_review",
  );

  const allOpps = user ? await getOpportunitiesForUser(user.id) : [];
  const now = Date.now();
  const upcomingOpps = allOpps
    .filter((o) => o.starts_at && new Date(o.starts_at).getTime() > now)
    .slice(0, 2);
  const dashboardOpps =
    upcomingOpps.length >= 2
      ? upcomingOpps
      : [...upcomingOpps, ...allOpps.filter((o) => !o.starts_at)].slice(0, 2);
  const stats = [
    { label: "Total Hours", value: hoursStats.total.toFixed(1), icon: "clock" },
    {
      label: "Approved Hours",
      value: hoursStats.approved.toFixed(1),
      icon: "check",
    },
    {
      label: "Pending Hours",
      value: hoursStats.pending.toFixed(1),
      icon: "pending",
    },
    { label: "Money Helped Raise", value: "$0", icon: "heart" },
  ];

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold text-navy sm:text-2xl">
              Hi, {firstName}! 👋
            </h1>
            <p className="text-sm text-muted">Keep making a difference!</p>
          </div>
          <div className="flex items-center gap-3">
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted hover:bg-surface"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="page-container space-y-6 py-6 pb-24 lg:pb-8">
        {isAdmin && (
          <Link
            href="/dashboard/admin"
            className="flex items-center justify-between rounded-2xl border border-teal/30 bg-teal/5 p-4 shadow-sm transition hover:bg-teal/10"
          >
            <div>
              <p className="text-sm font-bold text-navy">Admin review</p>
              <p className="text-xs text-muted">
                {adminItemsCount === 0
                  ? "Nothing waiting on you."
                  : [
                      pendingHoursCount > 0 &&
                        `${pendingHoursCount} hour ${pendingHoursCount === 1 ? "entry" : "entries"} pending`,
                      newJoyVisitCount > 0 &&
                        `${newJoyVisitCount} Joy Visit ${newJoyVisitCount === 1 ? "request" : "requests"}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
              </p>
            </div>
            <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
              Open →
            </span>
          </Link>
        )}

        {approvedChapters.length > 0 && (
          <section className="rounded-2xl border border-teal/30 bg-gradient-to-br from-teal/10 to-sky-50 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-teal">
                  Chapter approved
                </p>
                {approvedChapters.map((c) => (
                  <p key={c.id} className="mt-1 text-sm text-navy">
                    Your Help 4 Health chapter at{" "}
                    <span className="font-bold">{c.school_name}</span>{" "}
                    <span className="text-muted">
                      ({c.school_city}, {c.school_state})
                    </span>{" "}
                    is approved. Welcome to the team!
                  </p>
                ))}
                <p className="mt-2 text-xs text-muted">
                  We&apos;ll be in touch with onboarding details. In the
                  meantime, browse{" "}
                  <Link
                    href="/dashboard/opportunities"
                    className="font-semibold text-teal hover:underline"
                  >
                    opportunities
                  </Link>{" "}
                  and start logging hours.
                </p>
              </div>
            </div>
          </section>
        )}

        {pendingChapters.length > 0 && (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
              Chapter application{" "}
              {pendingChapters[0].status === "in_review"
                ? "in review"
                : "received"}
            </p>
            {pendingChapters.map((c) => (
              <p key={c.id} className="mt-1 text-sm text-navy">
                Your application for{" "}
                <span className="font-semibold">{c.school_name}</span> is{" "}
                {c.status === "in_review" ? "under review" : "in the queue"}.
                We&apos;ll email you when there&apos;s an update.
              </p>
            ))}
          </section>
        )}

        {myMemberships.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-teal">
                Your chapter{myMemberships.length > 1 ? "s" : ""}
              </p>
              <Link
                href="/chapters"
                className="text-xs font-semibold text-teal hover:underline"
              >
                Find more →
              </Link>
            </div>
            <ul className="space-y-1.5">
              {myMemberships.map((m) => (
                <li
                  key={m.chapter_id}
                  className="flex items-baseline gap-2 text-sm"
                >
                  <span className="font-semibold text-navy">
                    {m.school_name}
                  </span>
                  <span className="text-xs text-muted">
                    · {m.school_city}, {m.school_state}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl bg-navy p-5 text-white">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Your Impact</h2>
            <Link href="/dashboard/hours" className="text-xs text-teal-light">
              View all stats &gt;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="mb-1 flex items-center gap-1.5">
                  <StatIcon icon={stat.icon} />
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <p className="text-xs text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-navy">
            Badges
            <span className="ml-2 text-xs font-medium text-muted">
              {badges.filter((b) => hoursStats.approved >= b.threshold).length}{" "}
              of {badges.length} earned
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
            {badges.map((badge) => {
              const earned = hoursStats.approved >= badge.threshold;
              return (
                <div key={badge.name} className="text-center">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-sm ${
                      earned ? badge.color : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span className="text-base font-bold">
                      {badge.threshold}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-[10px] leading-tight ${
                      earned ? "text-muted" : "text-slate-400"
                    }`}
                  >
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-bold text-navy">Upcoming Opportunities</h2>
            <Link
              href="/dashboard/opportunities"
              className="text-xs font-semibold text-teal hover:underline"
            >
              See all →
            </Link>
          </div>
          {dashboardOpps.length === 0 ? (
            <p className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
              No opportunities posted right now. Check back soon!
            </p>
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {dashboardOpps.map((opp) => {
                const when = formatUpcoming(opp.starts_at);
                return (
                  <Link
                    key={opp.id}
                    href="/dashboard/opportunities"
                    className="rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-teal/40 hover:shadow-md"
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
                    {when && (
                      <p className="mt-1 text-xs text-teal">{when}</p>
                    )}
                    {opp.location && (
                      <p className="mt-0.5 text-xs text-muted">
                        {opp.location}
                      </p>
                    )}
                    <span className="mt-3 inline-block rounded-full bg-teal px-4 py-1.5 text-xs font-bold text-white">
                      {opp.signup_status === "signed_up"
                        ? "Signed up ✓"
                        : opp.signup_status === "considering"
                          ? "Considering ✓"
                          : "View details"}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-bold text-navy">My Tools</h2>
          <div className="grid grid-cols-3 gap-3 lg:max-w-xl">
            {tools.map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm transition hover:border-teal/40 hover:shadow-md"
              >
                <ToolIcon icon={tool.icon} />
                <p className="mt-2 text-[11px] font-semibold text-navy">
                  {tool.label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-muted">
          <Link href="/" className="text-teal">
            ← Back to homepage
          </Link>
        </p>
      </main>

      <BottomNav />
    </>
  );
}
