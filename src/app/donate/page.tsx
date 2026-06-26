"use client";

import { useActionState, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { startCheckout, type CheckoutState } from "./actions";

const amounts = [
  { value: 10, label: "$10", sub: "Small acts of kindness" },
  { value: 25, label: "$25", sub: "Care package supplies" },
  { value: 50, label: "$50", sub: "Hospital support projects" },
  { value: 100, label: "$100", sub: "Sponsor a Joy Visit or event" },
  { value: 0, label: "Other", sub: "Custom amount" },
];

const campaigns = [
  {
    id: "national",
    title: "National Children's Hospital Fundraiser",
    sub: "Supports hospitals across the country",
  },
  {
    id: "local",
    title: "Local Hospital Campaign",
    sub: "Support a hospital in your community",
  },
  {
    id: "chapter",
    title: "School Chapter Fundraiser",
    sub: "Support your local student chapter",
  },
  {
    id: "joy",
    title: "Joy Visits",
    sub: "Help bring special moments to kids",
  },
  {
    id: "general",
    title: "General Support",
    sub: "Where it's needed most",
  },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [campaign, setCampaign] = useState("national");
  const [message, setMessage] = useState("");
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(
    startCheckout,
    undefined,
  );

  const isCustom = amount === 0;
  const finalAmount = isCustom ? Number(customAmount) || 0 : amount;

  return (
    <form action={formAction}>
      <PageHeader title="Donate" backHref="/" rightIcon="heart" />

      <input type="hidden" name="amount" value={finalAmount} />
      <input type="hidden" name="campaign" value={campaign} />
      <input type="hidden" name="message" value={message} />

      <main className="page-container-narrow pb-28 pt-6 lg:pb-32">
        <section className="py-6 text-center">
          <div className="mx-auto mb-3 text-2xl text-coral" aria-hidden="true">
            ❤️
          </div>
          <h2 className="text-xl font-bold text-navy">
            Donate to Help Children in Hospitals
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your gift helps fund care packages, hospital support projects, Joy
            Visits, and student-led service across the country.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-bold text-navy">
            1. Choose an Amount
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {amounts.map((item) => {
              const selected = amount === item.value;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setAmount(item.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                    selected
                      ? "border-teal bg-teal/5"
                      : "border-border bg-white hover:border-teal/40"
                  }`}
                >
                  <p className="text-lg font-bold text-navy">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{item.sub}</p>
                </button>
              );
            })}
          </div>
          {isCustom && (
            <div className="mt-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-navy">
                  Custom amount (USD)
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 75"
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
                />
              </label>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-bold text-navy">
            2. Choose a Campaign
          </h3>
          <div className="space-y-2">
            {campaigns.map((item) => {
              const selected = campaign === item.id;
              return (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors ${
                    selected
                      ? "border-teal bg-teal/5"
                      : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="campaign"
                    value={item.id}
                    checked={selected}
                    onChange={() => setCampaign(item.id)}
                    className="mt-1 accent-teal"
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{item.sub}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-sm font-bold text-navy">
            3. Leave an Encouraging Message (Optional)
          </h3>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message of hope..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-border bg-white p-4 pr-10 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
            <span className="absolute right-3 top-3 text-coral" aria-hidden="true">
              ❤️
            </span>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white">
        <div className="page-container-narrow py-4">
          {state?.error && (
            <p className="mb-2 rounded-lg bg-coral/10 px-3 py-2 text-center text-xs text-coral">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending || finalAmount < 1}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-coral text-sm font-bold tracking-wide text-white shadow-md hover:bg-coral-dark disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
            </svg>
            {pending
              ? "REDIRECTING…"
              : `DONATE ${finalAmount >= 1 ? `$${finalAmount}` : "NOW"}`}
          </button>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-muted">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l7 4v5c0 5-3.5 9-7 9S5 17 5 12V7l7-4z" strokeLinejoin="round" />
            </svg>
            Your donation is secure and tax-deductible.
          </p>
        </div>
      </div>
    </form>
  );
}
