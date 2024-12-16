import { crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface BankListResponseData {
  id: string;
  name: string;
  abbreviation: string;
  account: string;
  iban?: string;
  show?: boolean;
}

export interface BankParams extends ListRequestParams {}

export interface BankRequestData {
  id?: string;
  name: string;
  abbreviation: string;
  account: string;
  iban?: string;
  show?: boolean;
}

export interface BankData {
  id: string;
  name: string;
  abbreviation: string;
  account: string;
  iban?: string;
  show?: boolean;
}

export const bankService = crud<
  BankRequestData,
  BankRequestData,
  BankListResponseData,
  BankParams,
  BankData
>({ route: 'banks' });
