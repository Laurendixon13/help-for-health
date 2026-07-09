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

export type PublicChapter = {
  id: string;
  school_name: string;
  school_city: string;
  school_state: string;
  member_count: number;
  is_member: boolean;
};

export async function getPublicChapters(): Promise<PublicChapter[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [chaptersRes, membershipsRes] = await Promise.all([
    supabase.rpc("get_public_chapters_with_counts"),
    user
      ? supabase
          .from("chapter_memberships")
          .select("chapter_id")
          .eq("user_id", user.id)
      : Promise.resolve({ data: [] as { chapter_id: string }[], error: null }),
  ]);
  if (chaptersRes.error) throw chaptersRes.error;
  if (membershipsRes.error) throw membershipsRes.error;

  const memberOf = new Set(
    (membershipsRes.data ?? []).map((m) => m.chapter_id as string),
  );
  type ChapterRpcRow = {
    id: string;
    school_name: string;
    school_city: string;
    school_state: string;
    member_count: number | string | null;
  };
  return ((chaptersRes.data ?? []) as ChapterRpcRow[]).map((row) => ({
    id: row.id,
    school_name: row.school_name,
    school_city: row.school_city,
    school_state: row.school_state,
    member_count: Number(row.member_count ?? 0),
    is_member: memberOf.has(row.id),
  }));
}

export type MyChapterMembership = {
  chapter_id: string;
  school_name: string;
  school_city: string;
  school_state: string;
  joined_at: string;
};

export async function getMyChapterMemberships(): Promise<MyChapterMembership[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase.rpc("get_my_chapter_memberships");
  if (error) throw error;
  return (data ?? []) as MyChapterMembership[];
}
