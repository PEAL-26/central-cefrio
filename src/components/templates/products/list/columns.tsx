'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDefProps, DataTableColumnHeader } from '@/components/ui/data-table';
import { ProductListResponseData } from '@/services/products';

import { currencyFormatter } from '@/helpers/currency';
import { DataTableRowActions } from './data-table-row-actions';

interface ColumnProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const columns = (props?: ColumnProps): ColumnDefProps<ProductListResponseData>[] => [
  {
    id: 'select',
    className: 'w-[1%]',
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'unitMeasure',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unidade" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('unitMeasure')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'price',
    className: 'w-[1%]',
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Preço" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <span>{currencyFormatter(row.getValue('price'))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'iva',
    className: 'w-[1%]',
    accessorKey: 'iva',
    header: ({ column }) => <DataTableColumnHeader column={column} title="IVA" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{currencyFormatter(row.getValue('iva'))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    className: 'w-[1%]',
    cell: ({ row }) => <DataTableRowActions row={row} actions={props} />,
  },
];
