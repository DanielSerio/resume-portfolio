import { z } from "zod";

export const EmployerExperienceSchema = z.object({
  id: z.string(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export const EmployerExperienceInsertSchema = z.object({
  name: z.string(`Name is required`).min(1, `Name is required`),
}).transform(({ name }) => ({
  name,
  id: encodeURIComponent(name)
}));

export const EmployerExperienceUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export type EmployerExperience = z.infer<typeof EmployerExperienceSchema>;
export type EmployerExperienceInsert = z.infer<typeof EmployerExperienceInsertSchema>;
export type EmployerExperienceUpdate = z.infer<typeof EmployerExperienceUpdateSchema>;