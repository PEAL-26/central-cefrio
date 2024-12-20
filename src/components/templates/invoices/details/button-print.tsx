'use client';

import { Button } from '@/components/ui/button';
import { useInvoicePrint } from '@/hooks';
import { useInitialLoading } from '@/hooks/use-initial-loading';
import { PrinterIcon } from 'lucide-react';

interface Props {
  documentId: string;
}

export function ButtonPrint(props: Props) {
  const { documentId } = props;
  const { handlePrintInvoice } = useInvoicePrint();
  const isReady = useInitialLoading();

  if (!isReady) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={() => handlePrintInvoice(documentId)}
    >
      <PrinterIcon className="size-5" />
    </Button>
  );
}
