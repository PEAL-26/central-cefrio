import { api, ApiRequestConfig } from '@/libs/axios';
import { ListRequestParams, ListResponseData } from '@/types';

type Contact = {
  id: string;
  type: string;
  value: string;
  main?: boolean;
};

interface CustomerListContactParams extends ListRequestParams {
  type?: string;
}

export async function customerListContactService(
  customerId: string,
  params?: CustomerListContactParams,
  configs?: ApiRequestConfig,
) {
  return api.get<ListResponseData<Contact>>(`customers/${customerId}/contacts`, {
    ...configs,
    params,
  });
}
