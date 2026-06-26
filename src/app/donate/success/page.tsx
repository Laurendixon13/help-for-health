import Link from "next/link";
import { PageHeader } from "@/components/page-header";

const CAMPAIGN_NAMES: Record<string, string> = {
  national: "National Children's Hospital Fundraiser",
  local: "Local Hospital Campaign",
  chapter: "School Chapter Fundraiser",
  joy: "Joy Visits",
  general: "General Support",
};

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ mock?: string; amount?: string; campaign?: string }>;
}) {
  const { mock, amount, campaign } = await searchParams;
  const isMock = mock === "1";
  const campaignName = campaign ? CAMPAIGN_NAMES[campaign] ?? campaign : null;

  return (
    <>
      <PageHeader title="Thank you" backHref="/" rightIcon="heart" />
      <main className="page-container-narrow py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-3xl">
          💚
        </div>
        <h1 className="text-2xl font-bold text-navy">Thank you for your gift!</h1>
        {isMock ? (
          <>
            <p className="mt-3 text-sm leading-6 text-muted">
              Simulated donation
              {amount ? <> of <strong>${amount}</strong></> : null}
              {campaignName ? <> to <strong>{campaignName}</strong></> : null}.
              No real charge was made.
            </p>
            <p className="mx-auto mt-4 max-w-sm rounded-lg bg-amber-100 px-3 py-2 text-xs text-amber-900">
              Stripe is not configured. Add <code>STRIPE_SECRET_KEY</code> to
              <code> .env.local</code> to take real payments.
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted">
            Your donation is on its way to helping kids in hospitals feel
            supported. A receipt will be emailed to you by Stripe.
          </p>
        )}
        <div className="mt-8 flex flex-col gap-2">
          <Link
            href="/"
            className="rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
          >
            Back to home
          </Link>
          <Link href="/donate" className="text-sm text-muted">
            Make another donation
          </Link>
        </div>
      </main>
    </>
  );
}
