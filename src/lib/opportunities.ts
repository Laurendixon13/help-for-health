import { createClient } from "@/lib/supabase/server";
import {
  type Opportunity,
  type OpportunityWithSignup,
  type SignupStatus,
} from "@/lib/opportunities-types";

export type {
  Opportunity,
  OpportunityCategory,
  OpportunityWithSignup,
  SignupStatus,
} from "@/lib/opportunities-types";
export { CATEGORY_ICONS, CATEGORY_LABELS } from "@/lib/opportunities-types";

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
      .select("opportunity_id, status")
      .eq("user_id", userId),
  ]);

  if (oppsRes.error) throw oppsRes.error;
  if (signupsRes.error) throw signupsRes.error;

  const statusByOpp = new Map<string, SignupStatus>(
    (signupsRes.data ?? []).map((row) => [
      row.opportunity_id as string,
      (row.status ?? "signed_up") as SignupStatus,
    ]),
  );

  return (oppsRes.data ?? []).map((row) => ({
    ...(row as Opportunity),
    signup_status: statusByOpp.get(row.id as string) ?? null,
  }));
}
