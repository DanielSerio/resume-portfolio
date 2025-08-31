import type { Client } from "@/main";
import { useQuery } from "@tanstack/react-query";

async function query(supabase: Client) {
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

  return await data;
}

export type SkillObject = Awaited<ReturnType<typeof query>>[number];

function groupSkillsDataByCategory(skills: SkillObject[]) {
  const grouped: Record<string, Record<string, SkillObject[]>> = {};

  for (const skill of skills) {
    if (!grouped[skill.category_id]) {
      grouped[skill.category_id] = {
        null: [],
      };

      if (
        skill.subcategory_id &&
        !grouped[skill.category_id][skill.subcategory_id]
      ) {
        grouped[skill.category_id][skill.subcategory_id] = [skill];
      } else if (!skill.subcategory_id) {
        grouped[skill.category_id]["null"].push(skill);
      } else if (
        skill.subcategory_id &&
        grouped[skill.category_id][skill.subcategory_id]
      ) {
        grouped[skill.category_id][skill.subcategory_id].push(skill);
      }
    }
  }

  return grouped;
}

/**
 * Gets a flat list of skills with its joined entities
 * @param supabase - the supabase client
 */
export function useSkillsList(supabase: Client) {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => groupSkillsDataByCategory(await query(supabase)),
  });
}

/**
 * Record<categoryId, Record<subcategoryId, {@link SkillObject}[]>>
 */
export type GroupedSkills = NonNullable<
  ReturnType<typeof useSkillsList>["data"]
>;
