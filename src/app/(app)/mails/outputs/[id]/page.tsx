import { Loading } from '@/components/ui/loading';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  return {
    // title: invoice?.number || "",
  };
}

export default async function MailsOutputMessageDetailsPage(props: Props) {
  return <Suspense fallback={<Loading />}>Detalhes da mensagem de saída</Suspense>;
}