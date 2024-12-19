import { EmailComposer } from '@/components/templates/new-email';
import { Loading } from '@/components/ui/loading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Novo E-mail',
};

export default async function MailsNewEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex-1 p-8">
        <EmailComposer />
      </div>
    </Suspense>
  );
}
