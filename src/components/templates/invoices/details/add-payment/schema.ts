import { numericString } from "@/helpers/zod";
import { z } from "zod";

export const invoicePaymentSchema = z.object({
  paymentId: z.string().optional(),
  date: z.date({
    message: "Campo Obrigatório",
    required_error: "Campo Obrigatório",
  }),
  method: z
    .string({
      message: "Campo Obrigatório",
      required_error: "Campo Obrigatório",
    })
    .min(1, "Campo Obrigatório"),
  amount: numericString(z.number({message: 'Campo Obrigatório'}).gt(0, "Campo Obrigatório")),
  observation: z.string().optional(),
});

export const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
  payments: z
    .array(invoicePaymentSchema)
    .min(1, "Deve adicionar no mínimo 1 pagamento"),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoicePaymentSchemaType = z.infer<typeof invoicePaymentSchema>;

export const INVOICE_SCHEMA_PROPERTY: Record<string, string> = {
   paymentId: "Pagamento ID",
  method: "Método de Pagamento",
  amount: "Montante do Pagamento",
  date: "Data do Pagamento",
  observation: "Observação",
};
