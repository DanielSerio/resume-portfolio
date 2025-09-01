import { useGroupedSkillsList, type SkillObject } from "./useGroupedSkillsList";
import type { Client } from "@/main";
import { useMemo } from "react";

export interface FilterOptions {
  categories: Array<{ id: string; name: string }>;
  subcategories: Array<{ id: string; name: string }>;
  employers: Array<{ id: string; name: string }>;
}

export function useFilterOptions(supabase: Client) {
  // Use empty filters to get all data for filter options
  const skillsQuery = useGroupedSkillsList(supabase, {
    search: "",
    sort: { field: "name", direction: "asc" },
    categories: [],
    subcategories: [],
    employers: [],
  });

  const filterOptions: FilterOptions = useMemo(() => {
    if (!skillsQuery.data) {
      return {
        categories: [],
        subcategories: [],
        employers: [],
      };
    }

    // Get all unique categories, subcategories, and employers from the skills data
    const skills: SkillObject[] = [];
    
    // Flatten the grouped skills data to get all skills
    Object.values(skillsQuery.data).forEach(categoryGroup => {
      Object.values(categoryGroup).forEach(subcategorySkills => {
        skills.push(...subcategorySkills);
      });
    });

    // Extract unique categories
    const categoriesMap = new Map<string, { id: string; name: string }>();
    skills.forEach(skill => {
      if (skill.category && !categoriesMap.has(skill.category.id)) {
        categoriesMap.set(skill.category.id, {
          id: skill.category.id,
          name: skill.category.name,
        });
      }
    });

    // Extract unique subcategories
    const subcategoriesMap = new Map<string, { id: string; name: string }>();
    skills.forEach(skill => {
      if (skill.subcategory && !subcategoriesMap.has(skill.subcategory.id)) {
        subcategoriesMap.set(skill.subcategory.id, {
          id: skill.subcategory.id,
          name: skill.subcategory.name,
        });
      }
    });

    // Extract unique employers
    const employersMap = new Map<string, { id: string; name: string }>();
    skills.forEach(skill => {
      if (skill.employer_experience?.length) {
        skill.employer_experience.forEach(emp => {
          if (!employersMap.has(emp.employer_experience_id)) {
            employersMap.set(emp.employer_experience_id, {
              id: emp.employer_experience_id,
              name: emp.name,
            });
          }
        });
      }
    });

    return {
      categories: Array.from(categoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
      subcategories: Array.from(subcategoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
      employers: Array.from(employersMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    };
  }, [skillsQuery.data]);

  return {
    ...skillsQuery,
    data: filterOptions,
  };
}