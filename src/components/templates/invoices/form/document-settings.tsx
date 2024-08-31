import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";

export function DocumentSettings() {
  return (
    <div className="flex flex-col w-72">
      <div className="flex justify-between items-center w-full gap-4 border-b">
        <h2 className="text-lg font-semibold">Documento</h2>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <BoltIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Número: </span>
            <span>00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Tipo: </span>
            <span>Proforma</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Data: </span>
            <span>{new Date().toDateString()}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Vencimento: </span>
            <span>{new Date().toDateString()}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Moeda: </span>
            <span>AOA</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Cond. Pagamento</span>
            <span>Pronto pagamento</span>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <span className="font-bold">Observações: </span>
            <span className="line-clamp-1 w-full text-right">Alguma coisa gggggggggggggggg ggg</span>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-6 ">
        <div className="col-span-2">
          <Label htmlFor="doc-type">Tipo de documento</Label>
          <Input id="doc-type" placeholder="Factura Proforma" type="text" />
        </div>
        <div>
          <Label htmlFor="doc-number">Número</Label>
          <Input id="doc-number" disabled placeholder="PP.2024/1" type="text" />
        </div>
        <div>
          <Label htmlFor="doc-currency">Moeda</Label>
          <Input id="doc-currency" placeholder="Akz" type="text" value="Akz" />
        </div>
        <div>
          <Label htmlFor="doc-date">Data</Label>
          <Input id="doc-date" type="datetime-local" />
        </div>
        <div>
          <Label htmlFor="doc-due-date">Vencimento</Label>
          <Input id="doc-due-date" type="date" />
        </div>
        <div>
          <Label htmlFor="doc-customer-disc">Desconto cliente</Label>
          <Input
            id="doc-customer-disc"
            placeholder="0,00"
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="doc-financial-disc">Desconto financeiro</Label>
          <Input
            id="doc-financial-disc"
            placeholder="0,00"
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="doc-payment-conditions">Condições de Pagamento</Label>
          <Input id="doc-payment-conditions" placeholder="Pronto Pagamento" />
        </div>
        <div>
          <Label htmlFor="doc-reference">Referência</Label>
          <Input id="doc-reference" placeholder="Referência" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="doc-obs">OBS</Label>
          <Textarea id="doc-obs" placeholder="Pagamento de 50%" />
        </div>
      </div> */}
    </div>
  );
}
