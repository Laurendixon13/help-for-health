"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfileState = { error: string } | { ok: true } | undefined;

export async function updateName(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const firstName = String(formData.get("first_name") ?? "").trim().slice(0, 60);
  const lastName = String(formData.get("last_name") ?? "").trim().slice(0, 60);

  if (!firstName) return { error: "First name is required." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { first_name: firstName, last_name: lastName },
  });
  if (error) return { error: error.message };

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  return { ok: true };
}
