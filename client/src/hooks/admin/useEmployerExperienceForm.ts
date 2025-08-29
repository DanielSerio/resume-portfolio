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

// Delete confirmation schema - user must type the name to confirm
const DeleteEmployerExperienceSchema = z.object({
  confirmName: z.string(),
});

export function useCreateEmployerExperienceForm() {
  return useZodForm({
    schema: EmployerExperienceInsertSchema,
    queryKey: ["employer-experiences"],
    mutationFn: async (data: EmployerExperienceInsert) => {
      // TODO: Implement create mutation
      console.log("Creating employer experience:", data);
      throw new Error("Not implemented");
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
  return useZodForm({
    schema: EmployerExperienceUpdateSchema,
    queryKey: ["employer-experiences"],
    formOptions: {
      defaultValues: employerExperience,
    },
    mutationFn: async (data: EmployerExperienceUpdate) => {
      // TODO: Implement update mutation
      console.log("Updating employer experience:", { id: employerExperience.id, ...data });
      throw new Error("Not implemented");
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
      // TODO: Implement delete mutation
      console.log("Deleting employer experience:", employerExperience.id);
      throw new Error("Not implemented");
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