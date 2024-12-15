"use client";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInvoicePrint } from "@/hooks";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertModal } from "@/components/modals/alert-modal";
import { useInitialLoading } from "@/hooks/use-initial-loading";

export function ActionsButtons({ id }: { id: string }) {
  const { isLoading, handlePrintInvoice } = useInvoicePrint();
  const isReady = useInitialLoading()
  
  if (!isReady) {
    return null
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/comercial/invoices/${id}/edit`}>Alterar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePrintInvoice(id)}>
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem>Baixar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem /*onClick={() => setIsOpenDeleteModal(true)}*/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(id || "")}
      /> */}
    </>
  );
}
