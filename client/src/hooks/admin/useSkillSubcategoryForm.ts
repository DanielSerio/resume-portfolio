import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  SkillSubcategoryInsertSchema,
  SkillSubcategoryUpdateSchema,
  type SkillSubcategory,
  type SkillSubcategoryInsert,
  type SkillSubcategoryUpdate,
} from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";
import { toast } from "sonner";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillSubcategorySchema = z.object({
  confirmName: z.string(),
});

export interface UseSubcategoryFormProps {
  onSuccess: () => void;
}

export function useCreateSkillSubcategoryForm({ onSuccess }: UseSubcategoryFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });

  return useZodForm({
    schema: SkillSubcategoryInsertSchema,
    queryKey: ["subcategories"],
    mutationFn: async (data: SkillSubcategoryInsert) => {
      const { data: insertedSubcategory, error } = await supabase
        .from("skill_subcategory")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedSubcategory;
    },
    onSuccess: async () => {
      await toast.success("Subcategory created successfully");
      onSuccess();
    },
    onError: async (error) => {
      await toast.error("Failed to create subcategory:", error);
    },
  });
}

export function useUpdateSkillSubcategoryForm(skillSubcategory: SkillSubcategory, { onSuccess }: UseSubcategoryFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });
  return useZodForm({
    schema: SkillSubcategoryUpdateSchema,
    queryKey: ["subcategories"],
    formOptions: {
      defaultValues: skillSubcategory,
    },
    mutationFn: async (data: SkillSubcategoryUpdate) => {
      const { data: updatedSubcategory, error } = await supabase
        .from("skill_subcategory")
        .update(data)
        .eq("id", skillSubcategory.id)
        .select()
        .single();

      if (error) throw error;
      return updatedSubcategory;
    },
    onSuccess: async () => {
      await toast.success("Subcategory updated successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to update subcategory:", error);
    },
  });
}

export function useDeleteSkillSubcategoryForm(skillSubcategory: SkillSubcategory, { onSuccess }: UseSubcategoryFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const deleteSchema = DeleteSkillSubcategorySchema.refine(
    (data) => data.confirmName === skillSubcategory.name,
    {
      message: `Please type "${skillSubcategory.name}" to confirm deletion`,
      path: ["confirmName"],
    }
  );

  const form = useZodForm({
    schema: deleteSchema,
    queryKey: ["subcategories"],
    mutationFn: async () => {
      const { error } = await supabase
        .from("skill_subcategory")
        .delete()
        .eq("id", skillSubcategory.id);

      if (error) throw error;
      return { id: skillSubcategory.id };
    },
    onSuccess: async () => {
      await toast.success("Subcategory deleted successfully");
      setIsConfirmed(false);
      onSuccess();
    },
    onError: (error) => {
      toast.error("Failed to delete subcategory:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skillSubcategory,
  };
}