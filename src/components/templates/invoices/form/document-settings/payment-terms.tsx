import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PAYMENT } from '@/constants/document-types';
import { PAYMENT_TERMS, getPaymentTerms } from '@/constants/payment-terms';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useDocumentSettings } from './use-document-settings';

export function PaymentTerms() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  const paymentTerms = getPaymentTerms(form.getValues('paymentTerms') || '');

  const handleSelect = (terms?: string) => {
    form.setValue('paymentTerms', terms);
    if (terms === 'ready') {
      form.setValue('date', new Date());
      form.setValue('dueDate', new Date());
    }
    setOpen(false);
  };

  const disabled = PAYMENT.includes(form.watch('type'));

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger disabled={disabled} className="line-clamp-1 flex flex-1 items-center gap-2">
        <span
          className={cn(
            'line-clamp-1 flex w-full items-center gap-2 whitespace-nowrap text-right',
            (disabled || !paymentTerms?.name) && 'text-gray-400',
          )}
        >
          {paymentTerms?.name || 'Nenhum'}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {PAYMENT_TERMS.map((payment, key) => (
            <label key={key} className="line-clamp-1 flex items-center gap-2 pr-10">
              <input
                name="payment-terms"
                type="radio"
                onChange={() => handleSelect(payment.code)}
                checked={paymentTerms?.code === payment.code}
              />
              <span className="line-clamp-1">{payment.name}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
