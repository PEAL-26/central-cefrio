import { useFormContext } from "react-hook-form";
import { InvoiceSchemaType } from "../schema";
import { invoiceService } from "@/services/invoices";

export function useDocumentSettings() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateDocumentNumber = async (documentType: string) => {
    const response = await invoiceService.list({
      type: documentType,
    });

    const invoiceLength = response.data.length;

    form.setValue(
      "number",
      `${documentType} ${(invoiceLength + 1).toString(3)}`
    );
  };

  return { form, updateDocumentNumber };
}
