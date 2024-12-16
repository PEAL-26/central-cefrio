import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: 'Campo Obrigatório.' }),
  abbreviation: z.string({ message: 'Campo Obrigatório.' }),
  account: z.string({ message: 'Campo Obrigatório.' }),
  iban: z.string().optional(),
  show: z.boolean().default(true).optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
