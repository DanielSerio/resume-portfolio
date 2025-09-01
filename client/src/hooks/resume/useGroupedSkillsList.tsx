import type { Client } from "@/main";
import { useQuery } from "@tanstack/react-query";
import type { ResumeFilterState } from "./useResumeFilters";

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

function applyFiltersToSkills(
  skills: SkillObject[],
  filters: ResumeFilterState
): SkillObject[] {
  let filteredSkills = [...skills];

  // Apply search filter
  if (filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim();
    filteredSkills = filteredSkills.filter(
      (skill) =>
        skill.name!.toLowerCase().includes(searchTerm) ||
        skill.category?.name.toLowerCase().includes(searchTerm) ||
        skill.subcategory?.name.toLowerCase().includes(searchTerm) ||
        skill.employer_experience?.some((emp) =>
          emp.name.toLowerCase().includes(searchTerm)
        )
    );
  }

  // Apply category filter
  if (filters.categories.length > 0) {
    filteredSkills = filteredSkills.filter((skill) =>
      filters.categories.includes(skill.category_id)
    );
  }

  // Apply subcategory filter
  if (filters.subcategories.length > 0) {
    filteredSkills = filteredSkills.filter(
      (skill) =>
        skill.subcategory_id &&
        filters.subcategories.includes(skill.subcategory_id)
    );
  }

  // Apply employer filter
  if (filters.employers.length > 0) {
    filteredSkills = filteredSkills.filter((skill) =>
      skill.employer_experience?.some((emp) =>
        filters.employers.includes(emp.employer_experience_id)
      )
    );
  }

  // Apply sorting
  filteredSkills.sort((a, b) => {
    let aValue: any, bValue: any;

    switch (filters.sort.field) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "comfort_level":
        aValue = a.comfort_level;
        bValue = b.comfort_level;
        break;
      case "last_updated_at":
        aValue = new Date(a.last_updated_at);
        bValue = new Date(b.last_updated_at);
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (filters.sort.direction === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return filteredSkills;
}

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
export function useGroupedSkillsList(
  supabase: Client,
  filters: ResumeFilterState
) {
  console.info("filters", filters);
  return useQuery({
    queryKey: ["skills", "grouped", filters],
    queryFn: async () => {
      const rawSkills = await query(supabase);
      const filteredSkills = applyFiltersToSkills(rawSkills, filters);
      return groupSkillsDataByCategory(filteredSkills);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Record<categoryId, Record<subcategoryId, {@link SkillObject}[]>>
 */
export type GroupedSkills = NonNullable<
  ReturnType<typeof useGroupedSkillsList>["data"]
>;
