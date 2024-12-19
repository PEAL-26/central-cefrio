import { MailMessageDetails } from '@/components/templates/mail-message-details';
import { Loading } from '@/components/ui/loading';
import { Metadata, ResolvingMetadata } from 'next';
import { memo, Suspense } from 'react';

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

export default async function MailsInputMessageDetailsPage(props: Props) {

  const data = {}
  
  return (
    <Suspense fallback={<Loading />}>
      <MailMessageDetails data={data} />
    </Suspense>
  );
}
