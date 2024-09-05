"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { InvoiceSchemaType } from "../schema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { InputSearchPopover } from "./input-search-popover";
import { formatCurrency } from "@/helpers/currency";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

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
      <TableCell className="text-right font-bold align-top pt-4">
        {formatCurrency(form.getValues(`items.${index}.total`))}
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
      <TableCell className="text-right font-bold align-top">
        <Button
          type="button"
          variant={"ghost"}
          className="group hover:bg-red-600 px-2"
          onClick={remove}
        >
          <TrashIcon className="group-hover:text-white" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
