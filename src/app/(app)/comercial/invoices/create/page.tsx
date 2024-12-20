import { CreateInvoice } from '@/components/templates/invoices';
import { Loading } from '@/components/ui/loading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Novo Documento',
};

export default function CreateInvoicePage() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateInvoice />
    </Suspense>
  );
}
