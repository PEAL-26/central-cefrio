import { numericString } from "@/helpers/zod";
import { z } from "zod";

export const invoiceItemSchema = z.object({
  itemId: z.string().min(1, "Campo Obrigatório"),
  name: z.string().min(1, "Campo Obrigatório"),
  unitMeasure: z.string().optional(),
  quantity: numericString(z.number()),
  price: numericString(z.number().optional()),
  discount: numericString(z.number().optional()),
  iva: numericString(z.number().optional()),
  ivaAmount: numericString(z.number()),
  discountAmount: numericString(z.number()),
  total: numericString(z.number()),
  reasonExemption: z.string().optional(),
});

export const invoicePaymentSchema = z.object({
  paymentId: z.string().optional(),
  method: z.string().min(1, "Campo Obrigatório"),
  amount: numericString(
    z.number().gt(0, "O valor deve ser maior que zero (0)")
  ),
});

export const invoiceDocumentSchema = z.object({
  documentId: z.string(),
  paid: numericString(z.number().gt(0, "O valor deve ser maior que zero (0)")),
});

export const invoiceTaxSchema = z.object({
  taxId: z.string().optional(),
  value: numericString(z.number()),
  amount: numericString(z.number()),
  incidence: numericString(z.number()),
  observation: z.string().optional(),
});

export const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
  number: z.string().min(1, "Campo Obrigatório"),
  type: z.string().min(1, "Campo Obrigatório"),
  customerId: z.string().optional(),
  date: z.date(),
  dueDate: z.date().optional(),
  currency: z.string().optional(),
  exchange: numericString(z.number().optional()),
  paymentTerms: z.string().optional(),
  observation: z.string().optional(),
  reference: z.string().optional(),
  totalWithholdingTax: numericString(z.number().default(0)),
  withholdingTax: z
    .object({
      type: z.enum(["PARTICULAR", "COMPANY"]).optional(),
      percentage: numericString(z.number().optional()),
    })
    .optional(),
  generalDiscount: numericString(z.number().optional()),
  subtotal: numericString(z.number().optional()),
  totalIva: numericString(z.number().optional()),
  totalDiscount: numericString(z.number().optional()),
  total: numericString(z.number().optional()),
  items: z.array(invoiceItemSchema).optional(),
  payments: z.array(invoicePaymentSchema).optional(),
  documents: z.array(invoiceDocumentSchema).optional(),
  taxes: z.array(invoiceTaxSchema).optional(),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoiceItemSchemaType = z.infer<typeof invoiceItemSchema>;
export type InvoicePaymentSchemaType = z.infer<typeof invoicePaymentSchema>;
export type InvoiceDocumentSchemaType = z.infer<typeof invoiceDocumentSchema>;
export type InvoiceTaxeSchemaType = z.infer<typeof invoiceTaxSchema>;

export const INVOICE_SCHEMA_PROPERTY = {
  id: "Id",
  number: "Número",
  type: "Tipo",
  customerId: "Cliente",
  date: "Data",
  dueDate: "Vencimento",
  currency: "Moeda",
  change: "Câmbio",
  paymentTerms: "Condições de pagamento",
  observation: "Observação",
  reasonExemption: "Motivo de isenção",
  totalWithholdingTax: "Total Retenção na fonte",
  subtotal: "Subtotal",
  totalIva: "Total IVA",
  totalDiscount: "Total Desconto",
  total: "Total",
  itemId: "Descrição Item",
  name: "Descrição Item",
  unitMeasure: "Unidade",
  quantity: "Quantidade",
  price: "Preço",
  discount: "Desconto",
  iva: "IVA",
  ivaAmount: "Montante IVA",
  discountAmount: "Montante desconto",
  paymentId: "Pagamento ID",
  method: "Método",
  amount: "Montante",
};
