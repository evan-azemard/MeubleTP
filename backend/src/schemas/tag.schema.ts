import * as z from "zod/v4";

export const createTagSchema = z.object({
  label: z.string().transform(val => val.trim()).refine(val => val.length > 0, "Le label est obligatoire"),
});


export const updateTagSchema = createTagSchema.partial();