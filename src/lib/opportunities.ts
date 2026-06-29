import { createClient } from "@/lib/supabase/server";

export type OpportunityCategory =
  | "virtual"
  | "in_person"
  | "fundraiser"
  | "joy_visit";

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  location: string | null;
  starts_at: string | null;
  source_url: string | null;
  age_range: string | null;
};

export type OpportunityWithSignup = Opportunity & { signed_up: boolean };

export const CATEGORY_LABELS: Record<OpportunityCategory, string> = {
  virtual: "Virtual",
  in_person: "In person",
  fundraiser: "Fundraiser",
  joy_visit: "Joy Visit",
};

export const CATEGORY_ICONS: Record<OpportunityCategory, string> = {
  virtual: "💻",
  in_person: "🏥",
  fundraiser: "🎁",
  joy_visit: "✨",
};

export async function getOpportunitiesForUser(
  userId: string,
): Promise<OpportunityWithSignup[]> {
  const supabase = await createClient();

  const [oppsRes, signupsRes] = await Promise.all([
    supabase
      .from("opportunities")
      .select(
        "id, title, description, category, location, starts_at, source_url, age_range",
      )
      .eq("is_active", true)
      .order("starts_at", { ascending: true, nullsFirst: false }),
    supabase
      .from("opportunity_signups")
      .select("opportunity_id")
      .eq("user_id", userId),
  ]);

  if (oppsRes.error) throw oppsRes.error;
  if (signupsRes.error) throw signupsRes.error;

  const signedUp = new Set(
    (signupsRes.data ?? []).map((row) => row.opportunity_id as string),
  );

  return (oppsRes.data ?? []).map((row) => ({
    ...(row as Opportunity),
    signed_up: signedUp.has(row.id as string),
  }));
}
