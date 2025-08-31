import type { Client } from "@/main";
import { useSimpleListQuery } from "../core/useSimpleListQuery";

/**
 * A hook that fetches a flat list of skills from table "skill".
 */
export function useSkillsList(supabase: Client) {
  return useSimpleListQuery({
    queryKey: ["skills"],
    supabase,
    from: "skill",
    select: `
      id,
      name,
      comfort_level,
      category_id,
      subcategory_id,
      last_updated_at,
      category:category_id(id, name),
      subcategory:subcategory_id(id, name)
    `,
  });
}
