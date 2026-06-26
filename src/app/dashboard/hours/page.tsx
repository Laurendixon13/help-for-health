import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { LogHoursForm } from "@/components/log-hours-form";
import { createClient } from "@/lib/supabase/server";
import { getHoursForUser, summarizeHours } from "@/lib/hours";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-teal/15 text-teal",
  rejected: "bg-coral/10 text-coral",
} as const;

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HoursPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?next=/dashboard/hours");

  const entries = await getHoursForUser(user.id);
  const stats = summarizeHours(entries);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <h1 className="text-xl font-bold text-navy sm:text-2xl">Hours</h1>
          <p className="text-sm text-muted">Track and log your volunteer time</p>
        </div>
      </header>

      <main className="page-container space-y-6 py-6 pb-24 lg:pb-8">
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-navy p-4 text-white">
            <p className="text-xs text-slate-300">Total</p>
            <p className="text-2xl font-bold">{stats.total.toFixed(1)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs text-muted">Approved</p>
            <p className="text-2xl font-bold text-teal">
              {stats.approved.toFixed(1)}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs text-muted">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {stats.pending.toFixed(1)}
            </p>
          </div>
        </section>

        <LogHoursForm today={today} />

        <section>
          <h2 className="mb-3 font-bold text-navy">History</h2>
          {entries.length === 0 ? (
            <p className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
              No hours logged yet. Add your first entry above!
            </p>
          ) : (
            <ul className="space-y-2">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy">{entry.activity}</p>
                      <p className="text-xs text-muted">
                        {formatDate(entry.occurred_on)}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                      {entry.notes && (
                        <p className="mt-1 text-xs text-muted">{entry.notes}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-navy">
                        {Number(entry.hours).toFixed(2)}h
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles[entry.status]}`}
                      >
                        {entry.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <BottomNav />
    </>
  );
}
