import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { InvoiceSchemaType } from "./schema";
import { useEffect } from "react";

export function Resume() {
  const form = useFormContext<InvoiceSchemaType>();

  // useEffect(() => {

  // },[form])
  const items = form.watch("items");
  const subtotal = items?.reduce((total, item) => total + item.total, 0);
  const ivaTotal = items?.reduce((total, item) => total + item.ivaAmount, 0);
  const discountTotal = items?.reduce(
    (total, item) => total + item.discountAmount,
    0
  );

  const withholdingTax = 0;
  const total = subtotal - withholdingTax;

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex items-center gap-2">
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input
          defaultValue="0.00"
          readOnly
          id="subtotal"
          min="0.00"
          step="0.01"
          type="number"
          className="text-right"
          value={subtotal}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="ivaTotal">IVA</Label>
        <Input
          defaultValue="0.00"
          readOnly
          id="ivaTotal"
          min="0.00"
          step="0.01"
          type="number"
          className="text-right"
          value={ivaTotal}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="discountTotal">Desconto</Label>
        <Input
          defaultValue="0.00"
          readOnly
          id="discountTotal"
          min="0.00"
          step="0.01"
          type="number"
          className="text-right"
          value={discountTotal}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="withholdingTax">Retenção</Label>
        <Input
          defaultValue="0.00"
          readOnly
          id="withholdingTax"
          min="0.00"
          step="0.01"
          type="number"
          className="text-right"
          value={withholdingTax}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="total" className="font-bold">
          Total
        </Label>
        <Input
          defaultValue="0.00"
          readOnly
          id="total"
          min="0.00"
          step="0.01"
          type="number"
          className="text-right bg-primary text-white font-bold"
          value={total}
        />
      </div>
    </div>
  );
}
