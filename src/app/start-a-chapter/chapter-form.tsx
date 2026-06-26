"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitChapterApplication,
  type ChapterApplicationState,
} from "./actions";

const inputCls =
  "w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal";

export function ChapterForm() {
  const [state, formAction, pending] = useActionState<
    ChapterApplicationState,
    FormData
  >(submitChapterApplication, undefined);
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">First name *</span>
          <input name="first_name" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">Last name *</span>
          <input name="last_name" required className={inputCls} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Email *</span>
        <input name="email" type="email" required className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">School name *</span>
        <input name="school_name" required className={inputCls} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-navy">City *</span>
          <input name="school_city" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">State *</span>
          <input
            name="school_state"
            required
            maxLength={50}
            placeholder="e.g. VA"
            className={inputCls}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Grade</span>
        <input
          name="grade"
          placeholder="e.g. 11th"
          className={inputCls}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">
          Why do you want to start a chapter?
        </span>
        <textarea name="why" rows={4} className={inputCls} />
      </label>

      {state && "error" in state && (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
          {state.error}
        </p>
      )}
      {state && "ok" in state && state.ok && (
        <p className="rounded-lg bg-teal/10 px-3 py-2 text-xs text-teal">
          Application received — a Help 4 Health student lead will reach out
          within a few days.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
