import { ReactNode } from "react";

import { InvoiceListResponseData } from "@/services/invoices";
import { ProductListResponseData } from "@/services/products";
import { IQueryPaginationResponse } from "@/hooks/use-query-pagination/types";

export type DocumentFilterTypes = {
  page?: string;
  q?: string;
  size?: string;
  type?: string;
};

export type ProductFilterTypes = {
  page?: string;
  q?: string;
  size?: string;
};

export interface InvoiceProviderProps {
  children?: ReactNode;
}

export interface InvoiceContextData {
  documentsQuery: IQueryPaginationResponse<InvoiceListResponseData>;
  productsQuery: IQueryPaginationResponse<ProductListResponseData>;
  documentFilters: DocumentFilterTypes;
  productFilters: ProductFilterTypes;
  filterDocuments: (filters: DocumentFilterTypes) => void;
  filterProducts: (filters: ProductFilterTypes) => void;
  clearFilterDocuments: () => void;
  clearFilterProducts: () => void;
}
