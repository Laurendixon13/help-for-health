import { createClient } from "@/lib/supabase/server";

export type LeaderboardRow = {
  user_id: string;
  display_name: string;
  total_hours: number;
  monthly_hours: number;
};

export async function getLeaderboard(limit = 10): Promise<LeaderboardRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_volunteer_leaderboard", {
    limit_count: limit,
  });
  if (error) throw error;
  return (data ?? []).map((row: LeaderboardRow) => ({
    ...row,
    total_hours: Number(row.total_hours),
    monthly_hours: Number(row.monthly_hours),
  }));
}
