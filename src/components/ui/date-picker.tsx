import { useState } from 'react';

import { DateDayPicker } from '@/components/ui/date-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';

interface DatePickerProps {
  value?: Date;
  start?: Date;
  onChange?(date: Date): void;
  disabled?: boolean;
  className?: string;
}

export function DatePicker(props: DatePickerProps) {
  const { value, start, onChange, disabled, className } = props;
  const [open, setOpen] = useState(false);

  const handleChangeDate = (date?: Date) => {
    if (date) {
      onChange?.(date);
      setOpen(false);
    }
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger disabled={disabled}>
        <span
          className={cn(
            'flex items-center justify-between gap-2',
            className,
            disabled && 'text-gray-400',
          )}
        >
          {value ? value.toLocaleDateString() : 'Selecione a data'}
          <ChevronDownIcon className="text-gray-400" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <DateDayPicker date={value} onChange={handleChangeDate} start={start} />
      </PopoverContent>
    </Popover>
  );
}
