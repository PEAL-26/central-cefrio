import { useEffect } from "react";
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
import { useDebounceValue, useQueryPagination } from "@/hooks";
import { ProductListResponseData, productService } from "@/services/products";
import { useInvoiceContext } from "@/contexts/invoice-context";

interface ItemSearchProps {
  open: boolean;
  onSelect?(data: ProductListResponseData): void;
}

export function TableItemsSearch({ open, onSelect }: ItemSearchProps) {
  // const [page, setPage] = useState<string | undefined>(undefined);
  // const [size, setSize] = useState<string | undefined>("10");
  // const [query, setQuery] = useState<string | undefined>(undefined);

  // const q = useDebounceValue(query);

  // const { data, isLoading, isError } = useQueryPagination({
  //   fn: () => productService.list({ page, q, size }),
  //   queryKey: ["products", q, size, page],
  // });

  const { productsQuery, filterProducts, clearFilterProducts } =
    useInvoiceContext();
  const { data, isLoading, isError } = productsQuery;

  useEffect(() => {
    clearFilterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="h-full">
      <Input
        placeholder="Pesquisar"
        // value={query}
        onChange={(e) => filterProducts({ q: e.target.value || "" })}
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
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
