import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import {
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  getOpportunitiesForUser,
} from "@/lib/opportunities";
import { toggleSignup } from "./actions";

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

export default async function OpportunitiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const opportunities = await getOpportunitiesForUser(user.id);

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
          <ul className="grid gap-3 lg:grid-cols-2">
            {opportunities.map((opp) => {
              const date = formatDate(opp.starts_at);
              return (
                <li
                  key={opp.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {CATEGORY_ICONS[opp.category]}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-navy">
                          {opp.title}
                        </h2>
                        <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {CATEGORY_LABELS[opp.category]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {opp.description}
                      </p>
                      {(date || opp.location) && (
                        <p className="mt-2 text-xs text-teal">
                          {[date, opp.location].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <form action={toggleSignup} className="mt-3">
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
                          {opp.signed_up ? "✓ Signed up · Cancel" : "Sign up"}
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <BottomNav />
    </>
  );
}
