"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AlertError } from "@/components/ui/alert-error";

import { Resume } from "./resume";
import { CustomerForm } from "./customer";
import { useInvoiceForm } from "./use-invoice-form";
import { DocumentSettings } from "./document-settings";
import { ItemListingTable } from "./item-listing-table";
import { InvoicePayments } from "./payment";
import { ListDocumentsPaidTable } from "./list-documents-paid-table";
import { DOCUMENTS_INCLUDE } from "@/constants/document-types";
import { ReactLoading } from "@/libs/react-loading";

export function InvoiceForm(props: { id?: string }) {
  const {
    form,
    errors,
    setErrors,
    onSubmit,
    isLoading,
    isLoadingPage,
    isNotFound,
  } = useInvoiceForm({
    id: props?.id,
  });

  if (isLoadingPage) {
    return (
      <div className="flex justify-center items-center  h-full">
        <ReactLoading
          type="spinningBubbles"
          color={"#1B3D7A"}
          height={90}
          width={90}
        />
      </div>
    );
  }

  if (props?.id && isNotFound) {
    return (
      <div className="flex justify-center items-center  h-full">
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
      <form onSubmit={onSubmit} className="bg-white space-y-6">
        <div className="flex items-start justify-between gap-6">
          <DocumentSettings />
          <CustomerForm />
        </div>

        {!DOCUMENTS_INCLUDE.includes(form.watch("type")) && (
          <ItemListingTable />
        )}
        {DOCUMENTS_INCLUDE.includes(form.watch("type")) && (
          <ListDocumentsPaidTable />
        )}
        <div className="flex-1 flex justify-between items-start w-full">
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
        <div className="fixed z-50 inset-0 bg-black/50 h-screen flex justify-center items-center ">
          <ReactLoading
            type="spinningBubbles"
            color={"#FFF"}
            height={90}
            width={90}
          />
        </div>
      )}
    </Form>
  );
}
