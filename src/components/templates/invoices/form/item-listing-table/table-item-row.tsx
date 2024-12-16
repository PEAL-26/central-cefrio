'use client';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/helpers/currency';
import { TrashIcon } from 'lucide-react';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';
import { InputSearchPopover } from './input-search-popover';

interface TableItemProps {
  index: number;
  remove?(): void;
}

export function TableItemRow(props: TableItemProps) {
  const { index, remove } = props;
  const { updateTotal, form } = useInvoiceUpdateTotal();

  return (
    <TableRow>
      <TableCell className="align-top">
        <InputSearchPopover form={form} index={index} />
      </TableCell>
      <TableCell className="w-[1%] align-top">
        <FormField
          control={form.control}
          name={`items.${index}.unitMeasure`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" className="w-28" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[1%] align-top">
        <FormField
          control={form.control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  min="0.00"
                  step="0.01"
                  type="number"
                  className="w-20 text-center"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    updateTotal(index);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[1%] align-top">
        <FormField
          control={form.control}
          name={`items.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  min="0.00"
                  step="0.01"
                  type="number"
                  className="w-40 text-right"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    updateTotal(index);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[1%] align-top">
        <FormField
          control={form.control}
          name={`items.${index}.discount`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  min="0.00"
                  step="0.01"
                  type="number"
                  className="w-40 text-right"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    updateTotal(index);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[1%] align-top">
        <FormField
          control={form.control}
          name={`items.${index}.iva`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  min="0.00"
                  step="0.01"
                  type="number"
                  className="w-40 text-right"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    updateTotal(index);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="pt-4 text-right align-top font-bold">
        {formatCurrency(form.getValues(`items.${index}.total`))}
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
