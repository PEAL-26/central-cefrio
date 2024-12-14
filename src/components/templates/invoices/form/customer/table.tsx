import { useState, useEffect } from "react";
import {
  Loader2Icon,
  LoaderIcon,
  PlusCircle,
  RefreshCwIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounceValue, useQueryPagination } from "@/hooks";
import {
  CustomerListResponseData,
  customerService,
} from "@/services/customers";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

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

  const { data, isLoading, isError, refetch, ...pagination } =
    useQueryPagination({
      fn: async () => customerService.list(filtersDebounced),
      queryKey: ["customers", { ...filtersDebounced }],
      disableFetch: !open,
    });

  useEffect(() => {
    setFilters({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full w-full p-4">
      <div className="flex items-center gap-1">
        <Input
          placeholder="Pesquisar"
          onChange={(e) =>
            setFilters({
              ...filters,
              q: e.target.value || "",
            })
          }
        />
        <Button variant="ghost" className="p-0 h-10 w-10" onClick={onAdd}>
          <PlusCircle />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent flex items-center justify-between">
              <span>Cliente</span>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={refetch}
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

      <div className="absolute bottom-0 left-0 right-0 py-1 bg-gray-100">
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
