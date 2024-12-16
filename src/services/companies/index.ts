import { crud } from '@/libs/axios';
import { ListRequestParams } from '@/types';

export interface CompanyListResponseData {
  id?: string;
  name: string;
  telephone?: string;
  address?: string;
  email?: string;
  site?: string;
  taxpayer?: string;
  location?: string;
  logo?: string;
}

export interface CompanyParams extends ListRequestParams {}

export interface CompanyRequestData {
  id?: string;
  name: string;
  telephone?: string;
  email?: string;
  site?: string;
  address?: string;
  taxpayer?: string;
  location?: string;
  logo?: string;
}

export const companyService = crud<
  CompanyRequestData,
  CompanyRequestData,
  CompanyListResponseData,
  CompanyParams
>({ route: 'companies' });

export async function getCompanyFirst() {
  const response = await companyService.list();
  const [company] = response.data;
  return company;
}
