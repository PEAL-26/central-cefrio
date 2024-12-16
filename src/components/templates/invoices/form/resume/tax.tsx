import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/helpers/currency';

import { useInvoiceUpdateTotal } from '../use-invoice-update-total';

export function ResumeTax() {
  const { form } = useInvoiceUpdateTotal();

  return (
    <div className="relative flex items-start gap-2">
      <Label className="pt-4" htmlFor="ivaTotal">
        Total IVA
      </Label>
      <div className="flex w-[204px] flex-col items-end gap-1">
        <Input
          readOnly
          id="ivaTotal"
          className="text-right"
          value={formatCurrency(form.watch('totalIva'))}
        />
        {/* <span className="text-[8pt] text-right px-1 flex items-start gap-2">
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
        </span> */}
      </div>
    </div>
  );
}
