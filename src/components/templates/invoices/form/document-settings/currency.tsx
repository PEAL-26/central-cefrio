import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CURRENCIES } from '@/constants/currencies';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useDocumentSettings } from './use-document-settings';

export function Currency() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  const currency = CURRENCIES.find((doc) => doc.code === form.getValues('currency'));

  const handleSelect = (code: string) => {
    form.setValue('currency', code);
    setOpen(false);
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="line-clamp-1 flex items-center gap-2">
        <span
          className={cn(
            'line-clamp-1 flex w-full items-center gap-2 whitespace-nowrap',
            !currency?.name && 'text-gray-400',
          )}
        >
          {currency?.name || 'Selecione a moeda'}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {CURRENCIES.map((currency, key) => (
            <span
              key={key}
              className="cursor-pointer rounded p-1 pr-14 hover:bg-gray-100"
              onClick={() => handleSelect(currency.code)}
            >
              {currency.name}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
