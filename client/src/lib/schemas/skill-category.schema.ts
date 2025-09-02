import { z } from "zod";

export const SkillCategorySchema = z.object({
  id: z.string(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export const SkillCategoryInsertSchema = z.object({
  name: z.string(`Name is required`).min(1, `Name is required`),
}).transform(({ name }) => ({
  name,
  id: encodeURIComponent(name)
}));

export const SkillCategoryUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillCategoryInsert = z.infer<typeof SkillCategoryInsertSchema>;
export type SkillCategoryUpdate = z.infer<typeof SkillCategoryUpdateSchema>;