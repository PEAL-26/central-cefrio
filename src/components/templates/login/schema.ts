import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Campo obrigatório." })
    .email({ message: "Email inválido." }),
  password: z
    .string({ required_error: "Campo Obrigatório" })
    .min(1, { message: "Campo obrigatório." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
