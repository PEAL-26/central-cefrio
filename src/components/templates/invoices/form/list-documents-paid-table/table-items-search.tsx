import { LoaderIcon, RefreshCwIcon } from 'lucide-react';
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
import { getDocumentTypeNameByCode } from '@/constants/document-types';
import { useInvoiceContext } from '@/contexts/invoice-context';
import { currencyFormatter } from '@/helpers/currency';
import { formatDate } from '@/helpers/date';
import { InvoiceListResponseData } from '@/services/invoices';

interface ItemSearchProps {
  open: boolean;
  onSelect?(data: InvoiceListResponseData): void;
}

export function TableItemsSearch({ open, onSelect }: ItemSearchProps) {
  const { documentsQuery, filterDocuments, clearFilterDocuments } = useInvoiceContext();
  const { data, isError, isLoading } = documentsQuery;

  useEffect(() => {
    if (!open) {
      clearFilterDocuments();
    }
    if (open) {
      filterDocuments({ type: 'FT' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full w-full p-4">
      <Input
        placeholder="Pesquisar"
        // value={query}
        onChange={(e) => filterDocuments({ q: e.target.value || '' })}
      />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="flex items-center justify-between hover:bg-transparent">
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
              <TableRow key={key} className="hover:cursor-pointer" onClick={() => onSelect?.(item)}>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <span className="flex flex-col text-xs font-bold">
                      {`${getDocumentTypeNameByCode(item.type)} ${item.number}`}
                      <span className="font-normal">{item.customer.name}</span>
                    </span>
                    <span className="flex flex-col text-right font-bold">
                      {currencyFormatter(item?.total ?? 0)}
                      <span className="text-xs font-normal">{formatDate(item.date)}</span>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 py-1">
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
