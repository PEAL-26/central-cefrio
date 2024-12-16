import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceSchemaType } from '../schema';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';
import { TableItemRow } from './table-item-row';

export function ListDocumentsPaidTable() {
  const { control } = useFormContext<InvoiceSchemaType>();
  const { updatePayments } = useInvoiceUpdateTotal();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
    rules: {
      minLength: 1,
    },
  });

  const handleRemove = (id: string) => {
    const index = fields.findIndex((p) => p.id === id);
    remove(index);
    updatePayments();
  };

  const handleAppend = () => {
    append({
      documentId: '',
      total: 0,
      paid: 0,
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Itens</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Documento</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Pago</TableHead>
            <TableHead className="w-[1%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => (
            <TableItemRow index={index} key={index} remove={() => handleRemove(item.id)} />
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAppend} className="mt-4" size="sm" variant="outline" type="button">
        Adicionar Item
      </Button>
    </div>
  );
}
