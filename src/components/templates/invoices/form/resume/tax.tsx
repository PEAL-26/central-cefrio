import { EditIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/helpers/currency";
import { FormField, FormItem, FormControl } from "@/components/ui/form";

import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

export function ResumeTax() {
  const { form } = useInvoiceUpdateTotal();

  return (
    <div className="flex items-start gap-2 relative ">
      <Label className="pt-4" htmlFor="ivaTotal">
        IVA
      </Label>
      <div className="flex flex-col w-[204px] gap-1 items-end">
        <Input
          readOnly
          id="ivaTotal"
          className="text-right"
          value={formatCurrency(form.watch("totalIva"))}
        />
        <span className="text-[8pt] text-right px-1 flex items-start gap-2">
          {form.watch("reasonExemption") || "Motivo de isenção de imposto"}
          <Popover modal>
            <PopoverTrigger>
              <EditIcon size={16} />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <FormField
                control={form.control}
                name="reasonExemption"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormControl>
                      <Textarea placeholder="Motivo de isenção" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </PopoverContent>
          </Popover>
        </span>
      </div>
    </div>
  );
}
