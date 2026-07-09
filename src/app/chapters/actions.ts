"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function joinChapter(formData: FormData): Promise<void> {
  const chapterId = String(formData.get("chapter_id") ?? "");
  if (!chapterId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/sign-in?next=/chapters`);
  }

  // Confirm the chapter is actually approved before creating the membership,
  // via the public directory function which already filters by status.
  const { data: chapters } = await supabase.rpc(
    "get_public_chapters_with_counts",
  );
  const approved = (chapters ?? []).some(
    (c: { id: string }) => c.id === chapterId,
  );
  if (!approved) return;

  await supabase.from("chapter_memberships").insert({
    user_id: user.id,
    chapter_id: chapterId,
  });

  revalidatePath("/chapters");
  revalidatePath("/dashboard");
}

export async function leaveChapter(formData: FormData): Promise<void> {
  const chapterId = String(formData.get("chapter_id") ?? "");
  if (!chapterId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("chapter_memberships")
    .delete()
    .eq("user_id", user.id)
    .eq("chapter_id", chapterId);

  revalidatePath("/chapters");
  revalidatePath("/dashboard");
}
