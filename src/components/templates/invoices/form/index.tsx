"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CustomerForm } from "./customer-form";
import { DocumentSettings } from "./document-settings";
import { ItemListingTable } from "./item-listing-table";
import { Resume } from "./resume";
import { Form } from "@/components/ui/form";
import { useInvoiceForm } from "./use-invoice-form";

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
        <Resume />
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
