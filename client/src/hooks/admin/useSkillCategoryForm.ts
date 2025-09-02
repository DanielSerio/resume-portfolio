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
import { toast } from "sonner";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillCategorySchema = z.object({
  confirmName: z.string(),
});

interface Methods {
  onSuccess: () => void;
}

export function useCreateSkillCategoryForm({ onSuccess }: Methods) {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  return useZodForm({
    schema: SkillCategoryInsertSchema,
    queryKey: ["categories"],
    mutationFn: async (data: SkillCategoryInsert) => {
      const { data: insertedCategory, error } = await supabase
        .from("skill_category")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedCategory;
    },
    onSuccess: async () => {
      await toast.success("Category created successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to create skill category:", error);
    },
  });
}

export function useUpdateSkillCategoryForm(skillCategory: SkillCategory, { onSuccess }: Methods) {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  return useZodForm({
    schema: SkillCategoryUpdateSchema,
    queryKey: ["categories"],
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
    onSuccess: async () => {
      await toast.success("Category updated successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to update skill category:", error);
    },
  });
}

export function useDeleteSkillCategoryForm(skillCategory: SkillCategory, { onSuccess }: Methods) {
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
    queryKey: ["categories"],
    mutationFn: async () => {
      const { error } = await supabase
        .from("skill_category")
        .delete()
        .eq("id", skillCategory.id);

      if (error) throw error;
      return { id: skillCategory.id };
    },
    onSuccess: async () => {
      await toast.success("Category deleted successfully");
      setIsConfirmed(false);
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to delete skill category:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skillCategory,
  };
}