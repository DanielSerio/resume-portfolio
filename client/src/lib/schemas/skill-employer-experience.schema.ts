import { z } from "zod";

export const SkillEmployerExperienceSchema = z.object({
  skill_id: z.string(),
  employer_experience_id: z.string(),
});

export const SkillEmployerExperienceInsertSchema = z.object({
  skill_id: z.string(),
  employer_experience_id: z.string(),
});

export const SkillEmployerExperienceUpdateSchema = z.object({
  skill_id: z.string().optional(),
  employer_experience_id: z.string().optional(),
});

export type SkillEmployerExperience = z.infer<typeof SkillEmployerExperienceSchema>;
export type SkillEmployerExperienceInsert = z.infer<typeof SkillEmployerExperienceInsertSchema>;
export type SkillEmployerExperienceUpdate = z.infer<typeof SkillEmployerExperienceUpdateSchema>;