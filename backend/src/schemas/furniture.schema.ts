import * as z from "zod/v4";

export const createFurnitureSchema = z.object({
  name: z.string().trim().min(1, "Le nom est obligatoire"),
  quantity: z.number().int().positive().default(1),
  category: z.string().uuid("ID catégorie invalide"),
  materials: z.array(z.object({
    materialId: z.string().uuid("ID matériau invalide"),
    quantityUsed: z.number().positive("Quantité doit être positive")
  })).optional(),
  tags: z.array(z.string().uuid("ID tag invalide")).optional(),
});

export const updateFurnitureSchema = createFurnitureSchema.partial();
