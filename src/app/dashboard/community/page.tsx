import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboard } from "@/lib/leaderboard";

const medals = ["🥇", "🥈", "🥉"];

export default async function CommunityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const rows = await getLeaderboard(10);
  const monthLabel = new Date().toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <h1 className="text-xl font-bold text-navy sm:text-2xl">Community</h1>
          <p className="text-sm text-muted">
            Top volunteers across Help 4 Health
          </p>
        </div>
      </header>
      <main className="page-container py-6 pb-24 lg:pb-8">
        {rows.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white p-6 text-sm text-muted">
            No approved hours yet. Be the first — log some volunteer time and
            once it&apos;s approved you&apos;ll show up here.
          </p>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
              <h2 className="text-sm font-bold text-navy">
                Volunteer leaderboard
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                Approved hours
              </span>
            </div>
            <ul>
              {rows.map((row, i) => {
                const isMe = row.user_id === user.id;
                return (
                  <li
                    key={row.user_id}
                    className={`flex items-center gap-4 border-b border-border px-5 py-3 last:border-b-0 ${
                      isMe ? "bg-teal/5" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center text-lg">
                      {medals[i] ?? (
                        <span className="text-xs font-bold text-muted">
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy">
                        {row.display_name}
                        {isMe && (
                          <span className="ml-2 rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted">
                        {row.monthly_hours.toFixed(1)} hrs this month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-navy">
                        {row.total_hours.toFixed(1)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted">
                        all time
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-border bg-surface px-5 py-2 text-[11px] text-muted">
              Showing top {rows.length} · {monthLabel}
            </p>
          </section>
        )}
      </main>
      <BottomNav />
    </>
  );
}
