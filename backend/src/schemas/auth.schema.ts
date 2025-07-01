import * as z from "zod/v4";

const passwordSchema = z.string()
  .trim()
  .min(8, { message: "Votre mot de passe doit contenir au moins 8 caractères" })
  .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" });

export const registerUserSchema = z.object({
  email: z.string().email("Email invalide"),
  password: passwordSchema,
});

export const loginUserSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});


export const updateUserSchema = registerUserSchema.partial();