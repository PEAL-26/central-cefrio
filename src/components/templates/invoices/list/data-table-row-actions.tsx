"use client";

import Link from "next/link";
import { useState } from "react";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertModal } from "@/components/modals/alert-modal";
import { invoicePrint } from "@/services/invoices";
import { ReactLoading } from "@/libs/react-loading";
import { printJS } from "@/libs/print-js";

interface Actions {
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
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModalPrint, setIsShowModalPrint] = useState(false);
  const [isPrintError, setIsPrintError] = useState(false);

  const onLoadingStart = () => {
    setIsPrintError(false);
    setIsShowModalPrint(false);
  };

  const onLoadingEnd = () => {
    if (isPrintError) return;

    setIsShowModalPrint(true);
  };

  const onError = () => {
    setIsShowModalPrint(true);
  };

  const onPrintDialogClose = () => {
    setIsPrintError(false);
    setIsShowModalPrint(false);
    setIsLoading(false);
  };

  const handlePrintInvoice = async () => {
    try {
      setIsLoading(true);
      setIsShowModalPrint(false);
      const response = await invoicePrint(row.original?.id);

      printJS?.({
        printable: response.pdf,
        type: "pdf",
        base64: true,
        showModal: isShowModalPrint,
        onLoadingStart,
        onLoadingEnd,
        onError,
        onPrintDialogClose,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/comercial/invoices/${row.original?.id}`}>
              Ver Detalhes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/comercial/invoices/${row.original?.id}/edit`}>
              Alterar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePrintInvoice()}>
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem>Baixar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenDeleteModal(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(row.original?.id || "")}
      />
      {isLoading && (
        <div className="fixed z-50 inset-0 bg-black/50 h-screen flex justify-center items-center ">
          <ReactLoading
            type="spinningBubbles"
            color={"#FFF"}
            height={90}
            width={90}
          />
        </div>
      )}
    </>
  );
}
