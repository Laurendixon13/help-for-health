import { createClient } from "@/lib/supabase/server";

export type HoursEntry = {
  id: string;
  hours: number;
  activity: string;
  occurred_on: string;
  location: string | null;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type HoursStats = {
  total: number;
  approved: number;
  pending: number;
};

export async function getHoursForUser(userId: string): Promise<HoursEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hours_entries")
    .select("id, hours, activity, occurred_on, location, notes, status, created_at")
    .eq("user_id", userId)
    .order("occurred_on", { ascending: false });

  if (error) throw error;
  return (data ?? []) as HoursEntry[];
}

export function summarizeHours(entries: HoursEntry[]): HoursStats {
  let total = 0;
  let approved = 0;
  let pending = 0;
  for (const entry of entries) {
    const h = Number(entry.hours);
    total += h;
    if (entry.status === "approved") approved += h;
    if (entry.status === "pending") pending += h;
  }
  return { total, approved, pending };
}
