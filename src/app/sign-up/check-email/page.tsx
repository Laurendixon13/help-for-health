import Link from "next/link";
import { Logo } from "@/components/logo";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="page-container flex flex-col items-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-3xl">
          ✉️
        </div>
        <h1 className="text-2xl font-bold text-navy">Check your email</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          We sent a confirmation link to{" "}
          <strong className="text-navy">{email ?? "your inbox"}</strong>. Click
          the link to finish creating your account.
        </p>
        <p className="mt-2 max-w-md text-xs leading-5 text-muted">
          Didn&apos;t get it? Check your spam folder, or{" "}
          <Link href="/sign-up" className="font-semibold text-teal">
            try again
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
