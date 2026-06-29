"use client";

import { useEffect, useState } from "react";
import { setSignupStatus } from "./actions";

const STORAGE_KEY = "h4h.clickedOpportunities";
// Don't pester immediately — wait 30s after the click before asking.
const MIN_AGE_MS = 30 * 1000;

type ClickedRecord = {
  id: string;
  title: string;
  clickedAt: number;
};

type Props = {
  knownIds: string[];
};

function readClicks(): ClickedRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClickedRecord[]) : [];
  } catch {
    return [];
  }
}

function writeClicks(records: ClickedRecord[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* ignore */
  }
}

export function PostClickPrompt({ knownIds }: Props) {
  const [pending, setPending] = useState<ClickedRecord | null>(null);

  useEffect(() => {
    const all = readClicks();
    const now = Date.now();
    const ready = all.find(
      (r) =>
        r.clickedAt + MIN_AGE_MS < now && knownIds.includes(r.id),
    );
    if (ready) setPending(ready);
  }, [knownIds]);

  const dismiss = (id: string) => {
    writeClicks(readClicks().filter((r) => r.id !== id));
    setPending(null);
  };

  const choose = async (status: "signed_up" | "considering") => {
    if (!pending) return;
    const fd = new FormData();
    fd.set("opportunity_id", pending.id);
    fd.set("next_status", status);
    fd.set("current_status", ""); // empty so it never toggles off
    await setSignupStatus(fd);
    dismiss(pending.id);
  };

  if (!pending) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-20 sm:bottom-4 sm:right-4 sm:left-auto sm:pb-0 lg:bottom-8 lg:right-8">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-4 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-wide text-teal">
          Quick check
        </p>
        <p className="mt-1 text-sm font-semibold text-navy">
          Did you sign up for {pending.title}?
        </p>
        <p className="mt-1 text-xs text-muted">
          We&apos;ll add it to your list so you don&apos;t lose track.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose("signed_up")}
            className="rounded-full bg-teal px-4 py-1.5 text-xs font-bold text-white hover:bg-teal-light"
          >
            Yes, I signed up
          </button>
          <button
            type="button"
            onClick={() => choose("considering")}
            className="rounded-full border-2 border-teal px-4 py-1.5 text-xs font-bold text-teal hover:bg-teal/5"
          >
            Still considering
          </button>
          <button
            type="button"
            onClick={() => dismiss(pending.id)}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface"
          >
            Not interested
          </button>
        </div>
      </div>
    </div>
  );
}
