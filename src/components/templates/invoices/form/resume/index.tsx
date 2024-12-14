import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ResumeTax } from "./tax";
import { WithholdingTax } from "./withholding-tax";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";
import { formatCurrency } from "@/helpers/currency";
import { DOCUMENTS_WITH_PAYMENT } from "@/constants/document-types";

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const { form } = useInvoiceUpdateTotal();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  const type = form.watch("type");
  const balance = form.watch("balance");

  const balanceColor = {
    positive: "#16a34a",
    negative: "#dc2626",
    neutro: "#000",
  }[balance > 0 ? "positive" : balance === 0 ? "neutro" : "negative"];

  if (type === "RE") {
    return (
      <div className="flex-1 flex flex-col gap-2 items-end w-full ">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="total"
            className="font-bold uppercase whitespace-nowrap"
          >
            Total a pagar
          </Label>
          <Input
            readOnly
            id="total"
            type="text"
            className="text-right bg-primary text-white font-bold w-52"
            value={formatCurrency(form.watch("total"))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="totalPaid" className="whitespace-nowrap">
            Total pago
          </Label>
          <Input
            readOnly
            id="totalPaid"
            type="text"
            className="text-right w-52"
            value={formatCurrency(form.watch("totalPaid"))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="balance">Saldo</Label>
          <Input
            readOnly
            id="balance"
            type="text"
            className="text-right w-52"
            style={{ color: balanceColor }}
            value={formatCurrency(balance)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-2 items-end w-full">
      <div className="flex items-center gap-2">
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input
          readOnly
          id="subtotal"
          type="text"
          className="text-right w-52"
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
          className="text-right w-52"
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
          className="text-right bg-primary text-white font-bold w-52"
          value={formatCurrency(form.watch("total"))}
        />
      </div>
      {type !== "RE" && DOCUMENTS_WITH_PAYMENT.includes(type) && (
        <div className="flex flex-col gap-2 border-dashed border-t border-t-gray-400 pt-2 items-end mt-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="totalPaid" className="whitespace-nowrap">
              Total pago
            </Label>
            <Input
              readOnly
              id="totalPaid"
              type="text"
              className="text-right w-52"
              value={formatCurrency(form.watch("totalPaid"))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="balance">Saldo</Label>
            <Input
              readOnly
              id="balance"
              type="text"
              className="text-right w-52"
              style={{ color: balanceColor }}
              value={formatCurrency(balance)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
