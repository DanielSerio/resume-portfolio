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

// Delete confirmation schema - user must type the name to confirm
const DeleteSkillSubcategorySchema = z.object({
  confirmName: z.string(),
});

export function useCreateSkillSubcategoryForm() {
  return useZodForm({
    schema: SkillSubcategoryInsertSchema,
    queryKey: ["skill-subcategories"],
    mutationFn: async (data: SkillSubcategoryInsert) => {
      // TODO: Implement create mutation
      console.log("Creating skill subcategory:", data);
      throw new Error("Not implemented");
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
  return useZodForm({
    schema: SkillSubcategoryUpdateSchema,
    queryKey: ["skill-subcategories"],
    formOptions: {
      defaultValues: skillSubcategory,
    },
    mutationFn: async (data: SkillSubcategoryUpdate) => {
      // TODO: Implement update mutation
      console.log("Updating skill subcategory:", { id: skillSubcategory.id, ...data });
      throw new Error("Not implemented");
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
      // TODO: Implement delete mutation
      console.log("Deleting skill subcategory:", skillSubcategory.id);
      throw new Error("Not implemented");
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