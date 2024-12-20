import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetSearchParams } from '@/hooks';

interface Navigation {
  currentPage?: number;
  totalPages?: number;
  next?: number | null;
  prev?: number | null;
  nextPage?(): void;
  prevPage?(): void;
  setSizePerPage?(size?: number): void;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  navigation?: Navigation;
}

export function DataTablePagination<TData>({ table, navigation }: DataTablePaginationProps<TData>) {
  const {
    currentPage = 0,
    totalPages = 0,
    next,
    prev,
    nextPage,
    prevPage,
    setSizePerPage,
  } = navigation || {};

  const [size] = useGetSearchParams({ params: ['size'] });

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={size || '10'}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setSizePerPage?.(Number(value) === 10 ? undefined : Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!prev}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => prevPage?.()}
            disabled={!prev}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage?.()}
            disabled={!next}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!next}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
