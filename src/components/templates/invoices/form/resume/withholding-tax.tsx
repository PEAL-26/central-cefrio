import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WITHHOLDING_TAX_TYPES } from "@/constants/withholding-tax";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";
import { formatCurrency } from "@/helpers/currency";

export function WithholdingTax() {
  const [open, setOpen] = useState(false);

  const { form, updateResume } = useInvoiceUpdateTotal();
  const withholdingTaxType = WITHHOLDING_TAX_TYPES.find(
    (payment) => payment.type === form.watch("withholdingTax")?.type
  );

  const handleSelect = (withholding?: any) => {
    form.setValue("withholdingTax", withholding);
    setOpen(false);
    updateResume();
  };

  return (
    <div className="flex items-start gap-2 relative ">
      <Label htmlFor="withholdingTax" className="pt-4">
        Retenção
      </Label>
      <div className="flex flex-col w-[204px] gap-1 items-end">
        <Input
          readOnly
          id="withholdingTax"
          className="text-right"
          value={formatCurrency(form.watch("totalWithholdingTax"))}
        />
        {form.watch("customerId") && (
          <span className="text-[8pt] text-right px-1 flex items-center gap-2">
            {`${withholdingTaxType?.name}${
              withholdingTaxType?.percentage
                ? ` (${withholdingTaxType?.percentage}%)`
                : ""
            }` || "Não aplicar"}
            <Popover modal open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Button className="p-0 h-4 mt-1" variant="ghost">
                  <EditIcon size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit">
                <div className="flex flex-col">
                  {WITHHOLDING_TAX_TYPES.map((tax) => (
                    <label className="flex items-center gap-2 line-clamp-1 pr-10">
                      <input
                        name="withholding-tax"
                        type="radio"
                        onChange={() => handleSelect(tax)}
                        checked={withholdingTaxType?.type === tax.type}
                      />
                      <span className="line-clamp-1">{`${tax.name} ${
                        tax?.percentage ? `(${tax?.percentage}%)` : ""
                      }`}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </span>
        )}
      </div>
    </div>
  );
}
