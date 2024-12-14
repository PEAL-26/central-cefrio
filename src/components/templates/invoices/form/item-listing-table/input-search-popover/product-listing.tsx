import { useEffect } from "react";
import { LoaderIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ProductListResponseData } from "@/services/products";
import { useInvoiceContext } from "@/contexts/invoice-context";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

interface ProductListingProps {
  open: boolean;
  onAdd?(): void;
  onSelect?(data: ProductListResponseData): void;
}

export function ProductListing(props: ProductListingProps) {
  const { open, onSelect, onAdd } = props;
  const { productsQuery, filterProducts, clearFilterProducts } =
    useInvoiceContext();
  const { data, isLoading, isError } = productsQuery;

  useEffect(() => {
    clearFilterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full w-full p-4">
      <div className="flex items-center gap-1">
        <Input
          placeholder="Pesquisar"
          // value={query}
          onChange={(e) => filterProducts({ q: e.target.value || "" })}
        />
        <Button variant="ghost" className="p-0 h-10 w-10" onClick={onAdd}>
          <PlusCircleIcon />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent flex items-center justify-between">
              <span>Descrição</span>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={productsQuery?.refetch}
              >
                <RefreshCwIcon className="size-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && !isError && (
            <TableRow className="hover:bg-transparent h-full">
              <TableCell className="h-full">
                <div className="flex justify-center items-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && isError && (
            <div className="flex justify-center items-center">
              <TableRow className="hover:bg-transparent h-full">
                <TableCell>
                  <div className="flex justify-center items-center">
                    <LoaderIcon className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </div>
          )}
          {!isLoading && !isError && data.length === 0 && (
            <div className="flex justify-center items-center">
              <TableRow className="hover:bg-transparent h-full">
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

      <div className="absolute bottom-0 left-0 right-0 py-1 bg-gray-100">
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
