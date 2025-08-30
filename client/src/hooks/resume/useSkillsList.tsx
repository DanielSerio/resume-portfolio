import type { Client } from "@/main";
import { useQuery } from "@tanstack/react-query";

/**
 * Gets a flat list of skills with its joined entities
 * @param supabase - the supabase client
 */
export function useSkillsList(supabase: Client) {
  return useQuery({
    queryKey: ["skills"],
    async queryFn() {
      const { error, data } = await supabase.from(`skill`).select(`
      id,
      name,
      comfort_level,
      category_id,
      subcategory_id,
      last_updated_at,
      category:category_id(id, name),
      subcategory:subcategory_id(id, name),
      skill_employer_experience(id:skill_id,employer_experience_id),
      employer_experience(employer_experience_id:id,name)
      `);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
