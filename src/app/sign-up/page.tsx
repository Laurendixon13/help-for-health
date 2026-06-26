import Link from "next/link";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export default function SignUpPage() {
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
          <h1 className="text-2xl font-bold text-navy">Join Help 4 Health</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Create your student account to volunteer, log hours, start a
            chapter, and help kids in hospitals feel supported.
          </p>
        </div>

        <AuthForm mode="sign-up" />

        <p className="mt-6 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-teal">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
