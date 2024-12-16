import { getDocumentTypeNameByCode } from '@/constants/document-types';
import { addDate, formatDate } from '@/helpers/date';
import { generateResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { useGetSearchParams } from '@/hooks';
import { generateDocumentNumberService, invoiceService } from '@/services/invoices';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import {
  INVOICE_SCHEMA_PROPERTY,
  InvoiceDocumentSchemaType,
  InvoicePaymentSchemaType,
  InvoiceSchemaType,
  invoiceSchema,
} from './schema';

interface InvoiceFormProps {
  id?: string;
}

export function useInvoiceForm(props?: InvoiceFormProps) {
  const { id = '' } = props || {};
  const [documentIdParam, emitFtParam, copyParam] = useGetSearchParams({
    params: ['document_id', 'emit_ft', 'copy'],
  });
  const copy = copyParam === 'true';
  const emitFt = emitFtParam === 'true';

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ property: string; message: string }[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onChange',
    defaultValues: {
      date: new Date(),
      dueDate: addDate(15, 'day'),
      paymentTerms: 'installment',
      currency: 'AOA',
      subtotal: 0,
      totalDiscount: 0,
      totalIva: 0,
      totalWithholdingTax: 0,
      total: 0,
      items: [
        {
          name: '',
          itemId: '',
          unitMeasure: 'UN',
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
  const router = useRouter();

  const verify = async (data: InvoiceSchemaType) => {
    const totalPaid = data.payments?.reduce((total, item) => total + item.amount, 0) || 0;
    const total = data.total || 0;

    if (data.type !== 'RE' && !data.items?.length) {
      if (totalPaid === 0) {
        throw new Error('Insira no mínimo um(1) item no documento');
      }
    }

    if (data.type === 'RE' && !data.documents?.length) {
      if (totalPaid === 0) {
        throw new Error('Insira no mínimo um(1) item no documento');
      }
    }

    if (data.type === 'RE' || data.type === 'FR') {
      if (totalPaid === 0) {
        throw new Error('Deve adicionar um pagamento.');
      }
    }

    if (data.type === 'FR') {
      if (totalPaid < total) {
        throw new Error(
          'Em documentos Pronto Pagamento o valor pago deve maior ou igual ao valor total.',
        );
      }
    }

    if (data.type === 'FT' && data.paymentTerms === 'ready') {
      if (totalPaid === 0) {
        throw new Error('Deve adicionar um pagamento.');
      }

      if (totalPaid < total) {
        throw new Error(
          'Em documentos Pronto Pagamento o valor pago deve ser maior ou igual ao valor total.',
        );
      }
    }

    if (data.paymentTerms === 'installment' && !data.customerId) {
      throw new Error('Em documentos com pagamento a prazo deve selecionar um cliente');
    }
  };

  const handleSubmit = async (data: InvoiceSchemaType) => {
    if (isLoading) return;

    try {
      await verify(data);

      setErrors([]);
      setIsLoading(true);
      const { items, payments, documents, ...rest } = data;
      const response = await invoiceService.create({
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
          id: item?.itemId,
          productId: item.productId,
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
          date: payment.date,
          amount: payment.amount,
          observation: payment.observation,
        })),
        documents: documents?.map((item) => ({
          id: item.itemId,
          documentId: item.documentId,
          paid: item.paid,
        })),
      });

      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toastResponseRegisterSuccess(data?.id);
      router.replace(`/comercial/invoices/${response.id}`);
    } catch (error) {
      setErrors([{ property: '', message: generateResponseError(error) }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: FieldErrors<InvoiceSchemaType>) => {
    setErrors([]);
    console.log(errors);

    const _errors = Object.entries(errors)
      .map(([property, error]) => {
        if (Array.isArray(error)) {
          for (const errorProperties of error) {
            for (const [errorProperty, errorPropertyError] of Object.entries(
              errorProperties as any,
            ) as any) {
              return {
                property:
                  INVOICE_SCHEMA_PROPERTY[errorProperty as keyof typeof INVOICE_SCHEMA_PROPERTY],
                message: errorPropertyError?.message,
              };
            }
          }
        }
        return {
          property: INVOICE_SCHEMA_PROPERTY[property as keyof typeof INVOICE_SCHEMA_PROPERTY],
          message: error.message,
        };
      })
      .filter((e) => !!e.message || !!e.property);

    setErrors(_errors);
  };

  const loadingInvoice = async () => {
    if (!id && !documentIdParam) return;

    let documentId = id;

    if (copy || emitFt) {
      documentId = documentIdParam || '';
    }

    setIsNotFound(false);

    const invoice = await invoiceService.getById(documentId);

    if (!invoice) {
      return setIsNotFound(true);
    }

    let payments: InvoicePaymentSchemaType[] = [];
    let documents: InvoiceDocumentSchemaType[] = [];

    if (!copy && !emitFt) {
      payments =
        invoice.payments?.map((payment) => ({
          paymentId: payment.id || '',
          date: payment.date,
          method: payment.method,
          amount: payment.amount,
          observation: payment.observation,
        })) || [];

      documents =
        invoice.documents?.map((doc) => ({
          itemId: doc.id,
          customerId: doc.document.customer.id,
          description: `${getDocumentTypeNameByCode(doc.document.type)} ${
            doc.document.number
          } (${formatDate(doc.document.date)}) - ${doc.document.customer.name}`,
          documentId: doc.document.id,
          total: doc.document.total || 0,
          paid: doc.paid || 0,
        })) || [];
    }

    let number = invoice.number;
    form.setValue('type', invoice.type);

    if (copy || emitFt) {
      const type = emitFt ? 'FT' : invoice.type;
      form.setValue('type', type);
      const generate = await generateDocumentNumberService(type);
      number = generate.number;
    }

    form.setValue('id', copy || emitFt ? undefined : invoice.id);
    form.setValue('number', number);
    form.setValue('copy', copy);
    form.setValue('emitFt', emitFt);
    form.setValue('customerId', invoice.customer?.id);
    form.setValue('date', copy || emitFt ? new Date() : invoice.date);
    form.setValue('dueDate', copy || emitFt ? addDate(15, 'day') : invoice.dueDate);
    form.setValue('currency', invoice?.currency || undefined);
    form.setValue('exchange', invoice?.exchange || undefined);
    form.setValue('paymentTerms', invoice?.paymentTerms || undefined);
    form.setValue('observation', invoice.observation || undefined);
    form.setValue('reference', copy ? undefined : invoice.number);
    form.setValue('totalWithholdingTax', invoice?.totalWithholdingTax || undefined);
    form.setValue('withholdingTax.type', invoice?.withholdingTaxType || undefined);
    form.setValue('withholdingTax.percentage', invoice?.withholdingTaxPercentage || undefined);
    form.setValue('generalDiscount', invoice?.generalDiscount || undefined);
    form.setValue('subtotal', invoice?.subtotal || undefined);
    form.setValue('totalIva', invoice?.totalIva || undefined);
    form.setValue('totalDiscount', invoice?.totalDiscount || undefined);
    form.setValue('total', invoice?.total || undefined);
    form.setValue(
      'items',
      invoice?.products?.map((prod) => ({
        itemId: copy || emitFt ? undefined : prod.id || undefined,
        productId: prod.product.id || '',
        name: prod.product.name,
        unitMeasure: prod.product.unitMeasure,
        quantity: prod.quantity,
        price: prod.price,
        discount: prod.discount,
        discountAmount: prod.discountAmount,
        iva: prod.iva,
        ivaAmount: prod.ivaAmount,
        total: prod.total,
      })) || [],
    );
    form.setValue('payments', payments);
    form.setValue('documents', documents);
    form.setValue(
      'taxes',
      invoice.taxes?.map((tax) => ({
        taxId: copy || emitFt ? undefined : tax.id,
        value: tax.value,
        amount: tax.amount,
        incidence: tax.incidence,
        observation: tax.observation,
      })) || [],
    );
  };

  useEffect(() => {
    (async () => {
      setIsLoadingPage(true);
      await loadingInvoice();
      setIsLoadingPage(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, documentIdParam, emitFtParam, copyParam]);

  return {
    errors,
    form,
    isLoading,
    isLoadingPage,
    isNotFound,
    setErrors,
    onSubmit: form.handleSubmit(handleSubmit, onInvalid),
  };
}
