import * as z from "zod/v4";

export const createCategorySchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Le nom est obligatoire"),
});

export const updateCategorySchema = createCategorySchema.partial();
