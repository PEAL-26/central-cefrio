import { api, ApiRequestConfig } from '@/libs/axios';

export async function invoicePrint(id: string, configs?: ApiRequestConfig) {
  return api.get<{ pdf: string }>(`invoices/${id}/print`, {
    ...configs,
    timeout: 50000,
    convertData: false,
  });
}
