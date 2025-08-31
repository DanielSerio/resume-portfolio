import { z } from "zod";

export const EmployerExperienceSchema = z.object({
  employer_experience_id: z.string(),
  name: z.string(),
});

export const EmployerExperienceInsertSchema = z.object({
  name: z.string(),
}).transform(({ name }) => ({
  name,
  employer_experience_id: encodeURIComponent(name)
}));

export const EmployerExperienceUpdateSchema = z.object({
  employer_experience_id: z.string().optional(),
  name: z.string().optional(),
});

export type EmployerExperience = z.infer<typeof EmployerExperienceSchema>;
export type EmployerExperienceInsert = z.infer<typeof EmployerExperienceInsertSchema>;
export type EmployerExperienceUpdate = z.infer<typeof EmployerExperienceUpdateSchema>;