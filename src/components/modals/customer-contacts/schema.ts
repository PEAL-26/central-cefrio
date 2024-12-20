import { z } from 'zod';

const contactSchema = z.object({
  id: z.string().optional(),
  type: z.string({ message: 'Campo Obrigatório.' }),
  value: z.string({ message: 'Campo Obrigatório.' }),
});

export const customerContactsSchema = z.object({
  contacts: z.array(contactSchema),
});

export type CustomerContactsSchemaType = z.infer<typeof customerContactsSchema>;
export type ContactsSchemaType = z.infer<typeof contactSchema>;
