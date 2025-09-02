import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
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

export interface UseSkillFormProps {
  onSuccess: () => void;
}

export function useCreateSkillForm({ onSuccess }: UseSkillFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  return useZodForm({
    schema: SkillInsertSchema,
    queryKey: ["skills"],
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
          .filter(exp => exp.id) // Only include non-empty selections
          .map(exp => ({
            skill_id: insertedSkill.id,
            employer_experience_id: exp.id,
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
    onSuccess: async () => {
      await toast.success("Skill created successfully");
      onSuccess();
    },
    onError: async (error) => {
      await toast.error("Failed to create skill:", error);
    },
  });
}

export function useUpdateSkillForm(skill: Skill, { onSuccess }: UseSkillFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  // Transform the skill data to match form structure
  const defaultValues = {
    ...skill,
  };

  return useZodForm({
    schema: SkillUpdateSchema,
    queryKey: ["skills"],
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
          .filter(exp => exp.id) // Only include non-empty selections
          .map(exp => ({
            skill_id: skill.id,
            employer_experience_id: exp.id,
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
    onSuccess: async () => {
      await toast.success("Skill updated successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to update skill:", error);
    },
  });
}

export function useDeleteSkillForm(skill: Skill, { onSuccess }: UseSkillFormProps) {
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
    queryKey: ["skills"],
    mutationFn: async () => {
      // Delete the skill
      const { error } = await supabase
        .from("skill")
        .delete()
        .eq("id", skill.id);

      if (error) throw error;

      return { id: skill.id };
    },
    onSuccess: async () => {
      await toast.success("Skill deleted successfully");
      setIsConfirmed(false);
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to delete skill:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skill,
  };
}