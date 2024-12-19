'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import { EmailAccountListResponseData } from '@/services/email-accounts';
import { DataTableRowActions } from './data-table-row-actions';

type Column = ColumnDef<EmailAccountListResponseData> & { className?: string };

interface ColumnProps {
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const columns = (props?: ColumnProps): Column[] => [
  {
    id: 'select',
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
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.getValue('email')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    className: 'w-[1%]',
    cell: ({ row }) => <DataTableRowActions row={row} actions={props} />,
  },
];
