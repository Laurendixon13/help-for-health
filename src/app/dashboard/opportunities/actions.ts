"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type Action = "signed_up" | "considering" | "clear";

async function applyStatus(opportunityId: string, action: Action) {
  if (!opportunityId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (action === "clear") {
    await supabase
      .from("opportunity_signups")
      .delete()
      .eq("opportunity_id", opportunityId)
      .eq("user_id", user.id);
  } else {
    // upsert: replace any existing signup row with the new status.
    await supabase
      .from("opportunity_signups")
      .delete()
      .eq("opportunity_id", opportunityId)
      .eq("user_id", user.id);
    await supabase.from("opportunity_signups").insert({
      opportunity_id: opportunityId,
      user_id: user.id,
      status: action,
    });
  }

  revalidatePath("/dashboard/opportunities");
  revalidatePath("/dashboard");
}

export async function setSignupStatus(formData: FormData): Promise<void> {
  const opportunityId = String(formData.get("opportunity_id") ?? "");
  const next = String(formData.get("next_status") ?? "");
  const current = String(formData.get("current_status") ?? "");

  if (!["signed_up", "considering"].includes(next)) return;

  // Toggle: clicking the active button cancels it.
  const action: Action = current === next ? "clear" : (next as Action);
  await applyStatus(opportunityId, action);
}
