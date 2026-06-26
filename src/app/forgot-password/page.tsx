import Link from "next/link";
import { Logo } from "@/components/logo";
import { ForgotForm } from "./forgot-form";

export default function ForgotPasswordPage() {
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
          <h1 className="text-2xl font-bold text-navy">Reset your password</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Enter your email and we&apos;ll send you a link to set a new one.
          </p>
        </div>
        <ForgotForm />
        <p className="mt-6 text-sm text-muted">
          Remembered it?{" "}
          <Link href="/sign-in" className="font-semibold text-teal">
            Back to sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
