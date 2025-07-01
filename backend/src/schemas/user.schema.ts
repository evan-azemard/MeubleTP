import * as z from "zod/v4";

export const updateUserSchema = z.object({
  email: z.string().email("Email invalide"),
});
