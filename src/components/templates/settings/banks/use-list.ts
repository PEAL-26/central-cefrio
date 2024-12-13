import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { bankService } from "@/services/banks";
import { toastResponseError } from "@/helpers/response/response";
import { useGetSearchParams, useQueryPagination } from "@/hooks";

export function useList() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ["q", "size", "page"] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankId, setBankId] = useState<string | undefined>(undefined);

  const response = useQueryPagination({
    fn: () => bankService.list({ page, q, size }),
    queryKey: ["banks", q, size, page],
  });

  const handleDelete = async (id: string) => {
    try {
      await bankService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ["banks", q, size, page],
      });
    } catch (error) {
      toastResponseError(error);
    }
  };

  const handleEdit = (id: string) => {
    setBankId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setBankId(undefined);
    setIsModalOpen(true);
  };

  return {
    response,
    handleDelete,
    handleEdit,
    handleAdd,
    isModalOpen,
    setIsModalOpen,
    bankId,
  };
}
