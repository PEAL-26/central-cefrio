import { getPaymentMethodNameByCode } from '@/constants/payment-methods';
import { getPaymentTermsNameByCode } from '@/constants/payment-terms';
import { generateUrlFromName } from '@/helpers/file';
import { paymentTemplate } from '@/resources';
import { getDate, getDocumentNumber, getNumber } from './utils';

export async function paymentTemplateData(data: {
  company: any;
  invoice: any;
  payments: any;
  banks: any;
}) {
  const { company, invoice, banks, payments } = data;
  const totalPaid = payments.reduce(
    (total: number, item: any) => Number(total) + Number(item.amount),
    0,
  );
  const total = invoice.documents.reduce(
    (total: number, item: any) => Number(total) + Number(item.invoice.total),
    0,
  );

  const balance = totalPaid - total;
  const credit = balance > 0 ? getNumber(balance) : getNumber(0);
  const debit = balance < 0 ? getNumber(Math.abs(balance)) : getNumber(0);

  const template = await paymentTemplate({
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
    items:
      invoice?.documents?.map((doc: any) => ({
        date: getDate(doc.invoice.date),
        document: getDocumentNumber(doc.invoice),
        total: getNumber(doc.invoice.total),
        paid: getNumber(totalPaid),
      })) || [],
    show_banks: banks.length > 0,
    banks: banks.map((bank: any) => ({
      account: `${bank.abbreviation}: ${bank.account}`,
      iban: `IBAN: ${bank.iban}`,
    })),
    payments: payments?.map((payment: any) => ({
      name: `${getPaymentMethodNameByCode(payment.method)} | ${getDate(payment.date)}`,
      amount: getNumber(payment.amount),
      observation: payment?.observation?.trim() || false,
    })),
    subtotal: getNumber(total),
    total: getNumber(total),
    credit,
    debit,
    total_paid: getNumber(totalPaid),
    number_validation: process.env.NEXT_PUBLIC_NUMBER_VALIDATION || '',
  });

  return template;
}
