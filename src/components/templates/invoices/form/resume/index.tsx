import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DOCUMENTS_WITH_PAYMENT } from '@/constants/document-types';
import { formatCurrency } from '@/helpers/currency';
import { useEffect, useState } from 'react';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';
import { ResumeTax } from './tax';
import { WithholdingTax } from './withholding-tax';

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const { form } = useInvoiceUpdateTotal();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  const type = form.watch('type');
  const balance = form.watch('balance');

  const balanceColor = {
    positive: '#16a34a',
    negative: '#dc2626',
    neutro: '#000',
  }[balance > 0 ? 'positive' : balance === 0 ? 'neutro' : 'negative'];

  if (type === 'RE') {
    return (
      <div className="flex w-full flex-1 flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="total" className="whitespace-nowrap font-bold uppercase">
            Total a pagar
          </Label>
          <Input
            readOnly
            id="total"
            type="text"
            className="w-52 bg-primary text-right font-bold text-white"
            value={formatCurrency(form.watch('total'))}
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
            className="w-52 text-right"
            value={formatCurrency(form.watch('totalPaid'))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="balance">Saldo</Label>
          <Input
            readOnly
            id="balance"
            type="text"
            className="w-52 text-right"
            style={{ color: balanceColor }}
            value={formatCurrency(balance)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input
          readOnly
          id="subtotal"
          type="text"
          className="w-52 text-right"
          value={formatCurrency(form.watch('subtotal'))}
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
          className="w-52 text-right"
          value={formatCurrency(form.watch('totalDiscount'))}
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
          className="w-52 bg-primary text-right font-bold text-white"
          value={formatCurrency(form.watch('total'))}
        />
      </div>
      {type !== 'RE' && DOCUMENTS_WITH_PAYMENT.includes(type) && (
        <div className="mt-2 flex flex-col items-end gap-2 border-t border-dashed border-t-gray-400 pt-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="totalPaid" className="whitespace-nowrap">
              Total pago
            </Label>
            <Input
              readOnly
              id="totalPaid"
              type="text"
              className="w-52 text-right"
              value={formatCurrency(form.watch('totalPaid'))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="balance">Saldo</Label>
            <Input
              readOnly
              id="balance"
              type="text"
              className="w-52 text-right"
              style={{ color: balanceColor }}
              value={formatCurrency(balance)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
