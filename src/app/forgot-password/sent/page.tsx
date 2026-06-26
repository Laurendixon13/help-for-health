import Link from "next/link";
import { Logo } from "@/components/logo";

export default async function ResetSentPage({
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
          If an account exists for{" "}
          <strong className="text-navy">{email ?? "that address"}</strong>,
          we&apos;ve sent a reset link. The link expires in an hour.
        </p>
        <Link
          href="/sign-in"
          className="mt-6 text-sm font-semibold text-teal"
        >
          Back to sign in
        </Link>
      </main>
    </div>
  );
}
