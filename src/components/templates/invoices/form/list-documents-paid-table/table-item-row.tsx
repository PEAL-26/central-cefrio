'use client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { TrashIcon } from 'lucide-react';

import { formatCurrency } from '@/helpers/currency';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';
import { InputSearchPopover } from './input-search-popover';

interface TableItemProps {
  index: number;
  remove?(): void;
}

export function TableItemRow(props: TableItemProps) {
  const { index, remove } = props;
  const { form } = useInvoiceUpdateTotal();

  return (
    <TableRow>
      <TableCell className="align-top">
        <InputSearchPopover form={form} index={index} />
      </TableCell>
      <TableCell className="pt-4 text-right align-top font-bold">
        {formatCurrency(form.watch(`documents.${index}.total`))}
      </TableCell>
      <TableCell className="w-[1%] pt-4 text-right align-top">
        {formatCurrency(form.watch(`documents.${index}.paid`))}
      </TableCell>
      <TableCell className="text-right align-top font-bold">
        <Button
          type="button"
          variant={'ghost'}
          className="group px-2 hover:bg-red-600"
          onClick={remove}
        >
          <TrashIcon className="group-hover:text-white" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
