import { LoaderIcon, PlusCircleIcon, RefreshCwIcon } from 'lucide-react';
import { useEffect } from 'react';

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
import { useInvoiceContext } from '@/contexts/invoice-context';
import { ProductListResponseData } from '@/services/products';

interface ProductListingProps {
  open: boolean;
  onAdd?(): void;
  onSelect?(data: ProductListResponseData): void;
}

export function ProductListing(props: ProductListingProps) {
  const { open, onSelect, onAdd } = props;
  const { productsQuery, filterProducts, clearFilterProducts } = useInvoiceContext();
  const { data, isLoading, isError } = productsQuery;

  useEffect(() => {
    clearFilterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-4">
      <div className="flex items-center gap-1 px-4">
        <Input
          placeholder="Pesquisar"
          // value={query}
          onChange={(e) => filterProducts({ q: e.target.value || '' })}
        />
        <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-transparent" onClick={onAdd}>
          <PlusCircleIcon className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={productsQuery?.refetch}
        >
          <RefreshCwIcon className="size-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="flex items-center justify-between hover:bg-transparent">
                <span>Descrição</span>
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

      <div className="w-full bg-gray-100 py-1">
        <Pagination
          show={{
            totalItems: true,
            nextPage: true,
            prevPage: true,
            currentTotalPages: true,
          }}
          navigation={{
            ...productsQuery,
            prevPage: () =>
              filterProducts({
                page: String(productsQuery?.totalPages || 2 - 1),
              }),
            nextPage: () =>
              filterProducts({
                page: String(productsQuery?.totalPages || 0 + 1),
              }),
          }}
        />
      </div>
    </div>
  );
}
