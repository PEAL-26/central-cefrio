import { generateDocumentNumberService } from '@/services/invoices';
import { useFormContext } from 'react-hook-form';
import { InvoiceSchemaType } from '../schema';

export function useDocumentSettings() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateDocumentNumber = async (documentType: string) => {
    const { number } = await generateDocumentNumberService(documentType);
    form.setValue('number', `${documentType} ${number}`);
  };

  return { form, updateDocumentNumber };
}
