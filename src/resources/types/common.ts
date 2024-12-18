export type InvoiceDataBank = {
  account: string;
  iban: string;
};

export type InvoiceDataPayment = {
  name: string;
  amount: string;
  observation?: string | boolean;
};

export type CompanyData = {
  name: string | boolean;
  slogan?: string | boolean;
  phone?: string | boolean;
  email?: string | boolean;
  site?: string | boolean;
  address?: string | boolean;
  tax_id?: string | boolean;
  location?: string | boolean;
};

export type CustomerData = {
  name?: string | boolean;
  phone?: string | boolean;
  email?: string | boolean;
  address?: string | boolean;
  location?: string | boolean;
  tax_id?: string | boolean;
};

export type DocumentDataType = {
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
  reference?: string | boolean;
};
