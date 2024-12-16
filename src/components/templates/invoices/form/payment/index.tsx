import { useFormContext } from 'react-hook-form';

import { InvoicePaymentsComponent } from '@/components/ui/payments';
import { DOCUMENTS_WITH_PAYMENT } from '@/constants/document-types';

import { InvoiceSchemaType } from '../schema';
import { useInvoiceUpdateTotal } from '../use-invoice-update-total';

export function InvoicePayments() {
  const form = useFormContext<InvoiceSchemaType>();
  const { updatePayments } = useInvoiceUpdateTotal();

  const hasPayment = DOCUMENTS_WITH_PAYMENT.includes(form.watch('type'));

  if (!hasPayment) return null;

  return <InvoicePaymentsComponent onUpdate={updatePayments} control={form.control} />;
}
