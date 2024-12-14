import { InvoiceForm } from "../form";

export function CreateInvoice() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Emitir novo documento</h1>
      <InvoiceForm />
    </>
  );
}
