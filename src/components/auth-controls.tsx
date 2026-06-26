import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export async function AuthControls() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-navy hover:bg-surface"
        >
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full bg-teal px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-light"
        >
          Join
        </Link>
      </div>
    );
  }

  const initial =
    (user.user_metadata?.first_name as string | undefined)?.charAt(0)?.toUpperCase() ??
    user.email?.charAt(0).toUpperCase() ??
    "?";

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-teal hover:bg-teal/10 sm:inline-block"
      >
        Dashboard
      </Link>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted hover:bg-surface"
        >
          Sign out
        </button>
      </form>
      <Link
        href="/dashboard/profile"
        aria-label="Profile"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal"
      >
        {initial}
      </Link>
    </div>
  );
}
