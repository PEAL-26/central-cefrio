import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { toastResponseError } from '@/helpers/response/response';
import { useGetSearchParams, useQueryPagination } from '@/hooks';
import { emailAccountService } from '@/services/email-accounts';

export function useList() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ['q', 'size', 'page'] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailAccountId, setEmailAccountId] = useState<string | undefined>(undefined);

  const response = useQueryPagination({
    fn: () => emailAccountService.list({ page, q, size }),
    queryKey: ['email-accounts', q, size, page],
  });

  const handleDelete = async (id: string) => {
    try {
      await emailAccountService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ['email-accounts', q, size, page],
      });
    } catch (error) {
      toastResponseError(error);
    }
  };

  const handleEdit = (id: string) => {
    setEmailAccountId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEmailAccountId(undefined);
    setIsModalOpen(true);
  };

  return {
    response,
    handleDelete,
    handleEdit,
    handleAdd,
    isModalOpen,
    setIsModalOpen,
    emailAccountId,
  };
}
