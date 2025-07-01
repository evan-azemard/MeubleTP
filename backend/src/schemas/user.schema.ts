import * as z from "zod/v4";

export const updateUserSchema = z.object({
  email: z.email("Email invalide").trim(),
}).strict();
