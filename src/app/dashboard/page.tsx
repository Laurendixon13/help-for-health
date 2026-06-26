import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { getHoursForUser, summarizeHours } from "@/lib/hours";
import { BottomNav } from "@/components/bottom-nav";
import { getPendingHours, isCurrentUserAdmin } from "@/lib/admin";

const badges = [
  { name: "First 5 Hours", color: "bg-teal text-white", icon: "five" },
  { name: "Care Package Helper", color: "bg-violet-500 text-white", icon: "gift" },
  { name: "Fundraiser Leader", color: "bg-amber-400 text-white", icon: "star" },
  { name: "Hospital Helper", color: "bg-coral text-white", icon: "heart" },
];

function BadgeIcon({ icon }: { icon: string }) {
  if (icon === "five") {
    return <span className="text-base font-bold">5</span>;
  }
  const props = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (icon === "gift") {
    return (
      <svg {...props}>
        <path d="M20 12v9H4v-9" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    );
  }
  if (icon === "star") {
    return (
      <svg {...props}>
        <path d="M12 3l2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 16.7 6.75 19.2l1-5.85L3.5 9.2l5.9-.9L12 3z" />
      </svg>
    );
  }
  if (icon === "heart") {
    return (
      <svg {...props}>
        <path d="M20.8 6.6a5.5 5.5 0 00-7.8 0L12 7.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
      </svg>
    );
  }
  return null;
}

const opportunities = [
  {
    title: "Card Writing Event",
    meta: "Sat, May 18 • 2:00 PM",
    location: "Virtual",
    icon: "✉️",
    cta: "Sign Up",
    primary: true,
  },
  {
    title: "Local Hospital Volunteer Program",
    meta: "Children's National Hospital",
    location: "",
    icon: "🏥",
    cta: "View Details",
    primary: false,
  },
];

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
  const pendingHoursCount = isAdmin ? (await getPendingHours()).length : 0;
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
                {pendingHoursCount === 0
                  ? "Nothing waiting on you."
                  : `${pendingHoursCount} hour ${pendingHoursCount === 1 ? "entry" : "entries"} pending approval.`}
              </p>
            </div>
            <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
              Open →
            </span>
          </Link>
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
          <h2 className="mb-3 font-bold text-navy">Badges Earned</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
            {badges.map((badge) => (
              <div key={badge.name} className="text-center">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-sm ${badge.color}`}
                >
                  <BadgeIcon icon={badge.icon} />
                </div>
                <p className="mt-2 text-[10px] leading-tight text-muted">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-bold text-navy">Upcoming Opportunities</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {opportunities.map((item) => (
              <Link
                key={item.title}
                href="/dashboard/opportunities"
                className="rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-teal/40 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-navy">{item.title}</h3>
                    <p className="mt-0.5 text-xs text-muted">{item.meta}</p>
                    {item.location && (
                      <p className="text-xs text-teal">{item.location}</p>
                    )}
                    <span
                      className={`mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${
                        item.primary
                          ? "bg-teal text-white"
                          : "border-2 border-teal text-teal"
                      }`}
                    >
                      {item.cta}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
