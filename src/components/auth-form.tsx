"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "@/app/auth/actions";

type Mode = "sign-in" | "sign-up";

export function AuthForm({ mode, next }: { mode: Mode; next?: string }) {
  const action = mode === "sign-in" ? signIn : signUp;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );
  const [requestAdmin, setRequestAdmin] = useState(false);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      {mode === "sign-up" && (
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy">First name</span>
            <input
              name="firstName"
              required
              className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy">Last name</span>
            <input
              name="lastName"
              className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
            />
          </label>
        </div>
      )}

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-teal"
        />
      </label>

      {next && <input type="hidden" name="next" value={next} />}

      {mode === "sign-up" && (
        <div className="rounded-xl border border-border bg-surface p-3">
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="request_admin"
              value="1"
              checked={requestAdmin}
              onChange={(e) => setRequestAdmin(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-teal"
            />
            <span>
              <span className="font-medium text-navy">
                Request admin access
              </span>
              <span className="block text-xs text-muted">
                For chapter leaders, hospital partners, or program
                coordinators. A Help 4 Health admin will review and follow up.
              </span>
            </span>
          </label>
          {requestAdmin && (
            <label className="mt-3 block text-sm">
              <span className="mb-1 block font-medium text-navy">
                Why do you need admin access?
              </span>
              <textarea
                name="admin_request_reason"
                rows={3}
                required
                placeholder="e.g. I'm the founding chapter leader at Roosevelt High and need to approve my chapter's volunteer hours."
                className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-teal"
              />
            </label>
          )}
        </div>
      )}

      {state?.error && (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light disabled:opacity-60"
      >
        {pending
          ? "Please wait…"
          : mode === "sign-in"
            ? "Log in"
            : "Create account"}
      </button>
    </form>
  );
}
