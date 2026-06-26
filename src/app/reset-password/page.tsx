import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { createClient } from "@/lib/supabase/server";
import { ResetForm } from "./reset-form";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/forgot-password");

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
          <h1 className="text-2xl font-bold text-navy">Choose a new password</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            At least 8 characters. You&apos;ll be signed in once it&apos;s saved.
          </p>
        </div>
        <ResetForm />
      </main>
    </div>
  );
}
