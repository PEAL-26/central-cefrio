import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DOCUMENTS_INCLUDE,
  DOCUMENTS_NOT_INCLUDE,
  DOCUMENTS_WITH_PAYMENT,
  DOCUMENT_TYPES,
  PAYMENT,
} from '@/constants/document-types';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';
import { useDocumentSettings } from './use-document-settings';

export function InvoiceType() {
  const [open, setOpen] = useState(false);

  const { form, updateDocumentNumber } = useDocumentSettings();
  const { updateResume } = useInvoiceUpdateTotal();

  const type = DOCUMENT_TYPES.find((doc) => doc.code === form.getValues('type'));

  const handleSelect = (typeCode: string) => {
    form.setValue('type', typeCode);
    updateDocumentNumber(typeCode);
    setOpen(false);

    if (!DOCUMENTS_WITH_PAYMENT.includes(typeCode)) {
      form.setValue('payments', []);
    }

    if (!DOCUMENTS_INCLUDE.includes(typeCode)) {
      form.setValue('documents', []);
    }

    if (DOCUMENTS_INCLUDE.includes(typeCode)) {
      form.setValue('items', []);
    }

    if (PAYMENT.includes(typeCode)) {
      form.setValue('dueDate', undefined);
      form.setValue('paymentTerms', undefined);
    }

    updateResume();
  };

  const emitFt = form.watch('emitFt');

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger disabled={emitFt} className="line-clamp-1 flex items-center gap-2">
        <span
          className={cn(
            'line-clamp-1 flex-1 items-center gap-2 whitespace-nowrap',
            (!type?.name || emitFt) && 'text-gray-400',
          )}
        >
          {type?.name || 'Selecione o tipo de doc.'}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      {!emitFt && (
        <PopoverContent align="end" className="w-fit">
          <div className="flex flex-col">
            {DOCUMENT_TYPES.filter((filter) => !DOCUMENTS_NOT_INCLUDE.includes(filter.code)).map(
              (doc, key) => (
                <span
                  key={key}
                  className="cursor-pointer rounded p-1 pr-14 hover:bg-gray-100"
                  onClick={() => handleSelect(doc.code)}
                >
                  {doc.name}
                </span>
              ),
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
