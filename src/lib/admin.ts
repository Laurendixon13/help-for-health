import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PendingHoursRow = {
  id: string;
  user_id: string;
  hours: number;
  activity: string;
  occurred_on: string;
  location: string | null;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  volunteer_email: string;
  volunteer_name: string | null;
};

export type ChapterApplicationStatus =
  | "new"
  | "in_review"
  | "approved"
  | "declined";

export type ChapterApplicationRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  school_name: string;
  school_city: string;
  school_state: string;
  grade: string | null;
  why: string | null;
  status: ChapterApplicationStatus;
  created_at: string;
};

export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.app_metadata?.role === "admin";
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in?next=/dashboard/admin");
  if (user.app_metadata?.role !== "admin") redirect("/dashboard");
}

export async function getPendingHours(): Promise<PendingHoursRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "get_pending_hours_with_volunteer",
  );
  if (error) throw error;
  return (data ?? []) as PendingHoursRow[];
}

export async function getChapterApplications(): Promise<
  ChapterApplicationRow[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chapter_applications")
    .select(
      "id, first_name, last_name, email, school_name, school_city, school_state, grade, why, status, created_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ChapterApplicationRow[];
}

export type JoyVisitRequestStatus = "new" | "in_review" | "closed";

export type JoyVisitRequestRole =
  | "student"
  | "parent"
  | "hospital_staff"
  | "donor"
  | "guest"
  | "other";

export type JoyVisitRequestType =
  | "request"
  | "suggest_guest"
  | "become_guest"
  | "donate_sponsor";

export type JoyVisitRequestRow = {
  id: string;
  name: string;
  email: string;
  role: JoyVisitRequestRole;
  request_type: JoyVisitRequestType;
  guest_info: string | null;
  hospital_or_city: string | null;
  message: string | null;
  status: JoyVisitRequestStatus;
  created_at: string;
};

export async function getJoyVisitRequests(): Promise<JoyVisitRequestRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("joy_visit_requests")
    .select(
      "id, name, email, role, request_type, guest_info, hospital_or_city, message, status, created_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as JoyVisitRequestRow[];
}
