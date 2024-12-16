import { InvoiceForm } from '../form';

export function EditInvoice({ id }: { id: string }) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Alterar Documento</h1>
      <InvoiceForm id={id} />
    </>
  );
}
