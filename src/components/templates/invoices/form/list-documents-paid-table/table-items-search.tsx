import { useEffect, useState } from "react";
import { LoaderIcon, RefreshCwIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ProductListResponseData, productService } from "@/services/products";
import { useInvoiceContext } from "@/contexts/invoice-context";
import { InvoiceListResponseData } from "@/services/invoices";
import { currencyFormatter } from "@/helpers/currency";
import { getDocumentTypeNameByCode } from "@/constants/document-types";
import { formatDate } from "@/helpers/date";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

interface ItemSearchProps {
  open: boolean;
  onSelect?(data: InvoiceListResponseData): void;
}

export function TableItemsSearch({ open, onSelect }: ItemSearchProps) {
  const { documentsQuery, filterDocuments, clearFilterDocuments } =
    useInvoiceContext();
  const { data, isError, isLoading } = documentsQuery;

  useEffect(() => {
    if (!open) {
      clearFilterDocuments();
    }
    if (open) {
      filterDocuments({ type: "FT" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full w-full p-4">
      <Input
        placeholder="Pesquisar"
        // value={query}
        onChange={(e) => filterDocuments({ q: e.target.value || "" })}
      />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent flex items-center justify-between">
              <span>Descrição</span>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={documentsQuery?.refetch}
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
                <TableCell>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex flex-col">
                      {`${getDocumentTypeNameByCode(item.type)} ${item.number}`}
                      <span className="font-normal">{item.customer.name}</span>
                    </span>
                    <span className="font-bold flex flex-col text-right">
                      {currencyFormatter(item?.total ?? 0)}
                      <span className="font-normal text-xs">
                        {formatDate(item.date)}
                      </span>
                    </span>
                  </div>
                </TableCell>
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
            ...documentsQuery,
            prevPage: () =>
              filterDocuments({
                page: String(documentsQuery?.totalPages || 2 - 1),
              }),
            nextPage: () =>
              filterDocuments({
                page: String(documentsQuery?.totalPages || 0 + 1),
              }),
          }}
        />
      </div>
    </div>
  );
}
