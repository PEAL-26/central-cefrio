'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactNode, Suspense, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IQueryPaginationResponse } from '@/hooks/use-query-pagination/types';
import { ReactLoading } from '@/libs/react-loading';
import { cn } from '@/libs/utils';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

type OnAdd = () => void;

export type ColumnDefProps<TData = any, TValue = any> = ColumnDef<TData, TValue> & {
  className?: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDefProps<TData, TValue>[];
  response?: IQueryPaginationResponse<TData>;
  onAdd?: string | OnAdd;
  filters?: ReactNode;
  onClearFilters?(): void;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, response, onAdd, filters, onClearFilters } = props;
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data, isLoading } = response || { data: [] };
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="h-full space-y-4">
      <Suspense>
        <DataTableToolbar
          table={table}
          onAdd={onAdd}
          filters={filters}
          onClearFilters={onClearFilters}
        />
      </Suspense>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(columns.find((c) => c.id === header.id)?.className)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="hover:bg-transparent">
                  <div className="flex h-80 items-center justify-center">
                    <ReactLoading type="spinningBubbles" color={'#1B3D7A'} height={60} width={60} />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-80 text-center hover:bg-transparent"
                    >
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} navigation={response} />
    </div>
  );
}
