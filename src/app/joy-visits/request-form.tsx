"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitJoyVisitRequest,
  type JoyVisitRequestState,
} from "./actions";

const inputCls =
  "w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-teal";

export function JoyVisitRequestForm() {
  const [state, formAction, pending] = useActionState<
    JoyVisitRequestState,
    FormData
  >(submitJoyVisitRequest, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state && state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Your name *</span>
        <input name="name" required className={inputCls} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Email *</span>
        <input name="email" type="email" required className={inputCls} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">I am a *</span>
        <select name="role" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Choose one
          </option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="hospital_staff">Hospital staff</option>
          <option value="donor">Donor</option>
          <option value="guest">Guest</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Type of request *
        </span>
        <select
          name="request_type"
          required
          defaultValue=""
          className={inputCls}
        >
          <option value="" disabled>
            Choose one
          </option>
          <option value="request">Request a Joy Visit</option>
          <option value="suggest_guest">Suggest a Guest</option>
          <option value="become_guest">Become a Guest</option>
          <option value="donate_sponsor">Donate / Sponsor</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Guest name or type of guest
        </span>
        <input
          name="guest_info"
          placeholder="e.g. local musician, college athlete"
          className={inputCls}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Hospital or city
        </span>
        <input
          name="hospital_or_city"
          placeholder="e.g. Children's National, Washington DC"
          className={inputCls}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Message / details
        </span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us a bit about the request or the child / group you'd like to support. Please don't include patient names or medical details."
          className={inputCls}
        />
      </label>

      {state && "error" in state && (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
          {state.error}
        </p>
      )}
      {state && "ok" in state && state.ok && (
        <p className="rounded-lg bg-teal/10 px-3 py-2 text-xs text-teal">
          Thank you — your request has been received. The Help 4 Health team
          will follow up by email.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-3 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}
