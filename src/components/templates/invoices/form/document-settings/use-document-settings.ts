import { formatNumberWithLeadingZeros } from '@/helpers/string';
import { invoiceService } from '@/services/invoices';
import { useFormContext } from 'react-hook-form';
import { InvoiceSchemaType } from '../schema';

export function useDocumentSettings() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateDocumentNumber = async (documentType: string) => {
    const response = await invoiceService.list({
      type: documentType,
    });

    const invoiceLength = response.data.length;

    form.setValue('number', `${documentType} ${formatNumberWithLeadingZeros(invoiceLength + 1)}`);
  };

  return { form, updateDocumentNumber };
}
