import { z } from "zod";
import { EmployerExperienceSchema } from "./employer-experience.schema";

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  category_id: z.string(),
  subcategory_id: z.string().nullable(),
  comfort_level: z.number(),
  last_updated_at: z.string(),
  employer_experience: z.array(EmployerExperienceSchema).optional(),
});

export const SkillInsertSchema = z.object({
  name: z.string(),
  category_id: z.string(),
  subcategory_id: z.string().nullable().optional(),
  comfort_level: z.number(),
  employer_experience: z.array(EmployerExperienceSchema.omit({
    name: true
  }))
}).transform((record) => ({
  ...record,
  id: encodeURIComponent(record.name!.toLowerCase()),
  last_updated_at: new Date().toISOString(),
}));

export const SkillUpdateSchema = z.object({
  name: z.string().nullable().optional(),
  category_id: z.string().optional(),
  subcategory_id: z.string().nullable().optional(),
  comfort_level: z.number().optional(),
  last_updated_at: z.string().optional(),
  employer_experience: z.array(EmployerExperienceSchema.omit({
    name: true
  }))
});

export type Skill = z.infer<typeof SkillSchema>;
export type SkillInsert = z.infer<typeof SkillInsertSchema>;
export type SkillUpdate = z.infer<typeof SkillUpdateSchema>;