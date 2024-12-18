import { CompanyData, CustomerData } from './common';

export interface TransportItemDataType {
  article: number;
  name: string;
  unit: string;
  quantity: string;
}

export interface TransportDocumentDataType {
  number: string;
  date_issue: string;
  delivery_date: string;
  observation?: string;
  reference?: string;
}

export interface TransportDataType {
  logo_url?: string;
  company: CompanyData;
  customer?: CustomerData;
  document: TransportDocumentDataType;
  items: TransportItemDataType[];
  number_validation?: string;
}
