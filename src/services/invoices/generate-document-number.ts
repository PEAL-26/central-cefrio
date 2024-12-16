import { api, ApiRequestConfig } from '@/libs/axios';

export async function generateDocumentNumberService(type: string, configs?: ApiRequestConfig) {
  return api.get<{ number: string }>(`invoices/generate-number`, {
    ...configs,
    params: { type },
  });
}
