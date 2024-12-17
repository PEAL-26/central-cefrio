'use client';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { columns } from './columns';
import { useListInvoice } from './use-list';

export function ListInvoices() {
  const { response, handleDelete } = useListInvoice();

  return (
    <div className="flex h-full flex-col space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documentos</h2>
          <p className="text-muted-foreground">Listagem de documentos emitidas</p>
        </div>

        <Link className={buttonVariants({ variant: 'default' })} href="/comercial/invoices/create">
          Emitir
        </Link>
      </div>
      <DataTable
        response={response}
        filters={<div></div>}
        columns={columns({
          onDelete: handleDelete,
        })}
      />
    </div>
  );
}
