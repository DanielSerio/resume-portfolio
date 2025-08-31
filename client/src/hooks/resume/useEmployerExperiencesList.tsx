import type { Client } from "@/main";
import { useSimpleListQuery } from "../core/useSimpleListQuery";

/**
 * A hook that fetches a list of employer experiences from table "employer_experience".
 */
export function useEmployerExperiencesList(supabase: Client) {
  return useSimpleListQuery({
    queryKey: ["employer-experiences"],
    supabase,
    from: "employer_experience",
    select: "*",
  });
}