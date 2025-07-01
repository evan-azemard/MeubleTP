import * as z from "zod/v4";

export const createCompanySchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Le nom est obligatoire"),
});

export const updateCompanySchema = createCompanySchema.partial();
