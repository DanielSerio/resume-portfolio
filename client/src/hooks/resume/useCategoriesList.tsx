import type { Client } from "@/main";
import { useSimpleListQuery } from "../core/useSimpleListQuery";

/**
 * A hook that fetches a list of categories from table "skill_category".
 */
export function useCategoriesList(supabase: Client) {
  return useSimpleListQuery({
    queryKey: ["categories"],
    supabase,
    from: "skill_category",
    select: "*",
  });
}
