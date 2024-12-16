import { numericString } from '@/helpers/zod';
import { z } from 'zod';

export const invoiceItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, 'Campo Obrigatório'),
  name: z.string().min(1, 'Campo Obrigatório'),
  unitMeasure: z.string().optional(),
  quantity: numericString(z.number()),
  price: numericString(z.number().optional()),
  discount: numericString(z.number().optional()),
  iva: numericString(z.number().optional()),
  reasonExemption: z.string().optional(),
});

export const invoicePaymentSchema = z.object({
  id: z.string().optional(),
  method: z.string().min(1, 'Campo Obrigatório'),
  date: z.coerce.date({ message: 'Campo Obrigatório' }),
  observation: z.string().optional(),
  amount: numericString(z.number().gt(0, 'O valor deve ser maior que zero (0)')),
});

export const invoiceDocumentSchema = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  paid: numericString(z.number().gt(0, 'O valor deve ser maior que zero (0)')),
});

export const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.string().min(1, 'Campo Obrigatório'),
  number: z.string().optional(),
  customerId: z.string().optional(),
  date: z.coerce.date(),
  dueDate: z.coerce.date().optional(),
  currency: z.string().optional(),
  exchange: numericString(z.number().optional()),
  paymentTerms: z.string().optional(),
  reference: z.string().optional(),
  observation: z.string().optional(),
  generalDiscount: numericString(z.number().optional()),
  withholdingTax: z
    .object({
      type: z.enum(['PARTICULAR', 'COMPANY']).optional(),
      percentage: numericString(z.number().optional()),
    })
    .optional(),
  items: z.array(invoiceItemSchema).optional(),
  payments: z.array(invoicePaymentSchema).optional(),
  documents: z.array(invoiceDocumentSchema).optional(),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoiceItemSchemaType = z.infer<typeof invoiceItemSchema>;
export type InvoicePaymentSchemaType = z.infer<typeof invoicePaymentSchema>;
export type InvoiceDocumentSchemaType = z.infer<typeof invoiceDocumentSchema>;
