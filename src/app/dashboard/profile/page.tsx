import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { BottomNav } from "@/components/bottom-nav";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    (user?.user_metadata?.first_name as string | undefined) ?? "Student";
  const lastName =
    (user?.user_metadata?.last_name as string | undefined) ?? "";
  const email = user?.email ?? "";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold text-navy sm:text-2xl">Profile</h1>
            <p className="text-sm text-muted">Your volunteer account</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted hover:bg-surface"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="page-container py-6 pb-24 lg:pb-8">
        <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/20 text-xl font-bold text-teal">
            {initial}
          </div>
          <p className="mt-3 font-bold text-navy">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-muted">{email}</p>
          <p className="mt-2 text-xs text-teal">Student volunteer</p>
        </div>
        <ProfileForm
          defaultFirstName={firstName === "Student" ? "" : firstName}
          defaultLastName={lastName}
        />
      </main>
      <BottomNav />
    </>
  );
}
