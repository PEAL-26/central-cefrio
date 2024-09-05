"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceListResponseData } from "@/services/invoices";
import { DataTableColumnHeader } from "@/components/ui/data-table";

import { DataTableRowActions } from "./data-table-row-actions";
import { DOCUMENT_TYPES } from "@/constants/document-types";
import { formatCurrency } from "@/helpers/currency";

interface ColumnProps {
  onDelete?: (id: string) => void;
}

export const columns = (
  props?: ColumnProps
): ColumnDef<InvoiceListResponseData>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("number")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap flex items-center">
          <span>
            {DOCUMENT_TYPES.find((doc) => doc.code === row.getValue("type"))
              ?.name || ""}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{new Date(row.getValue("date")).toLocaleDateString()}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("customer") as any)?.name || ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{formatCurrency(row.getValue("total"))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="w-fit whitespace-nowrap flex items-center">
        <DataTableRowActions row={row} actions={props} />
      </div>
    ),
  },
];
