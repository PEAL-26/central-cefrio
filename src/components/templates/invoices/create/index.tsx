import { InvoiceForm } from '../form';

export function CreateInvoice() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Emitir novo documento</h1>
      <InvoiceForm />
    </>
  );
}
