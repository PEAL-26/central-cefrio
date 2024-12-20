import { api, ApiRequestConfig } from '@/libs/axios';

type Contact = {
  id?: string;
  type: string;
  value: string;
  main?: boolean;
};

interface CustomerAddContactRequestData {
  customerId: string;
  contacts: Contact[];
}

export async function customerAddContactService(
  data: CustomerAddContactRequestData,
  configs?: ApiRequestConfig,
) {
  const { customerId, ...rest } = data;
  return api.post(`customers/${customerId}/contacts`, rest, configs);
}
