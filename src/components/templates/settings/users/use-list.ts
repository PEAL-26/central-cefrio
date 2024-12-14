import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/users";
import { toastResponseError } from "@/helpers/response/response";
import { useGetSearchParams, useQueryPagination } from "@/hooks";

export function useList() {
  const queryClient = useQueryClient();
  const [q, size, page] = useGetSearchParams({ params: ["q", "size", "page"] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setBankId] = useState<string | undefined>(undefined);

  const response = useQueryPagination({
    fn: () => userService.list({ page, q, size }),
    queryKey: ["users", q, size, page],
  });

  const handleDelete = async (id: string) => {
    try {
      await userService.delete(id);
      queryClient.invalidateQueries({
        queryKey: ["users", q, size, page],
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
    userId,
  };
}
