import * as z from "zod/v4";

export const createMaterialSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Le nom est obligatoire"),
  company: z.string().uuid("ID entreprise invalide"),
});

export const updateMaterialSchema = createMaterialSchema.partial();
