import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  INVOICE_SCHEMA_PROPERTY,
  invoiceSchema,
  InvoiceSchemaType,
} from "./schema";
import {
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { useEffect, useState } from "react";
import { invoiceService } from "@/services/invoices";
import { useQueryClient } from "@tanstack/react-query";

interface InvoiceFormProps {
  id?: string;
}

export function useInvoiceForm(props?: InvoiceFormProps) {
  const { id = "" } = props || {};
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ property: string; message: string }[]>(
    []
  );
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    defaultValues: {
      date: new Date(),
      dueDate: new Date(),
      currency: "AOA",
      subtotal: 0,
      totalDiscount: 0,
      totalIva: 0,
      totalWithholdingTax: 0,
      total: 0,
      items: [
        {
          name: "",
          itemId: "",
          unitMeasure: "UN",
          discount: 0,
          discountAmount: 0,
          iva: 0,
          ivaAmount: 0,
          price: 0,
          quantity: 1,
          total: 0,
        },
      ],
    },
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: InvoiceSchemaType) => {
    if (isLoading) return;

    try {
      setErrors([]);
      setIsLoading(true);
      const { items, payments, documents, ...rest } = data;
      await invoiceService.create({
        id: rest?.id,
        type: rest.type,
        customerId: rest?.customerId,
        date: rest.date,
        dueDate: rest?.dueDate,
        paymentTerms: rest?.paymentTerms,
        reference: rest?.reference,
        observation: rest?.observation,
        withholdingTax: rest?.withholdingTax,
        generalDiscount: rest?.generalDiscount,
        currency: rest?.currency,
        exchange: rest?.exchange,
        items: items?.map((item) => ({
          id: item.itemId,
          name: item.name,
          price: item?.price,
          unitMeasure: item?.unitMeasure,
          quantity: item.quantity,
          discount: item?.discount,
          iva: item?.iva,
          reasonExemption: item?.reasonExemption,
        })),
        payments: payments?.map((payment) => ({
          id: payment?.paymentId,
          method: payment.method,
          amount: payment.amount,
        })),
        documents: documents?.map((item) => ({
          id: item.documentId,
          paid: item.paid,
        })),
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toastResponseRegisterSuccess(data?.id);
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: FieldErrors<InvoiceSchemaType>) => {
    const _errors = Object.entries(errors).map(([property, error]) => {
      if (Array.isArray(error)) {
        for (const errorProperties of error) {
          for (const [errorProperty, errorPropertyError] of Object.entries(
            errorProperties as any
          ) as any) {
            return {
              property:
                INVOICE_SCHEMA_PROPERTY[
                  errorProperty as keyof typeof INVOICE_SCHEMA_PROPERTY
                ],
              message: errorPropertyError?.message,
            };
          }
        }
      }
      return {
        property:
          INVOICE_SCHEMA_PROPERTY[
            property as keyof typeof INVOICE_SCHEMA_PROPERTY
          ],
        message: error.message,
      };
    });

    setErrors(_errors);
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
    errors,
    form,
    isLoading,
    isLoadingPage,
    onSubmit: form.handleSubmit(handleSubmit, onInvalid),
  };
}
