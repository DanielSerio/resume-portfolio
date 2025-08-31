import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  SkillSubcategoryInsertSchema,
  SkillSubcategoryUpdateSchema,
  SkillSubcategorySchema,
  type SkillSubcategory,
  type SkillSubcategoryInsert,
  type SkillSubcategoryUpdate,
} from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillSubcategorySchema = z.object({
  confirmName: z.string(),
});

export function useCreateSkillSubcategoryForm() {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });

  return useZodForm({
    schema: SkillSubcategoryInsertSchema,
    queryKey: ["skill-subcategories"],
    mutationFn: async (data: SkillSubcategoryInsert) => {
      const { data: insertedSubcategory, error } = await supabase
        .from("skill_subcategory")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedSubcategory;
    },
    onSuccess: () => {
      console.log("Skill subcategory created successfully");
    },
    onError: (error) => {
      console.error("Failed to create skill subcategory:", error);
    },
  });
}

export function useUpdateSkillSubcategoryForm(skillSubcategory: SkillSubcategory) {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });

  return useZodForm({
    schema: SkillSubcategoryUpdateSchema,
    queryKey: ["skill-subcategories"],
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
    onSuccess: () => {
      console.log("Skill subcategory updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update skill subcategory:", error);
    },
  });
}

export function useDeleteSkillSubcategoryForm(skillSubcategory: SkillSubcategory) {
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
    queryKey: ["skill-subcategories"],
    mutationFn: async () => {
      const { error } = await supabase
        .from("skill_subcategory")
        .delete()
        .eq("id", skillSubcategory.id);

      if (error) throw error;
      return { id: skillSubcategory.id };
    },
    onSuccess: () => {
      console.log("Skill subcategory deleted successfully");
      setIsConfirmed(false);
    },
    onError: (error) => {
      console.error("Failed to delete skill subcategory:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skillSubcategory,
  };
}