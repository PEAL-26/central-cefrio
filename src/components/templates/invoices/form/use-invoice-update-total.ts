import { invoiceUpdateItemTotal, invoiceUpdateResume } from '@/helpers/invoice-total-update';
import { useFormContext } from 'react-hook-form';
import { InvoiceSchemaType } from './schema';

export function useInvoiceUpdateTotal() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateTotal = (index: number) => {
    const quantity = form.watch(`items.${index}.quantity`) ?? 0;
    const price = form.watch(`items.${index}.price`) ?? 0;
    const discount = form.watch(`items.${index}.discount`) ?? 0;
    const iva = form.watch(`items.${index}.iva`) ?? 0;

    const { discountAmount, ivaAmount, total } = invoiceUpdateItemTotal({
      quantity,
      price,
      discount,
      iva,
    });

    form.setValue(`items.${index}.discountAmount`, discountAmount);
    form.setValue(`items.${index}.ivaAmount`, ivaAmount);
    form.setValue(`items.${index}.total`, total);

    updateResume();
  };

  const updateResume = () => {
    const { subtotal, totalDiscount, totalIva, totalWithholdingTax, total } = invoiceUpdateResume({
      items: (form.watch('items') ?? []).map((item) => ({
        discountAmount: item?.discountAmount ?? 0,
        ivaAmount: item?.ivaAmount ?? 0,
        total: item?.total ?? 0,
      })),
      customerId: form.watch('customerId'),
      withholdingTaxPercentage: form.watch('withholdingTax')?.percentage,
    });

    form.setValue('subtotal', subtotal);
    form.setValue('totalDiscount', totalDiscount);
    form.setValue('totalIva', totalIva);
    form.setValue('totalWithholdingTax', totalWithholdingTax);
    form.setValue('total', total);

    updatePayments();
  };

  const updatePayments = () => {
    const type = form.watch('type');
    const payments = form.watch('payments') || [];
    const totalPaid = payments.reduce((total, item) => Number(total) + Number(item.amount), 0);
    let grossTotal = Number(form.watch('total') ?? 0);

    if (type === 'RE') {
      const documents = form.watch('documents') || [];

      grossTotal = documents.reduce((total, item) => Number(total) + Number(item.total), 0);

      documents.forEach((doc, index) => {
        form.setValue(`documents.${index}.paid`, totalPaid);
      });
    }

    form.setValue('total', Number(grossTotal));
    form.setValue('totalPaid', Number(totalPaid));
    form.setValue('balance', Number(totalPaid) - Number(grossTotal));
  };

  return {
    form,
    updateResume,
    updateTotal,
    updatePayments,
  };
}
