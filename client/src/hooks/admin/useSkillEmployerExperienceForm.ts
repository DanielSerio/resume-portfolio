import { useState } from "react";
import { z } from "zod";
import { useZodForm } from "../core/useZodForm";
import {
  SkillEmployerExperienceInsertSchema,
  SkillEmployerExperienceUpdateSchema,
  SkillEmployerExperienceSchema,
  type SkillEmployerExperience,
  type SkillEmployerExperienceInsert,
  type SkillEmployerExperienceUpdate,
} from "@/lib/schemas";

// Delete confirmation schema - user must type "DELETE" to confirm
const DeleteSkillEmployerExperienceSchema = z.object({
  confirmText: z.string(),
});

export function useCreateSkillEmployerExperienceForm() {
  return useZodForm({
    schema: SkillEmployerExperienceInsertSchema,
    queryKey: ["skill-employer-experiences"],
    mutationFn: async (data: SkillEmployerExperienceInsert) => {
      // TODO: Implement create mutation
      console.log("Creating skill employer experience:", data);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill employer experience created successfully");
    },
    onError: (error) => {
      console.error("Failed to create skill employer experience:", error);
    },
  });
}

export function useUpdateSkillEmployerExperienceForm(skillEmployerExperience: SkillEmployerExperience) {
  return useZodForm({
    schema: SkillEmployerExperienceUpdateSchema,
    queryKey: ["skill-employer-experiences"],
    formOptions: {
      defaultValues: skillEmployerExperience,
    },
    mutationFn: async (data: SkillEmployerExperienceUpdate) => {
      // TODO: Implement update mutation
      console.log("Updating skill employer experience:", { ...skillEmployerExperience, ...data });
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill employer experience updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update skill employer experience:", error);
    },
  });
}

export function useDeleteSkillEmployerExperienceForm(skillEmployerExperience: SkillEmployerExperience) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const deleteSchema = DeleteSkillEmployerExperienceSchema.refine(
    (data) => data.confirmText === "DELETE",
    {
      message: 'Please type "DELETE" to confirm deletion',
      path: ["confirmText"],
    }
  );

  const form = useZodForm({
    schema: deleteSchema,
    queryKey: ["skill-employer-experiences"],
    mutationFn: async () => {
      // TODO: Implement delete mutation
      console.log("Deleting skill employer experience:", skillEmployerExperience);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      console.log("Skill employer experience deleted successfully");
      setIsConfirmed(false);
    },
    onError: (error) => {
      console.error("Failed to delete skill employer experience:", error);
    },
  });

  return {
    ...form,
    isConfirmed,
    setIsConfirmed,
    skillEmployerExperience,
  };
}