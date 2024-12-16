import { api, ApiRequestConfig } from '@/libs/axios';

type Payment = {
  method: string;
  date: Date;
  amount: number;
  observation?: string;
};

interface AddPaymentRequestData {
  documentId: string;
  payments: Payment[];
}

export async function addPaymentService(data: AddPaymentRequestData, configs?: ApiRequestConfig) {
  const { documentId, ...rest } = data;
  return api.post(`invoices/${documentId}/payments`, rest, configs);
}
