import { api, ApiRequestConfig, crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface CompanyListResponseData {
  id?: string;
  name: string;
  slogan?: string;
  telephone?: string;
  address?: string;
  email?: string;
  site?: string;
  taxpayer?: string;
  location?: string;
  logo?: string | null;
}

export interface CompanyParams extends ListRequestParams {}

export interface CompanyRequestData {
  id?: string;
  name: string;
  slogan?: string;
  telephone?: string;
  email?: string;
  site?: string;
  address?: string;
  taxpayer?: string;
  location?: string;
  logo?: string | null;
}

export const companyService = crud<
  CompanyRequestData,
  CompanyRequestData,
  CompanyListResponseData,
  CompanyParams
>({ route: 'companies' });

export async function getCompanyFirst(configs?: ApiRequestConfig) {
  return api.get<CompanyListResponseData>(`companies/first`, {
    ...configs,
  });
}
