import { z } from "zod";

export const EmployerExperienceSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const EmployerExperienceInsertSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export const EmployerExperienceUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type EmployerExperience = z.infer<typeof EmployerExperienceSchema>;
export type EmployerExperienceInsert = z.infer<typeof EmployerExperienceInsertSchema>;
export type EmployerExperienceUpdate = z.infer<typeof EmployerExperienceUpdateSchema>;