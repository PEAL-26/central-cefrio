import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { invoiceSchema, InvoiceSchemaType } from "./schema";
import {
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { useEffect, useState } from "react";
import { invoiceService } from "@/services/invoices";

interface InvoiceFormProps {
  id?: string;
}

export function useInvoiceForm(props?: InvoiceFormProps) {
  const { id = "" } = props || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
  });

  const handleSubmit = async (data: InvoiceSchemaType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      alert("OK");
      toastResponseRegisterSuccess(data?.id);
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadingInvoice = async () => {
    const invoice = await invoiceService.getById(id);

    if (invoice) {
      form.setValue("id", invoice.id);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoadingPage(true);
      await loadingInvoice();
      setIsLoadingPage(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    isLoadingPage,
  };
}
