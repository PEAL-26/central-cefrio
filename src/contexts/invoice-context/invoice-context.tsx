'use client';
import { useQueryPagination } from '@/hooks';
import { listUnpaidDocumentsService } from '@/services/invoices';
import { productService } from '@/services/products';
import { createContext, useContext, useState } from 'react';
import {
  DocumentFilterTypes,
  InvoiceContextData,
  InvoiceProviderProps,
  ProductFilterTypes,
} from './types';

const InvoiceContext = createContext<InvoiceContextData>({} as InvoiceContextData);

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [documentFilters, setDocumentFilters] = useState<DocumentFilterTypes>({});
  const [productFilters, setProductFilters] = useState<ProductFilterTypes>({});

  const documentsQuery = useQueryPagination({
    fn: ({ signal }) => listUnpaidDocumentsService(documentFilters, { signal }),
    queryKey: ['invoices-unpaid', { ...documentFilters }],
  });

  const productsQuery = useQueryPagination({
    fn: ({ signal }) => productService.list(productFilters, { signal }),
    queryKey: ['products', { ...productFilters }],
  });

  const filterDocuments = (filters: DocumentFilterTypes) => {
    setDocumentFilters((prev) => ({ ...prev, ...filters }));
  };

  const filterProducts = (filters: ProductFilterTypes) => {
    setProductFilters((prev) => ({ ...prev, ...filters }));
  };

  const clearFilterDocuments = () => {
    setDocumentFilters({});
  };

  const clearFilterProducts = () => {
    setProductFilters({});
  };

  return (
    <InvoiceContext.Provider
      value={{
        documentsQuery,
        productsQuery,
        documentFilters,
        productFilters,
        filterDocuments,
        filterProducts,
        clearFilterDocuments,
        clearFilterProducts,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);
