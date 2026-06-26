"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendChapterStatusEmail } from "@/lib/email";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "admin") {
    throw new Error("Not authorized");
  }
}

const HOURS_STATUSES = ["pending", "approved", "rejected"] as const;
const APPLICATION_STATUSES = [
  "new",
  "in_review",
  "approved",
  "declined",
] as const;

export async function updateHoursStatus(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(HOURS_STATUSES as readonly string[]).includes(status)) {
    throw new Error("Invalid input");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hours_entries")
    .update({ status })
    .eq("id", id)
    .select("id");
  if (error) throw error;
  if (!data || data.length === 0) {
    console.error(
      `updateHoursStatus: zero rows updated for id=${id} (RLS blocked?)`,
    );
    throw new Error("Update was blocked. Admin role may not be applied yet.");
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/hours");
  revalidatePath("/dashboard");
}

export async function updateApplicationStatus(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(APPLICATION_STATUSES as readonly string[]).includes(status)) {
    throw new Error("Invalid input");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chapter_applications")
    .update({ status })
    .eq("id", id)
    .select("email, first_name, school_name")
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("Update was blocked. Admin role may not be applied yet.");
  }

  if (status === "in_review" || status === "approved" || status === "declined") {
    await sendChapterStatusEmail({
      to: data.email,
      firstName: data.first_name,
      schoolName: data.school_name,
      status,
    });
  }

  revalidatePath("/dashboard/admin");
}
