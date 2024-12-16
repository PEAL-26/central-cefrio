import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { WITHHOLDING_TAX_TYPES } from '@/constants/withholding-tax';
import { formatCurrency } from '@/helpers/currency';
import { EditIcon } from 'lucide-react';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';

export function WithholdingTax() {
  const [open, setOpen] = useState(false);

  const { form, updateResume } = useInvoiceUpdateTotal();
  const withholdingTaxType = WITHHOLDING_TAX_TYPES.find(
    (payment) => payment.type === form.watch('withholdingTax')?.type,
  );

  const handleSelect = (withholding?: any) => {
    form.setValue('withholdingTax', withholding);
    setOpen(false);
    updateResume();
  };

  return (
    <div className="relative flex items-start gap-2">
      <Label htmlFor="withholdingTax" className="pt-4">
        Retenção
      </Label>
      <div className="flex w-[204px] flex-col items-end gap-1">
        <Input
          readOnly
          id="withholdingTax"
          className="text-right"
          value={formatCurrency(form.watch('totalWithholdingTax'))}
        />
        {form.watch('customerId') && (
          <span className="flex items-center gap-2 px-1 text-right text-[8pt]">
            {`${withholdingTaxType?.name}${
              withholdingTaxType?.percentage ? ` (${withholdingTaxType?.percentage}%)` : ''
            }` || 'Não aplicar'}
            <Popover modal open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <EditIcon size={16} />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit">
                <div className="flex flex-col">
                  {WITHHOLDING_TAX_TYPES.map((tax, key) => (
                    <label key={key} className="line-clamp-1 flex items-center gap-2 pr-10">
                      <input
                        name="withholding-tax"
                        type="radio"
                        onChange={() => handleSelect(tax)}
                        checked={withholdingTaxType?.type === tax.type}
                      />
                      <span className="line-clamp-1">{`${tax.name} ${
                        tax?.percentage ? `(${tax?.percentage}%)` : ''
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
