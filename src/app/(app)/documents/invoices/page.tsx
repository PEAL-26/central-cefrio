import { Metadata } from "next";
import { Suspense } from "react";
import { ListInvoices } from "@/components/templates/invoices";
import { Loading } from "@/components/ui/loading";

export const metadata: Metadata = {
  title: "Facturas",
};

export default function InvoiceListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListInvoices />
    </Suspense>
  );
}
