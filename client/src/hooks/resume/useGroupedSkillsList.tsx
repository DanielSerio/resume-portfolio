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
    // Initialize category if it doesn't exist
    if (!grouped[skill.category_id]) {
      grouped[skill.category_id] = {};
    }

    // Determine subcategory key (use "null" for skills without subcategory)
    const subcategoryKey = skill.subcategory_id || "null";

    // Initialize subcategory array if it doesn't exist
    if (!grouped[skill.category_id][subcategoryKey]) {
      grouped[skill.category_id][subcategoryKey] = [];
    }

    // Add skill to the appropriate group
    grouped[skill.category_id][subcategoryKey].push(skill);
  }

  console.info(skills, grouped);

  return grouped;
}

/**
 * Gets a flat list of skills with its joined entities
 * @param supabase - the supabase client
 */
export function useGroupedSkillsList(supabase: Client) {
  return useQuery({
    queryKey: ["skills", "grouped"],
    queryFn: async () => groupSkillsDataByCategory(await query(supabase)),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Record<categoryId, Record<subcategoryId, {@link SkillObject}[]>>
 */
export type GroupedSkills = NonNullable<
  ReturnType<typeof useGroupedSkillsList>["data"]
>;
