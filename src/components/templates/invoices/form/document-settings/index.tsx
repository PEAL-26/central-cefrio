import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PAYMENT } from '@/constants/document-types';
import { DatePicker } from '../../../../ui/date-picker';
import { Change } from './change';
import { Currency } from './currency';
import { InvoiceType } from './invoice-type';
import { PaymentTerms } from './payment-terms';
import { useDocumentSettings } from './use-document-settings';

export function DocumentSettings() {
  const { form } = useDocumentSettings();

  return (
    <div className="flex w-96 flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-4 border-b">
        <h2 className="text-lg font-semibold">Documento</h2>
        <span className="text-lg font-bold">Nº {form.watch('number') || '000'}</span>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center justify-between gap-4">
          <span className="font-bold">Tipo: </span>
          <InvoiceType />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="font-bold">Data: </span>
          <DatePicker
            disabled={form.watch('paymentTerms') === 'ready'}
            value={form.watch('date')}
            onChange={(date) => form.setValue('date', date)}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="font-bold">Vencimento: </span>
          <DatePicker
            disabled={
              PAYMENT.includes(form.watch('type')) || form.watch('paymentTerms') === 'ready'
            }
            value={form.watch('dueDate')}
            onChange={(date) => form.setValue('dueDate', date)}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="font-bold">Moeda: </span>
          <Currency />
        </div>
        {form.watch('currency') !== 'AOA' && (
          <div className="flex w-full items-center justify-between gap-4">
            <span className="font-bold">Câmbio: </span>
            <Change />
          </div>
        )}
        <div className="flex w-full flex-1 items-center justify-between gap-4">
          <span className="font-bold">Cond. Pagamento</span>
          <PaymentTerms />
        </div>
        <div className="flex w-full flex-col">
          <span className="font-bold">Observações: </span>
          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Textarea placeholder="Observação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
