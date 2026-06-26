"use server";

import { createClient } from "@/lib/supabase/server";

export type JoyVisitRequestState =
  | { error: string }
  | { ok: true }
  | undefined;

const ROLES = [
  "student",
  "parent",
  "hospital_staff",
  "donor",
  "guest",
  "other",
] as const;

const REQUEST_TYPES = [
  "request",
  "suggest_guest",
  "become_guest",
  "donate_sponsor",
] as const;

export async function submitJoyVisitRequest(
  _prev: JoyVisitRequestState,
  formData: FormData,
): Promise<JoyVisitRequestState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const name = get("name").slice(0, 100);
  const email = get("email").slice(0, 200);
  const role = get("role");
  const requestType = get("request_type");
  const guestInfo = get("guest_info").slice(0, 200) || null;
  const hospitalOrCity = get("hospital_or_city").slice(0, 200) || null;
  const message = get("message").slice(0, 2000) || null;

  if (!name || !email || !role || !requestType) {
    return { error: "Please fill in your name, email, role, and request type." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "That email doesn't look right." };
  }
  if (!(ROLES as readonly string[]).includes(role)) {
    return { error: "Please pick a valid role." };
  }
  if (!(REQUEST_TYPES as readonly string[]).includes(requestType)) {
    return { error: "Please pick what you'd like to do." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("joy_visit_requests").insert({
    name,
    email,
    role,
    request_type: requestType,
    guest_info: guestInfo,
    hospital_or_city: hospitalOrCity,
    message,
  });

  if (error) return { error: error.message };
  return { ok: true };
}
