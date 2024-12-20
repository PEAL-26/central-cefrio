import { toastResponseError } from '@/helpers/response/response';
import { useGetSearchParams, useQueryPagination } from '@/hooks';
import { invoiceService } from '@/services/invoices';
import { useQueryClient } from '@tanstack/react-query';

export function useListInvoice() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ['q', 'size', 'page'] });

  const response = useQueryPagination({
    fn: () => invoiceService.list({ page, q, size }),
    queryKey: ['invoices', q, size, page],
  });

  const handleDelete = async (id: string) => {
    try {
      await invoiceService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ['invoices'],
      });
    } catch (error) {
      toastResponseError(error);
      return false;
    }

    return true;
  };

  return { response, handleDelete };
}
