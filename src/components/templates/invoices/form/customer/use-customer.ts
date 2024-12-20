import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { customerService } from '@/services/customers';
import { InvoiceSchemaType } from '../schema';

export function useCustomer() {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);

  const form = useFormContext<InvoiceSchemaType>();
  const customerId = form.watch('customerId');
  const type = form.watch('type');

  const { data, isLoading } = useQuery({
    queryFn: () => (customerId ? customerService.getById(customerId) : null),
    queryKey: ['customer', customerId],
  });

  const handleAddCustomer = () => {
    setAdd(true);
  };

  const handleSelect = (customerId: string) => {
    form.setValue('customerId', customerId);
    handleClose();
  };

  const handleClose = (open = false) => {
    if (!open) {
      setAdd(false);
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUnselect = () => {
    form.setValue('customerId', undefined);
  };

  return {
    customer: data,
    isLoading,
    open,
    add,
    handleClose,
    handleOpen,
    setAdd,
    handleAddCustomer,
    handleSelect,
    handleUnselect,
    disabled: type === 'RE',
  };
}
