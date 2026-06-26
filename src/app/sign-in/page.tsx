import Link from "next/link";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="page-container flex flex-col items-center py-10">
        <div className="mb-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-navy">Student login</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Sign in to track volunteer hours, join opportunities, and manage
            your Help 4 Health chapter.
          </p>
        </div>

        {error && (
          <p className="mb-4 w-full max-w-sm rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
            {error === "invalid_link"
              ? "That confirmation link is invalid or expired."
              : error}
          </p>
        )}

        <AuthForm mode="sign-in" next={next} />

        <p className="mt-4 text-sm">
          <Link href="/forgot-password" className="font-semibold text-teal">
            Forgot your password?
          </Link>
        </p>

        <p className="mt-6 text-sm text-muted">
          New here?{" "}
          <Link href="/sign-up" className="font-semibold text-teal">
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
}
