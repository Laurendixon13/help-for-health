import { createClient } from "@/lib/supabase/server";

export type MyChapterApplication = {
  id: string;
  school_name: string;
  school_city: string;
  school_state: string;
  status: "new" | "in_review" | "approved" | "declined";
  created_at: string;
};

export async function getMyChapterApplications(): Promise<
  MyChapterApplication[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_my_chapter_applications");
  if (error) throw error;
  return (data ?? []) as MyChapterApplication[];
}
