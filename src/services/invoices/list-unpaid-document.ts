import { api, ApiRequestConfig } from '@/libs/axios';
import { ListRequestParams, ListResponseData } from '@/types';

export interface ListUnpaidDocumentResponseData {
  id: string;
  number: string;
  type: string;
  date: Date;
  customer: { id: string; name: string };
  total: number;
  totalPaid: number;
  balance: number;
}

export interface ListUnpaidDocumentParams extends ListRequestParams {
  type?: string;
}

export async function listUnpaidDocumentsService(
  params?: ListUnpaidDocumentParams,
  configs?: ApiRequestConfig,
) {
  const { signal, ...rest } = configs || {};
  return api.get<ListResponseData<ListUnpaidDocumentResponseData>>(`invoices/unpaid`, {
    params,
    signal,
    ...rest,
  });
}
