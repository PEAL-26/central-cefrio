'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
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
import { useInitialLoading } from '@/hooks/use-initial-loading';
import { useRouter } from 'next/navigation';
import { useListInvoice } from '../list/use-list';
import { DOCUMENT_STATUS_ENUM } from '@/constants/document-types';

export function ActionsButtons({ data }: { data: Record<string, any> }) {
  const { id, type, number, customer, status } = data;
  
  const router = useRouter();
  const isReady = useInitialLoading();

  const invoice = useListInvoice();
  const { handlePrintInvoice } = useInvoicePrint();
  const { handleDownloadInvoice } = useInvoiceDownload();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (await invoice.handleDelete(id)) {
      router.replace('/comercial/invoices');
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="data-[state=open]:bg-muted flex h-8 w-8 p-0 text-black">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {status !== DOCUMENT_STATUS_ENUM.A && DOCUMENT_EMIT_FT.includes(type) && (
            <DropdownMenuItem asChild>
              <Link href={`/comercial/invoices/create?emit_ft=true&document_id=${id}`}>
                Emitir Factura
              </Link>
            </DropdownMenuItem>
          )}
          {DOCUMENT_COPY.includes(type) && (
            <DropdownMenuItem asChild>
              <Link href={`/comercial/invoices/create?copy=true&document_id=${id}`}>Copiar</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handlePrintInvoice(id || '')}>Imprimir</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownloadInvoice(id || '', `${number} - ${customer.name}`)}
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
        onOk={handleDelete}
      />
    </>
  );
}
