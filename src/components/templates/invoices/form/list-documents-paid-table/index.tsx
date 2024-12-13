import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableItemRow } from "./table-item-row";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InvoiceSchemaType } from "../schema";

export function ListDocumentsPaidTable() {
  const { control } = useFormContext<InvoiceSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
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
      documentId: "",
      total: 0,
      paid: 0,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Itens</h2>
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
            <TableItemRow
              index={index}
              key={index}
              remove={() => handleRemove(item.id)}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={handleAppend}
        className="mt-4"
        size="sm"
        variant="outline"
        type="button"
      >
        Adicionar Item
      </Button>
    </div>
  );
}
