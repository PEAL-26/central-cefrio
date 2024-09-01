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

export const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
  customerId: z.string().optional(),
  items: z.array(invoiceItemSchema),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoiceItemSchemaType = z.infer<typeof invoiceItemSchema>;
