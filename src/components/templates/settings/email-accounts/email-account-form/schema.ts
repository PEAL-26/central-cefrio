import { z } from 'zod';

export const emailAccountSchema = z.object({
  id: z.string().optional(),
  email: z.string({ message: 'Campo Obrigatório.' }),
  password: z.string({ message: 'Campo Obrigatório.' }),
  users: z
    .array(
      z.object({
        id: z.string({ message: 'Campo Obrigatório.' }),
        name: z.string(),
      }),
    )
    .optional(),
});

export type EmailAccountSchemaType = z.infer<typeof emailAccountSchema>;
