"use client";

const STORAGE_KEY = "h4h.clickedOpportunities";

type ClickedRecord = {
  id: string;
  title: string;
  clickedAt: number;
};

export function recordOpportunityClick(id: string, title: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: ClickedRecord[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((r) => r.id !== id);
    filtered.push({ id, title, clickedAt: Date.now() });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // localStorage may be unavailable (private mode); fail silent.
  }
}

export function LearnMoreLink({
  id,
  title,
  href,
}: {
  id: string;
  title: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordOpportunityClick(id, title)}
      className="text-xs font-semibold text-teal hover:underline"
    >
      Learn more →
    </a>
  );
}
