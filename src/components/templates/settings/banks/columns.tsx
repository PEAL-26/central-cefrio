"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { BankListResponseData } from "@/services/banks";
import { DataTableRowActions } from "./data-table-row-actions";

type Column = ColumnDef<BankListResponseData> & { className?: string };

interface ColumnProps {
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const columns = (props?: ColumnProps): Column[] => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Banco" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{`${row.getValue("name")} (${
        row.original?.abbreviation || ""
      })`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Conta" />
    ),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap flex items-center">
          {row.getValue("account") || "S/N"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "iban",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IBAN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap flex items-center">
          {row.getValue("iban") || "S/N"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    className: "w-[1%]",
    cell: ({ row }) => <DataTableRowActions row={row} actions={props} />,
  },
];
