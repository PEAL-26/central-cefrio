import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";

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

interface ItemSearchProps {
  open: boolean;
  onSelect?(data: InvoiceListResponseData): void;
}

export function TableItemsSearch({ open, onSelect }: ItemSearchProps) {
  const { documentsQuery, filterDocuments, clearFilterDocuments } =
    useInvoiceContext();
  const { data, isError, isLoading } = documentsQuery;

  useEffect(() => {
    clearFilterDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full">
      <Input
        placeholder="Pesquisar"
        // value={query}
        onChange={(e) => filterDocuments({ q: e.target.value || "" })}
      />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent">Descrição</TableHead>
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
    </div>
  );
}
