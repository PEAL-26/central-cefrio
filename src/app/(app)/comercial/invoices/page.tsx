import { ListInvoices } from '@/components/templates/invoices';
import { Loading } from '@/components/ui/loading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Documentos',
};

export default function InvoiceListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListInvoices />
    </Suspense>
  );
}
