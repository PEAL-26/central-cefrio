import { InvoiceForm } from "../form";

export function EditInvoice({ id }: { id: string }) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Alterar Documento</h1>
      <InvoiceForm id={id} />
    </>
  );
}
