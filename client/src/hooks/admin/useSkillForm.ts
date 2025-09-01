import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  SkillInsertSchema,
  SkillUpdateSchema,
  type Skill,
  type SkillInsert,
  type SkillUpdate,
} from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillSchema = z.object({
  confirmName: z.string(),
});

export interface SkillFormParams {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function useCreateSkillForm({ onSuccess, onError }: SkillFormParams) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  return useZodForm({
    schema: SkillInsertSchema,
    formOptions: {
      defaultValues: {
        name: "",
        category_id: "",
        subcategory_id: null,
        comfort_level: 1,
        last_updated_at: new Date().toISOString(),
        employer_experience: [],
      },
    },
    mutationFn: async (data: SkillInsert) => {
      const { employer_experience, ...skillData } = data;

      // Insert the skill first
      const { data: insertedSkill, error: skillError } = await supabase
        .from("skill")
        .insert(skillData)
        .select()
        .single();

      if (skillError) throw skillError;

      // Handle join table relationships if employer experiences are provided
      if (employer_experience && employer_experience.length > 0) {
        const joinTableData = employer_experience
          .filter(exp => exp.employer_experience_id) // Only include non-empty selections
          .map(exp => ({
            skill_id: insertedSkill.id,
            employer_experience_id: exp.employer_experience_id,
          }));

        if (joinTableData.length > 0) {
          const { error: joinError } = await supabase
            .from("skill_employer_experience")
            .insert(joinTableData);

          if (joinError) throw joinError;
        }
      }

      return insertedSkill;
    },
    onSuccess,
    onError,
  });
}

export function useUpdateSkillForm(skill: Skill, { onSuccess, onError }: SkillFormParams) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  // Transform the skill data to match form structure
  const defaultValues = {
    ...skill,
    employer_experience: skill.employer_experience || [],
  };

  return useZodForm({
    schema: SkillUpdateSchema,
    formOptions: {
      defaultValues,
    },
    mutationFn: async (data: SkillUpdate) => {
      const { employer_experience, ...skillData } = data;

      // Update the skill first
      const { data: updatedSkill, error: skillError } = await supabase
        .from("skill")
        .update(skillData)
        .eq("id", skill.id)
        .select()
        .single();

      if (skillError) throw skillError;

      // Delete existing join table relationships
      const { error: deleteError } = await supabase
        .from("skill_employer_experience")
        .delete()
        .eq("skill_id", skill.id);

      if (deleteError) throw deleteError;

      // Insert new join table relationships if provided
      if (employer_experience && employer_experience.length > 0) {
        const joinTableData = employer_experience
          .filter(exp => exp.employer_experience_id) // Only include non-empty selections
          .map(exp => ({
            skill_id: skill.id,
            employer_experience_id: exp.employer_experience_id,
          }));

        if (joinTableData.length > 0) {
          const { error: joinError } = await supabase
            .from("skill_employer_experience")
            .insert(joinTableData);

          if (joinError) throw joinError;
        }
      }

      return updatedSkill;
    },
    onSuccess,
    onError,
  });
}

export function useDeleteSkillForm(skill: Skill, { onSuccess, onError }: SkillFormParams) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const deleteSchema = DeleteSkillSchema.refine(
    (data) => data.confirmName === (skill.name || skill.id),
    {
      message: `Please type "${skill.name || skill.id}" to confirm deletion`,
      path: ["confirmName"],
    }
  );

  const form = useZodForm({
    schema: deleteSchema,
    mutationFn: async () => {
      // Delete join table relationships first
      const { error: joinError } = await supabase
        .from("skill_employer_experience")
        .delete()
        .eq("skill_id", skill.id);

      if (joinError) throw joinError;

      // Delete the skill
      const { error: skillError } = await supabase
        .from("skill")
        .delete()
        .eq("id", skill.id);

      if (skillError) throw skillError;

      return { id: skill.id };
    },
    onSuccess,
    onError,
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skill,
  };
}