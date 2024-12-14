import { Loading } from "@/components/ui/loading";
import { EditInvoice } from "@/components/templates/invoices";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Alterar Factura",
};

export default function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <EditInvoice id={params.id} />
    </Suspense>
  );
}
