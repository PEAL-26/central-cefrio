import { crud } from "@/libs/axios";
import { ListRequestParams } from "@/types";

export interface InvoiceListResponseData {
  id: string;
  number: string;
  type: string;
  customer: string;
  total?: number;
}

export interface InvoiceParams extends ListRequestParams {
  type?: string;
}

export interface InvoiceRequestData {
  id?: string;
  type: string;
  customerId?: string;
  date: Date;
  dueDate?: Date;
  currency?: string;
  exchange?: number;
  paymentTerms?: string;
  reference?: string;
  observation?: string;
  generalDiscount?: number;
  withholdingTax?: { type?: string; percentage?: number };
  items?: Product[];
  payments?: Payment[];
  documents?: Document[];
}

interface Product {
  id: string;
  unitMeasure?: string;
  price?: number;
  quantity: number;
  discount: number;
  iva: number;
  reasonExemption?: string;
}

interface Payment {
  id?: string;
  method: string;
  amount: number;
}

interface Document {
  id: string;
  paid: number;
}

export const invoiceService = crud<
  InvoiceRequestData,
  InvoiceRequestData,
  InvoiceListResponseData,
  InvoiceParams
>({ route: "invoices" });
