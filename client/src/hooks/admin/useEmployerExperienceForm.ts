import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  EmployerExperienceInsertSchema,
  EmployerExperienceUpdateSchema,
  EmployerExperienceSchema,
  type EmployerExperience,
  type EmployerExperienceInsert,
  type EmployerExperienceUpdate,
} from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

// Delete confirmation schema - user must type the name to confirm
const DeleteEmployerExperienceSchema = z.object({
  confirmName: z.string(),
});

export function useCreateEmployerExperienceForm() {
  const { supabase } = useRouteContext({ from: "/admin/employer-experiences" });

  return useZodForm({
    schema: EmployerExperienceInsertSchema,
    queryKey: ["employer-experiences"],
    mutationFn: async (data: EmployerExperienceInsert) => {
      const { data: insertedExperience, error } = await supabase
        .from("employer_experience")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return insertedExperience;
    },
    onSuccess: () => {
      console.log("Employer experience created successfully");
    },
    onError: (error) => {
      console.error("Failed to create employer experience:", error);
    },
  });
}

export function useUpdateEmployerExperienceForm(employerExperience: EmployerExperience) {
  const { supabase } = useRouteContext({ from: "/admin/employer-experiences" });

  return useZodForm({
    schema: EmployerExperienceUpdateSchema,
    queryKey: ["employer-experiences"],
    formOptions: {
      defaultValues: employerExperience,
    },
    mutationFn: async (data: EmployerExperienceUpdate) => {
      const { data: updatedExperience, error } = await supabase
        .from("employer_experience")
        .update(data)
        .eq("id", employerExperience.id)
        .select()
        .single();

      if (error) throw error;
      return updatedExperience;
    },
    onSuccess: () => {
      console.log("Employer experience updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update employer experience:", error);
    },
  });
}

export function useDeleteEmployerExperienceForm(employerExperience: EmployerExperience) {
  const { supabase } = useRouteContext({ from: "/admin/employer-experiences" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const deleteSchema = DeleteEmployerExperienceSchema.refine(
    (data) => data.confirmName === employerExperience.name,
    {
      message: `Please type "${employerExperience.name}" to confirm deletion`,
      path: ["confirmName"],
    }
  );

  const form = useZodForm({
    schema: deleteSchema,
    queryKey: ["employer-experiences"],
    mutationFn: async () => {
      // Delete join table relationships first (cascade delete)
      const { error: joinError } = await supabase
        .from("skill_employer_experience")
        .delete()
        .eq("employer_experience_id", employerExperience.id);

      if (joinError) throw joinError;

      // Delete the employer experience
      const { error } = await supabase
        .from("employer_experience")
        .delete()
        .eq("id", employerExperience.id);

      if (error) throw error;
      return { id: employerExperience.id };
    },
    onSuccess: () => {
      console.log("Employer experience deleted successfully");
      setIsConfirmed(false);
    },
    onError: (error) => {
      console.error("Failed to delete employer experience:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    employerExperience,
  };
}