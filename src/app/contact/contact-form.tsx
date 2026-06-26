"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "./actions";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state && state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Name</span>
        <input
          name="name"
          required
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Email</span>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      {state && "error" in state && (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
          {state.error}
        </p>
      )}
      {state && "ok" in state && state.ok && (
        <p className="rounded-lg bg-teal/10 px-3 py-2 text-xs text-teal">
          Thanks — we&apos;ll be in touch soon.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
