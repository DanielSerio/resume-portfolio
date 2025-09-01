import type { Client } from "@/main";
import { useSimpleListQuery } from "../core/useSimpleListQuery";

/**
 * A hook that fetches a list of subcategories from table "skill_subcategory".
 */
export function useSubcategoriesList(supabase: Client) {
  return useSimpleListQuery({
    queryKey: ["subcategories"],
    supabase,
    from: "skill_subcategory",
    select: "*",
  });
}
