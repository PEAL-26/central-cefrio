"use client";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";

interface Actions {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

interface DataTableRowActionsProps<TData extends { id: string }> {
  row: Row<TData>;
  actions?: Actions;
}

export function DataTableRowActions<TData extends { id: string }>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="p-0 w-10 h-10"
          onClick={() => actions?.onEdit?.(row.original.id)}
        >
          <Pencil1Icon className="size-5" />
        </Button>
        <Button
          variant="destructive"
          className="p-0 w-10 h-10"
          onClick={() => setIsOpenDeleteModal(true)}
        >
          <Trash2Icon className="size-5" />
        </Button>
      </div>
      <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(row.original?.id || "")}
      />
    </>
  );
}
