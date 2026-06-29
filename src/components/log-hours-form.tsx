"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { logHours, type LogHoursState } from "@/app/dashboard/hours/actions";

export function LogHoursForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState<LogHoursState, FormData>(
    logHours,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (state && "ok" in state && state.ok) {
      formRef.current?.reset();
      setVerify(false);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-3 rounded-2xl border border-border bg-white p-5 shadow-sm"
    >
      <h2 className="font-bold text-navy">Log new hours</h2>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">Hours</span>
          <input
            name="hours"
            type="number"
            step="0.25"
            min="0.25"
            max="24"
            required
            className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">Date</span>
          <input
            name="occurred_on"
            type="date"
            defaultValue={today}
            max={today}
            required
            className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Activity</span>
        <input
          name="activity"
          required
          placeholder="e.g. Card writing event"
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Location <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          name="location"
          placeholder="e.g. Children's National Hospital"
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Notes <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          name="notes"
          rows={2}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <div className="rounded-xl border border-border bg-surface p-3">
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={verify}
            onChange={(e) => setVerify(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-teal"
          />
          <span>
            <span className="font-medium text-navy">
              Email the organizer to verify
            </span>
            <span className="block text-xs text-muted">
              We&apos;ll send a short note asking them to confirm you were
              there. Speeds up admin approval.
            </span>
          </span>
        </label>
        {verify && (
          <label className="mt-3 block text-sm">
            <span className="mb-1 block font-medium text-navy">
              Organizer email
            </span>
            <input
              name="organizer_email"
              type="email"
              required
              placeholder="organizer@example.org"
              className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </label>
        )}
      </div>

      {state && "error" in state && (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
          {state.error}
        </p>
      )}
      {state && "ok" in state && state.ok && (
        <p className="rounded-lg bg-teal/10 px-3 py-2 text-xs text-teal">
          Logged — pending approval.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending ? "Saving…" : "Log hours"}
      </button>
    </form>
  );
}
