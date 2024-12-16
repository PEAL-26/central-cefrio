import { ProductListResponseData } from '@/services/products';
import { useState } from 'react';
import { useInvoiceUpdateTotal } from '../../use-invoice-update-total';
import { ItemSearchProps } from './types';

export function useInputSearch(props: ItemSearchProps) {
  const { form, index } = props;

  const [open, setOpen] = useState(() => false);
  const { updateTotal } = useInvoiceUpdateTotal();
  const [add, setAdd] = useState(false);

  const handleSelect = (data: ProductListResponseData) => {
    const items = form.getValues('items');
    const itemFound = items.find(({ productId }: any) => productId === data.id);

    if (itemFound) {
      handleClose();
      return;
    }

    form.setValue(`items.${index}.productId`, data.id);
    form.setValue(`items.${index}.name`, data.name);
    form.setValue(`items.${index}.price`, data.price ?? 0);
    form.setValue(`items.${index}.unitMeasure`, data.unitMeasure || 'un');
    form.setValue(`items.${index}.iva`, data.iva ?? 0);

    updateTotal(index);
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

  const handleAddCustomer = () => {
    setAdd(true);
  };

  return {
    open,
    add,
    setAdd,
    handleSelect,
    setOpen,
    handleClose,
    handleOpen,
    handleAddCustomer,
  };
}
