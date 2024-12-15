import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toastResponseError, toastResponseRegisterSuccess } from "@/helpers/response/response";

import { INVOICE_SCHEMA_PROPERTY, invoiceSchema, InvoiceSchemaType } from "./schema";
import { addPaymentService } from "@/services/invoices";

export function useAddPayment(documentId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    defaultValues: {
      payments: []
    }
  });

  const handleSubmit = async (data: InvoiceSchemaType) => {
    if(isLoading) return
    
       try {
         setIsLoading(true)
         const payments = data.payments.map((payment) => ({
             method: payment.method,
             date: payment.date,
             amount: payment.amount,
             observation: payment.observation,
           }))
         await addPaymentService({documentId, payments})
         toastResponseRegisterSuccess('Pagamento(s) adicionado(s) com sucesso.')
         handleChangeStateModal(false)
    } catch (error) {
      toastResponseError(error)
       } finally {
         setIsLoading(false)
    }
  };

  const onInvalid = (errors: FieldErrors<InvoiceSchemaType>) => {
       const messages = Object.entries(errors).map(([property, error]) => {
      if (Array.isArray(error)) {
        for (const errorProperties of error) {
          for (const [errorProperty, errorPropertyError] of Object.entries(
            errorProperties as any
          ) as any) {
            return `${INVOICE_SCHEMA_PROPERTY[errorProperty] ?? ''} ${errorPropertyError?.message || ''}`
          }
        }
      }
         return `${INVOICE_SCHEMA_PROPERTY[property] ?? ''} ${error?.message || ''}` 
       });
    
    toastResponseError(messages.join('\n'), 'Oops! Preencha os campos corretamente.');
  };

  const handleChangeStateModal = (state:boolean) => {
    if (isLoading) return null;
    setIsModalOpen(state);
  };

  useEffect(() => {
    if (documentId && isModalOpen) {
      (async () => {
        setIsLoadingData(true);
        // Verificar se o documento já foi completamente pago
        // const payments =
        setIsLoadingData(false);
      })();
    }
    if (!isModalOpen) {
      form.reset(undefined)
    }
  }, [documentId, form, isModalOpen]);

  return {
    isLoading,
    isLoadingData,
    form,
    handleSubmit: form.handleSubmit(handleSubmit, onInvalid),
    isModalOpen,
    setIsModalOpen,
    handleChangeStateModal,
  };
}
