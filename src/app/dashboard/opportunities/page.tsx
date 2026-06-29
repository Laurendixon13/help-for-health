import Link from "next/link";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { createClient } from "@/lib/supabase/server";
import { getOpportunitiesForUser } from "@/lib/opportunities";
import { OpportunitiesList } from "./opportunities-list";
import { PostClickPrompt } from "./post-click-prompt";

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
          <OpportunitiesList opportunities={visible} mineOnly={mineOnly} />
        )}
      </main>

      <PostClickPrompt knownIds={all.map((o) => o.id)} />
      <BottomNav />
    </>
  );
}
