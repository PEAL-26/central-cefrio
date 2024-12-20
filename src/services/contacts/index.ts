import { crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface ContactListResponseData {
  id: string;
  type: string;
  value: string;
  main: boolean;
}

export interface ContactParams extends ListRequestParams {}

export interface ContactRequestData {
  id?: string;
  type: string;
  value: string;
  main: boolean;
  customerId?: string | null;
}

type Customer = {
  id: string;
  name: string;
  taxpayer?: string | null;
  telephone?: string | null;
  email?: string | null;
  address?: string | null;
  location?: string | null;
};

export interface ContactData {
  id: string;
  type: string;
  value: string;
  main: boolean;
  customer?: Customer | null;
}

export const contactService = crud<
  ContactRequestData,
  ContactRequestData,
  ContactListResponseData,
  ContactParams,
  ContactData
>({ route: 'contacts' });
