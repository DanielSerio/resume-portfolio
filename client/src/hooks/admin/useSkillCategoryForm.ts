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
import { useRouteContext } from "@tanstack/react-router";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillCategorySchema = z.object({
  confirmName: z.string(),
});

export function useCreateSkillCategoryForm() {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  return useZodForm({
    schema: SkillCategoryInsertSchema,
    queryKey: ["skill-categories"],
    mutationFn: async (data: SkillCategoryInsert) => {
      const { data: insertedCategory, error } = await supabase
        .from("skill_category")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedCategory;
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
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  return useZodForm({
    schema: SkillCategoryUpdateSchema,
    queryKey: ["skill-categories"],
    formOptions: {
      defaultValues: skillCategory,
    },
    mutationFn: async (data: SkillCategoryUpdate) => {
      const { data: updatedCategory, error } = await supabase
        .from("skill_category")
        .update(data)
        .eq("id", skillCategory.id)
        .select()
        .single();

      if (error) throw error;
      return updatedCategory;
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
  const { supabase } = useRouteContext({ from: "/admin/categories" });
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
      const { error } = await supabase
        .from("skill_category")
        .delete()
        .eq("id", skillCategory.id);

      if (error) throw error;
      return { id: skillCategory.id };
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