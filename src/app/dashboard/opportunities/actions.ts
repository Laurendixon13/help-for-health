"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleSignup(formData: FormData): Promise<void> {
  const opportunityId = String(formData.get("opportunity_id") ?? "");
  const currentlySignedUp = formData.get("signed_up") === "1";
  if (!opportunityId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (currentlySignedUp) {
    await supabase
      .from("opportunity_signups")
      .delete()
      .eq("opportunity_id", opportunityId)
      .eq("user_id", user.id);
  } else {
    await supabase
      .from("opportunity_signups")
      .insert({ opportunity_id: opportunityId, user_id: user.id });
  }

  revalidatePath("/dashboard/opportunities");
}
