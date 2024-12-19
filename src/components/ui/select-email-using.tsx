import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from './button';

interface SelectEmailUsingProps {
  value?: string;
  onChange?(email: string): void;
  disabled?: boolean;
  className?: string;
}

export function SelectEmailUsing(props: SelectEmailUsingProps) {
  const { value, onChange, disabled, className } = props;
  const [open, setOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(() => value);

  const handleChange = (email: string) => {
    setCurrentEmail(email);
    setOpen(false);
    onChange?.(email);
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger disabled={disabled}>
        <span
          className={cn('flex items-center gap-2 text-xs', className, disabled && 'text-gray-400')}
        >
          {currentEmail ? currentEmail : 'Selecione o email'}
          <ChevronDownIcon className="size-4 text-gray-400" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-2">
        <div className="flex flex-col gap-1">
          {['Unificado', 'cesar.lopes@cefrio.ao', 'pedro.lopes@cefrio.ao'].map((email, key) => (
            <Button
              variant="ghost"
              key={key}
              onClick={() => handleChange(email)}
              className="text-left justify-start items-start h-fit py-1 px-2"
            >
              {email}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
