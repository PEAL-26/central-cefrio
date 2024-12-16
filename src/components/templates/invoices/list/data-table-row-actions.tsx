'use client';

import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInvoicePrint } from '@/hooks';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

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
  const { handlePrintInvoice } = useInvoicePrint();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/comercial/invoices/${row.original?.id}`}>Ver Detalhes</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/comercial/invoices/${row.original?.id}/edit`}>Alterar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePrintInvoice(row.original?.id || '')}>
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem>Baixar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenDeleteModal(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(row.original?.id || '')}
      />
    </>
  );
}
