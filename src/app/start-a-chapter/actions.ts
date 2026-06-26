"use server";

import { createClient } from "@/lib/supabase/server";

export type ChapterApplicationState =
  | { error: string }
  | { ok: true }
  | undefined;

export async function submitChapterApplication(
  _prev: ChapterApplicationState,
  formData: FormData,
): Promise<ChapterApplicationState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const firstName = get("first_name").slice(0, 60);
  const lastName = get("last_name").slice(0, 60);
  const email = get("email").slice(0, 200);
  const schoolName = get("school_name").slice(0, 200);
  const schoolCity = get("school_city").slice(0, 100);
  const schoolState = get("school_state").slice(0, 50);
  const grade = get("grade").slice(0, 20) || null;
  const why = get("why").slice(0, 1000) || null;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !schoolName ||
    !schoolCity ||
    !schoolState
  ) {
    return { error: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "That email doesn't look right." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("chapter_applications").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    school_name: schoolName,
    school_city: schoolCity,
    school_state: schoolState,
    grade,
    why,
  });

  if (error) return { error: error.message };
  return { ok: true };
}
