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

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillSchema = z.object({
  confirmName: z.string(),
});

export function useCreateSkillForm() {
  return useZodForm({
    schema: SkillInsertSchema,
    queryKey: ["skills"],
    mutationFn: async (data: SkillInsert) => {
      // TODO: Implement create mutation
      console.log("Creating skill:", data);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill created successfully");
    },
    onError: (error) => {
      console.error("Failed to create skill:", error);
    },
  });
}

export function useUpdateSkillForm(skill: Skill) {
  // Transform the skill data to match form structure
  const defaultValues = {
    ...skill,
    employer_experience: skill.employer_experience || [],
  };

  console.info('useUpdateSkillForm defaultValues', defaultValues);

  return useZodForm({
    schema: SkillUpdateSchema,
    queryKey: ["skills"],
    formOptions: {
      defaultValues,
    },
    mutationFn: async (data: SkillUpdate) => {
      // TODO: Implement update mutation
      console.log("Updating skill:", { id: skill.id, ...data });
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update skill:", error);
    },
  });
}

export function useDeleteSkillForm(skill: Skill) {
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
      // TODO: Implement delete mutation
      console.log("Deleting skill:", skill.id);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill deleted successfully");
      setIsConfirmed(false);
    },
    onError: (error) => {
      console.error("Failed to delete skill:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skill,
  };
}