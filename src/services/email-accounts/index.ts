import { crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface EmailAccountListResponseData {
  id: string;
  email: string;
}

export interface EmailAccountParams extends ListRequestParams {}

export interface EmailAccountRequestData {
  id?: string;
  email: string;
  password: string;
  userIds?: string[];
}

export interface EmailAccountData {
  id: string;
  email: string;
  password: string;
  users: EmailAccountUserData[];
}

export interface EmailAccountUserData {
  id: string;
  name: string;
}

export const emailAccountService = crud<
  EmailAccountRequestData,
  EmailAccountRequestData,
  EmailAccountListResponseData,
  EmailAccountParams,
  EmailAccountData
>({ route: 'email-accounts' });
