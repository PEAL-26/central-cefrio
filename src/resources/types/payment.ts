import {
  CompanyData,
  CustomerData,
  DocumentDataType,
  InvoiceDataBank,
  InvoiceDataPayment,
} from './common';

export interface PaymentItemDataType {
  date: string;
  document: string;
  total: string;
  paid: string;
}

export interface PaymentDataType {
  logo_url: string;
  company: CompanyData;
  customer?: CustomerData;
  document: DocumentDataType;
  show_banks: boolean;
  banks: InvoiceDataBank[];
  payments: InvoiceDataPayment[];
  items: PaymentItemDataType[];
  subtotal: string;
  total: string;
  credit: string;
  debit: string;
  total_paid: string;
  number_validation?: string;
}
