"use client";

import { useActionState } from "react";
import { updateName, type ProfileState } from "./actions";

export function ProfileForm({
  defaultFirstName,
  defaultLastName,
}: {
  defaultFirstName: string;
  defaultLastName: string;
}) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(
    updateName,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="mt-6 space-y-3 rounded-2xl border border-border bg-white p-5 shadow-sm"
    >
      <h2 className="text-sm font-bold text-navy">Edit name</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">First name</span>
        <input
          name="first_name"
          defaultValue={defaultFirstName}
          required
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Last name</span>
        <input
          name="last_name"
          defaultValue={defaultLastName}
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
          Saved.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-2 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
