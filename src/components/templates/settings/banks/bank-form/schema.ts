import { z } from "zod";

export const bankSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Campo Obrigatório." }),
  abbreviation: z.string({ message: "Campo Obrigatório." }),
  account: z.string({ message: "Campo Obrigatório." }),
  iban: z.string().optional(),
  show: z.boolean().default(true).optional(),
});

export type BankSchemaType = z.infer<typeof bankSchema>;
