import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceSchemaType } from '../schema';
import { TableItemRow } from './table-item-row';

export function ItemListingTable() {
  const { control } = useFormContext<InvoiceSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    rules: {
      minLength: 1,
    },
  });

  const handleRemove = (id: string) => {
    const index = fields.findIndex((p) => p.id === id);
    remove(index);
  };

  const handleAppend = () => {
    append({
      productId: '',
      name: '',
      unitMeasure: 'un',
      quantity: 1,
      price: 0,
      discount: 0,
      iva: 0,
      discountAmount: 0,
      ivaAmount: 0,
      total: 0,
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Itens</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[1%]">Uni</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Desc.(%)</TableHead>
            <TableHead className="text-right">IVA(%)</TableHead>
            <TableHead className="text-right">Total</TableHead>
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
