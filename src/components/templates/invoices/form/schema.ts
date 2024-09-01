import { z, ZodTypeAny } from "zod";

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === "string") {
      return parseFloat(a || "0");
    } else if (typeof a === "number") {
      return a;
    } else {
      return undefined;
    }
  }, schema);

export const invoiceItemSchema = z.object({
  itemId: z.string().optional(),
  name: z.string().optional(),
  unitMeasure: z.string().optional(),
  quantity: numericString(z.number().optional()),
  price: numericString(z.number().optional()),
  discount: numericString(z.number().optional()),
  iva: numericString(z.number().optional()),
  ivaAmount: numericString(z.number().optional()),
  discountAmount: numericString(z.number().optional()),
  total: numericString(z.number().optional()),
});

export const invoicePaymentSchema = z.object({
  paymentId: z.string().optional(),
  method: z.string(),
  amount: numericString(z.number()),
});

export const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
  number: z.string(),
  type: z.string(),
  customerId: z.string().optional(),
  date: z.date(),
  dueDate: z.date(),
  currency: z.string().optional(),
  change: numericString(z.number().optional()),
  paymentTerms: z.string().optional(),
  observation: z.string().optional(),
  reasonExemption: z.string().optional(),
  totalWithholdingTax: numericString(z.number().default(0)),
  withholdingTax: z
    .object({
      type: z.enum(["particular", "company"]).optional(),
      percentage: numericString(z.number().optional()),
    })
    .optional(),
  subtotal: numericString(z.number().optional()),
  totalIva: numericString(z.number().optional()),
  totalDiscount: numericString(z.number().optional()),
  total: numericString(z.number().optional()),
  items: z.array(invoiceItemSchema),
  payments: z.array(invoicePaymentSchema),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoiceItemSchemaType = z.infer<typeof invoiceItemSchema>;
export type InvoicePaymentSchemaType = z.infer<typeof invoicePaymentSchema>;
