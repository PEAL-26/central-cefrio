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

type Column = ColumnDef<InvoiceListResponseData> & { className?: string };

export const columns = (props?: ColumnProps): Column[] => [
  {
    id: "select",
    className: "w-[1%]",
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
    id: "document",
    className: "w-[1%]",
    accessorKey: "document",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Documento" />
    ),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap flex items-center gap-2 font-bold">
          <span>
            {DOCUMENT_TYPES.find((doc) => doc.code === row.getValue("type"))
              ?.name || ""}
          </span>
          <span>{row.original.number}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "date",
    accessorKey: "date",
    className: "w-[1%]",
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
    id: "total",
    accessorKey: "total",
    className: "w-[1%]",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <span>{formatCurrency(row.getValue("total"))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    className: "w-[1%]",
    id: "actions",
    cell: ({ row }) => (
      <div className="w-fit whitespace-nowrap flex items-center">
        <DataTableRowActions row={row} actions={props} />
      </div>
    ),
  },
];
