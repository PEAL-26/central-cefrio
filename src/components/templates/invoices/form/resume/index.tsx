import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ResumeTax } from "./tax";
import { WithholdingTax } from "./withholding-tax";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";
import { formatCurrency } from "@/helpers/currency";

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const { form } = useInvoiceUpdateTotal();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-2 items-end w-full">
      <div className="flex items-center gap-2">
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input
          readOnly
          id="subtotal"
          type="text"
          className="text-right"
          value={formatCurrency(form.watch("subtotal"))}
        />
      </div>
      <ResumeTax />
      <div className="flex items-center gap-2">
        <Label htmlFor="discountTotal" className="whitespace-nowrap">
          Total Desconto
        </Label>
        <Input
          readOnly
          id="discountTotal"
          type="text"
          className="text-right"
          value={formatCurrency(form.watch("totalDiscount"))}
        />
      </div>
      <WithholdingTax />
      <div className="flex items-center gap-2">
        <Label htmlFor="total" className="font-bold">
          TOTAL
        </Label>
        <Input
          readOnly
          id="total"
          type="text"
          className="text-right bg-primary text-white font-bold"
          value={formatCurrency(form.watch("total"))}
        />
      </div>
    </div>
  );
}
