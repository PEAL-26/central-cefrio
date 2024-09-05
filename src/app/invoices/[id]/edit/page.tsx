import { EditInvoice } from "../../../../components/templates/invoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alterar Factura",
};

export default function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  return <EditInvoice id={params.id} />;
}
