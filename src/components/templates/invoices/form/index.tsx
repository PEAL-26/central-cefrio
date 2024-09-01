"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Resume } from "./resume";
import { CustomerForm } from "./customer";
import { useInvoiceForm } from "./use-invoice-form";
import { DocumentSettings } from "./document-settings";
import { ItemListingTable } from "./item-listing-table";
import { InvoicePayments } from "./payment";

export function InvoiceForm() {
  const { form, onSubmit } = useInvoiceForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="bg-white space-y-6">
        <div className="flex items-start justify-between gap-6">
          <DocumentSettings />
          <CustomerForm />
        </div>
        <ItemListingTable />
        <div className="flex justify-between items-start w-full">
          <InvoicePayments />
          <Resume />
        </div>
        <div className="flex justify-start">
          <Button
            className="bg-primary-900 text-white hover:bg-primary-800"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
