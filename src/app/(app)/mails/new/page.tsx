import { Loading } from '@/components/ui/loading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Novo email',
};

export default async function MailsNewEmailPage() {
  return <Suspense fallback={<Loading />}>Novo Email</Suspense>;
}
