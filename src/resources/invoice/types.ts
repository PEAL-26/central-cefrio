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

export type InvoiceDataBank = {
  account: string;
  iban: string;
};

export type InvoiceData = {
  logo_url: string;
  company: {
    name: string | boolean;
    slogan?: string | boolean;
    phone?: string | boolean;
    email?: string | boolean;
    site?: string | boolean;
    address?: string | boolean;
    tax_id?: string | boolean;
    location?: string | boolean;
  };
  customer?: {
    name?: string | boolean;
    phone?: string | boolean;
    email?: string | boolean;
    address?: string | boolean;
    location?: string | boolean;
    tax_id?: string | boolean;
  };
  document: {
    number: string;
    currency?: {
      name?: string | boolean;
      rate?: string | boolean;
    };
    date_issue: string;
    due_date: string;
    discount?: string | boolean;
    payment_terms?: string | boolean;
    observation?: string | boolean;
  };
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
};
