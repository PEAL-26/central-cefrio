import { Loading } from '@/components/ui/loading';
import { MailUnselected } from '@/components/ui/mail-unselected';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Caixa de Entrada',
};

export default async function MailsInputsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MailUnselected />
    </Suspense>
  );
}
