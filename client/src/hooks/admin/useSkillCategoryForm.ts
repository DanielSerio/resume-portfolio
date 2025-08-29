import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  SkillCategoryInsertSchema,
  SkillCategoryUpdateSchema,
  SkillCategorySchema,
  type SkillCategory,
  type SkillCategoryInsert,
  type SkillCategoryUpdate,
} from "@/lib/schemas";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillCategorySchema = z.object({
  confirmName: z.string(),
});

export function useCreateSkillCategoryForm() {
  return useZodForm({
    schema: SkillCategoryInsertSchema,
    queryKey: ["skill-categories"],
    mutationFn: async (data: SkillCategoryInsert) => {
      // TODO: Implement create mutation
      console.log("Creating skill category:", data);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill category created successfully");
    },
    onError: (error) => {
      console.error("Failed to create skill category:", error);
    },
  });
}

export function useUpdateSkillCategoryForm(skillCategory: SkillCategory) {
  return useZodForm({
    schema: SkillCategoryUpdateSchema,
    queryKey: ["skill-categories"],
    formOptions: {
      defaultValues: skillCategory,
    },
    mutationFn: async (data: SkillCategoryUpdate) => {
      // TODO: Implement update mutation
      console.log("Updating skill category:", { id: skillCategory.id, ...data });
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill category updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update skill category:", error);
    },
  });
}

export function useDeleteSkillCategoryForm(skillCategory: SkillCategory) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const deleteSchema = DeleteSkillCategorySchema.refine(
    (data) => data.confirmName === skillCategory.name,
    {
      message: `Please type "${skillCategory.name}" to confirm deletion`,
      path: ["confirmName"],
    }
  );

  const form = useZodForm({
    schema: deleteSchema,
    queryKey: ["skill-categories"],
    mutationFn: async () => {
      // TODO: Implement delete mutation
      console.log("Deleting skill category:", skillCategory.id);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill category deleted successfully");
      setIsConfirmed(false);
    },
    onError: (error) => {
      console.error("Failed to delete skill category:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skillCategory,
  };
}