'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { CustomerForm } from './form';
import { CustomerTable } from './table';
import { useCustomer } from './use-customer';

interface CustomerModalProps {}

export function CustomerModal(props: CustomerModalProps) {
  const {} = props;
  const { add, open, setAdd, handleClose, handleOpen, handleAddCustomer, handleSelect, disabled } =
    useCustomer();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <Popover modal open={open} onOpenChange={handleClose}>
      <PopoverTrigger onClick={handleOpen} disabled={disabled}>
        <SearchIcon className={cn(disabled && 'text-gray-400')} />
      </PopoverTrigger>
      <PopoverContent align="end" className="h-96 w-80 overflow-hidden bg-white p-0">
        <div className="relative h-full w-full flex-1">
          <div
            data-add={add}
            className="absolute flex h-full w-full translate-x-0 overflow-y-auto transition-all data-[add='false']:-translate-x-full data-[add='true']:translate-x-0"
          >
            <CustomerForm onSubmitted={handleSelect} onBack={() => setAdd(false)} />
          </div>
          <div
            data-add={add}
            className="absolute flex h-full w-full translate-x-0 overflow-y-auto transition-all data-[add='false']:translate-x-0 data-[add='true']:translate-x-full"
          >
            <CustomerTable
              open={open}
              onAdd={handleAddCustomer}
              onSelect={(customer) => handleSelect(customer.id)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
