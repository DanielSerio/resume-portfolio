import { z } from "zod";

export const SkillSubcategorySchema = z.object({
  id: z.string(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export const SkillSubcategoryInsertSchema = z.object({
  name: z.string(`Name is required`).min(1, `Name is required`),
}).transform(({ name }) => ({
  name,
  id: encodeURIComponent(name)
}));;

export const SkillSubcategoryUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string(`Name is required`).min(1, `Name is required`),
});

export type SkillSubcategory = z.infer<typeof SkillSubcategorySchema>;
export type SkillSubcategoryInsert = z.infer<typeof SkillSubcategoryInsertSchema>;
export type SkillSubcategoryUpdate = z.infer<typeof SkillSubcategoryUpdateSchema>;