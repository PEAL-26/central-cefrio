import { LoaderIcon, PlusCircle, RefreshCwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounceValue, useQueryPagination } from '@/hooks';
import { CustomerListResponseData, customerService } from '@/services/customers';

interface CustomerTablePros {
  open: boolean;
  onAdd?(): void;
  onSelect?(customer: CustomerListResponseData): void;
}
export function CustomerTable(props: CustomerTablePros) {
  const { open, onAdd, onSelect } = props;
  const [filters, setFilters] = useState<{
    page?: string;
    q?: string;
    size?: string;
  }>({});

  const filtersDebounced = useDebounceValue(filters);

  const { data, isLoading, isError, refetch, ...pagination } = useQueryPagination({
    fn: async () => customerService.list(filtersDebounced),
    queryKey: ['customers', { ...filtersDebounced }],
    disableFetch: !open,
  });

  useEffect(() => {
    setFilters({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-4">
      <div className="flex items-center gap-2 px-4">
        <Input
          placeholder="Pesquisar"
          onChange={(e) =>
            setFilters({
              ...filters,
              q: e.target.value || '',
            })
          }
        />
        <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={onAdd}>
          <PlusCircle className="size-4" />
        </Button>
        <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={refetch}>
          <RefreshCwIcon className="size-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="flex items-center justify-between hover:bg-transparent">
                <span>Cliente</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && !isError && (
              <TableRow className="h-full hover:bg-transparent">
                <TableCell className="h-full">
                  <div className="flex items-center justify-center">
                    <LoaderIcon className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && isError && (
              <div className="flex items-center justify-center">
                <TableRow className="h-full hover:bg-transparent">
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <LoaderIcon className="animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              </div>
            )}
            {!isLoading && !isError && data.length === 0 && (
              <div className="flex items-center justify-center">
                <TableRow className="h-full hover:bg-transparent">
                  <TableCell>Nenhum item</TableCell>
                  <Button className="gap-2" variant="ghost" onClick={onAdd}>
                    <PlusCircle /> Adicionar
                  </Button>
                </TableRow>
              </div>
            )}
            {!isLoading &&
              !isError &&
              data.map((item, key) => (
                <TableRow
                  key={key}
                  className="hover:cursor-pointer"
                  onClick={() => onSelect?.(item)}
                >
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-fullF bg-gray-100 py-1">
        <Pagination
          show={{
            totalItems: true,
            nextPage: true,
            prevPage: true,
            currentTotalPages: true,
          }}
          navigation={{
            ...pagination,
            prevPage: () =>
              setFilters({
                ...filters,
                page: String(pagination?.totalPages || 2 - 1),
              }),
            nextPage: () =>
              setFilters({
                ...filters,
                page: String(pagination?.totalPages || 0 + 1),
              }),
          }}
        />
      </div>
    </div>
  );
}
