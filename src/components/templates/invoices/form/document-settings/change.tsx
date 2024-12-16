import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useDocumentSettings } from './use-document-settings';

export function Change() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="line-clamp-1 flex items-center gap-2">
        <span className={cn('line-clamp-1 flex w-full items-center gap-2 whitespace-nowrap')}>
          {form?.watch('exchange') || '0.00'}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <FormField
          control={form.control}
          name="exchange"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
