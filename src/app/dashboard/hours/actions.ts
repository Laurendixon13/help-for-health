"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendHoursVerificationRequest } from "@/lib/email";

export type LogHoursState = { error: string } | { ok: true } | undefined;

export async function logHours(
  _prev: LogHoursState,
  formData: FormData,
): Promise<LogHoursState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in." };

  const hoursRaw = String(formData.get("hours") ?? "");
  const hours = Number(hoursRaw);
  const activity = String(formData.get("activity") ?? "").trim();
  const occurredOn = String(formData.get("occurred_on") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const organizerEmail =
    String(formData.get("organizer_email") ?? "").trim() || null;

  if (!Number.isFinite(hours) || hours <= 0 || hours > 24) {
    return { error: "Hours must be between 0 and 24." };
  }
  if (!activity) return { error: "Activity is required." };
  if (!occurredOn) return { error: "Date is required." };
  if (organizerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizerEmail)) {
    return { error: "That organizer email doesn't look right." };
  }

  const { error } = await supabase.from("hours_entries").insert({
    user_id: user.id,
    hours,
    activity,
    occurred_on: occurredOn,
    location,
    notes,
  });

  if (error) return { error: error.message };

  if (organizerEmail) {
    const firstName =
      (user.user_metadata?.first_name as string | undefined) ?? "";
    const lastName =
      (user.user_metadata?.last_name as string | undefined) ?? "";
    const volunteerName =
      `${firstName} ${lastName}`.trim() || user.email || "A volunteer";

    await sendHoursVerificationRequest({
      to: organizerEmail,
      volunteerName,
      volunteerEmail: user.email ?? "",
      hours,
      occurredOn,
      activity,
      location,
      notes,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/hours");
  return { ok: true };
}
