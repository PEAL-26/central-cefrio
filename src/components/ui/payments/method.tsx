import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';

import { PAYMENT_METHODS } from '@/constants/payment-methods';

interface PaymentMethodProps {
  method?: string;
  onSelect?(code: string): void;
  disabled?: boolean;
}

export function PaymentMethod(props: PaymentMethodProps) {
  const { method, onSelect, disabled } = props;
  const [open, setOpen] = useState(false);
  const payment = PAYMENT_METHODS.find((p) => p.code == method);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        disabled={disabled}
        className="line-clamp-1 flex w-full justify-between gap-2"
      >
        <span
          className={cn(
            'line-clamp-1 flex w-full whitespace-nowrap text-left',
            disabled || (!payment?.code && 'text-gray-400'),
          )}
        >
          {payment?.name || 'Selecione o método de pagamento'}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full">
        <div className="flex w-full flex-col">
          {PAYMENT_METHODS.map((payment, key) => (
            <span
              key={key}
              className="cursor-pointer rounded p-1 pr-14 hover:bg-gray-100"
              onClick={() => {
                onSelect?.(payment.code);
                setOpen(false);
              }}
            >
              {payment.name}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
