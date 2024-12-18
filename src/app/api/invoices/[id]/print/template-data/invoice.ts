import { getPaymentMethodNameByCode } from '@/constants/payment-methods';
import { getPaymentTermsNameByCode } from '@/constants/payment-terms';
import { generateUrlFromName } from '@/helpers/file';
import { invoiceTemplate } from '@/resources';
import { getDate, getDocumentNumber, getNumber } from './utils';

const SHOW_PAYMENTS = ['FT', 'FR', 'OR', 'RE'];

export async function invoiceTemplateData(data: {
  company: any;
  invoice: any;
  payments: any;
  banks: any;
}) {
  const { company, invoice, banks, payments } = data;
  const template = await invoiceTemplate({
    logo_url: generateUrlFromName(company?.logo) || '',
    company: {
      name: company.name,
      slogan: company?.slogan || false,
      phone: company?.telephone || false,
      email: company?.email || false,
      site: company?.site || false,
      address: company?.address || false,
      tax_id: company?.taxpayer || false,
      location: company?.location || false,
    },
    customer: {
      name: invoice?.customer?.name,
      phone: invoice?.customer?.telephone || false,
      email: invoice?.customer?.email || false,
      address: invoice?.customer?.address || false,
      location: invoice?.customer?.location || false,
      tax_id: invoice?.customer?.taxpayer || false,
    },
    document: {
      number: getDocumentNumber(invoice),
      currency: {
        name: invoice?.currency || 'Akz',
        rate: getNumber(invoice?.exchange),
      },
      date_issue: new Date(invoice.date).toLocaleDateString('pt-AO'),
      due_date: getDate(invoice?.dueDate),
      discount: getNumber(invoice?.generalDiscount),
      payment_terms: getPaymentTermsNameByCode(invoice?.paymentTerms || ''),
      reference: invoice?.reference || false,
      observation: invoice?.observation || '',
    },
    tax_summary:
      invoice?.taxes?.map((tax: any) => ({
        value: getNumber(tax?.value),
        incidence: getNumber(tax?.incidence),
        total: getNumber(tax?.amount),
        reason_exemption: tax?.observation || '',
      })) || [],
    total: {
      items: getNumber(invoice?.subtotal),
      discounts: getNumber(invoice?.generalDiscount),
      advance: getNumber(0),
      iva: getNumber(invoice?.totalIva),
      hit: getNumber(0),
      retention: getNumber(invoice?.totalWithholdingTax),
      value: getNumber(invoice?.total),
    },
    items:
      invoice?.products?.map((product: any) => ({
        article: Number(product.order),
        name: product?.productName || '',
        quantity: Number(product.quantity),
        unit: product?.unitMeasure || '',
        price: getNumber(product.price),
        discount: getNumber(product.discountAmount),
        iva: getNumber(product.ivaAmount),
        value: getNumber(product.total),
      })) || [],
    show_banks: banks.length > 0,
    banks: banks.map((bank: any) => ({
      account: `${bank.abbreviation}: ${bank.account}`,
      iban: `IBAN: ${bank.iban}`,
    })),
    show_payments: SHOW_PAYMENTS.includes(invoice.type),
    payments: payments?.map((payment: any) => ({
      name: `${getPaymentMethodNameByCode(payment.method)} | ${getDate(payment.date)}`,
      amount: getNumber(payment.amount),
      observation: payment?.observation?.trim() || false,
    })),
    number_validation: process.env.NEXT_PUBLIC_NUMBER_VALIDATION || '',
  });

  return template;
}
