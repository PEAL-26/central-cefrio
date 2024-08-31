"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { InvoiceSchemaType } from "./schema";
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
import { ItemSearch } from "./item-search";

interface TableItemProps {
  index: number;
  remove?(): void;
}

export function TableItem(props: TableItemProps) {
  const { index, remove } = props;
  const form = useFormContext<InvoiceSchemaType>();

  useEffect(() => {
    const quantity = form.watch(`items.${index}.quantity`) ?? 0;
    const price = form.watch(`items.${index}.price`) ?? 0;
    const discount = form.watch(`items.${index}.discount`) ?? 0;
    const iva = form.watch(`items.${index}.iva`) ?? 0;

    const discountAmount = (discount * price) / 100;
    const priceDiscount = price - discountAmount;

    const ivaAmount = (iva * priceDiscount) / 100;
    const priceIva = priceDiscount + ivaAmount;

    const total = quantity * priceIva;

    form.setValue(`items.${index}.discountAmount`, discountAmount);
    form.setValue(`items.${index}.ivaAmount`, ivaAmount);
    form.setValue(`items.${index}.total`, total);
  }, [form]);

  return (
    <TableRow>
      <TableCell className="align-top">
        <ItemSearch form={form} index={index} />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="text-right font-bold align-top pt-4">{`$ ${Number(
        form.getValues(`items.${index}.total`) ?? "0"
      ).toFixed(2)}`}</TableCell>
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
