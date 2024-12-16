'use client';
import { AlertError } from '@/components/ui/alert-error';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { DOCUMENTS_INCLUDE } from '@/constants/document-types';
import { ReactLoading } from '@/libs/react-loading';
import { CustomerForm } from './customer';
import { DocumentSettings } from './document-settings';
import { ItemListingTable } from './item-listing-table';
import { ListDocumentsPaidTable } from './list-documents-paid-table';
import { InvoicePayments } from './payment';
import { Resume } from './resume';
import { useInvoiceForm } from './use-invoice-form';

export function InvoiceForm(props: { id?: string }) {
  const { form, errors, setErrors, onSubmit, isLoading, isLoadingPage, isNotFound } =
    useInvoiceForm({
      id: props?.id,
    });

  if (isLoadingPage) {
    return (
      <div className="flex h-full items-center justify-center">
        <ReactLoading type="spinningBubbles" color={'#1B3D7A'} height={90} width={90} />
      </div>
    );
  }

  if (props?.id && isNotFound) {
    return (
      <div className="flex h-full items-center justify-center">
        <h2>Documento não encontrado!</h2>
      </div>
    );
  }

  return (
    <Form {...form}>
      <AlertError
        errors={errors}
        show={errors.length > 0}
        autoClose
        duration={3000}
        onClose={() => setErrors([])}
      />
      <form onSubmit={onSubmit} className="space-y-6 bg-white">
        <div className="flex items-start justify-between gap-6">
          <DocumentSettings />
          <CustomerForm />
        </div>

        {!DOCUMENTS_INCLUDE.includes(form.watch('type')) && <ItemListingTable />}
        {DOCUMENTS_INCLUDE.includes(form.watch('type')) && <ListDocumentsPaidTable />}
        <div className="flex w-full flex-1 items-start justify-between">
          <InvoicePayments />
          <Resume />
        </div>
        <div className="flex justify-start">
          <Button
            disabled={isLoading}
            className="bg-primary-900 text-white hover:bg-primary-800"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/50">
          <ReactLoading type="spinningBubbles" color={'#FFF'} height={90} width={90} />
        </div>
      )}
    </Form>
  );
}
