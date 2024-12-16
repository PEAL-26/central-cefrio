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
import { DOCUMENT_COPY, DOCUMENT_EMIT_FT } from '@/constants/documetn-dropdown-menu';
import { useInvoiceDownload, useInvoicePrint } from '@/hooks';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

interface Actions {
  onDelete?: (id: string) => void;
}

interface DataTableRowActionsProps<TData extends Record<string, any> = {}> {
  row: Row<TData>;
  actions?: Actions;
}

export function DataTableRowActions<TData extends Record<string, any> = {}>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { handlePrintInvoice } = useInvoicePrint();
  const { handleDownloadInvoice } = useInvoiceDownload();

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
          {DOCUMENT_EMIT_FT.includes(row.original?.type) && (
            <DropdownMenuItem asChild>
              <Link
                href={`/comercial/invoices/create?emit_ft=true&document_id=${row.original?.id}`}
              >
                Emitir Factura
              </Link>
            </DropdownMenuItem>
          )}
          {DOCUMENT_COPY.includes(row.original?.type) && (
            <DropdownMenuItem asChild>
              <Link href={`/comercial/invoices/create?copy=true&document_id=${row.original?.id}`}>
                Copiar
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handlePrintInvoice(row.original?.id || '')}>
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handleDownloadInvoice(
                row.original?.id || '',
                `${row.original.number} - ${row.original.customer.name}`,
              )
            }
          >
            Baixar
          </DropdownMenuItem>
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
