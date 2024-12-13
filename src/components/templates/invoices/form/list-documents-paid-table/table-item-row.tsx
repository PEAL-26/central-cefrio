"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

import { InputSearchPopover } from "./input-search-popover";
import { formatCurrency } from "@/helpers/currency";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

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
      <TableCell className="text-right font-bold align-top pt-4">
        {formatCurrency(form.watch(`documents.${index}.total`))}
      </TableCell>
      <TableCell className="w-[1%] text-right align-top pt-4">
        {formatCurrency(form.watch(`documents.${index}.paid`))}
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
