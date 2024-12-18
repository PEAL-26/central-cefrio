import {
  CompanyData,
  CustomerData,
  DocumentDataType,
  InvoiceDataBank,
  InvoiceDataPayment,
} from './common';

export type InvoiceDataItem = {
  article: number;
  name: string;
  quantity: number;
  unit?: string;
  price: string;
  discount: string;
  iva: string;
  value: string;
};

export type InvoiceDataType = {
  logo_url: string;
  company: CompanyData;
  customer?: CustomerData;
  document: DocumentDataType;
  tax_summary?: {
    value?: string | boolean;
    incidence?: string | boolean;
    total?: string | boolean;
    reason_exemption?: string | boolean;
  }[];
  total: {
    items: string;
    discounts: string;
    advance: string;
    iva: string;
    hit: string;
    retention: string;
    value: string;
  };
  items: InvoiceDataItem[];
  show_banks?: boolean;
  banks?: InvoiceDataBank[];
  payments?: InvoiceDataPayment[];
  number_validation?: string;
  show_payments?: boolean;
};
