"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";

const CAMPAIGN_NAMES: Record<string, string> = {
  national: "National Children's Hospital Fundraiser",
  local: "Local Hospital Campaign",
  chapter: "School Chapter Fundraiser",
  joy: "Joy Visits",
  general: "General Support",
};

export type CheckoutState = { error: string } | undefined;

export async function startCheckout(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const secret = process.env.STRIPE_SECRET_KEY;

  const amount = Number(formData.get("amount") ?? 0);
  const campaign = String(formData.get("campaign") ?? "general");
  const message = String(formData.get("message") ?? "").slice(0, 500);

  if (!Number.isFinite(amount) || amount < 1) {
    return { error: "Please choose an amount of at least $1." };
  }

  const campaignName = CAMPAIGN_NAMES[campaign] ?? "General Support";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!secret) {
    const params = new URLSearchParams({
      mock: "1",
      amount: String(amount),
      campaign,
    });
    redirect(`/donate/success?${params.toString()}`);
  }

  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: `Help 4 Health donation — ${campaignName}`,
            description: message || undefined,
          },
        },
      },
    ],
    metadata: { campaign, message },
    success_url: `${appUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/donate?canceled=1`,
  });

  if (!session.url) return { error: "Could not start checkout." };
  redirect(session.url);
}
