import { z } from "zod";

export const SkillSubcategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const SkillSubcategoryInsertSchema = z.object({
  name: z.string(),
}).transform(({ name }) => ({
  name,
  id: encodeURIComponent(name)
}));;

export const SkillSubcategoryUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type SkillSubcategory = z.infer<typeof SkillSubcategorySchema>;
export type SkillSubcategoryInsert = z.infer<typeof SkillSubcategoryInsertSchema>;
export type SkillSubcategoryUpdate = z.infer<typeof SkillSubcategoryUpdateSchema>;