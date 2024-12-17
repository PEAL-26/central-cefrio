import { getDocumentTypeNameByCode } from '@/constants/document-types';
import { getPaymentTermsNameByCode } from '@/constants/payment-terms';
import { formatCurrency } from '@/helpers/currency';
import { generateUrlFromName } from '@/helpers/file';
import { invoiceTemplate } from '@/resources';
import { Decimal } from '@prisma/client/runtime/library';

function getDate(date?: Date | null) {
  return date ? new Date(date).toLocaleDateString('pt-AO') : '';
}

function getNumber(value?: number | Decimal | null) {
  return formatCurrency(Number(value ?? 0));
}

export async function invoiceTemplateData(data: {
  company: any;
  invoice: any;
  payments: any;
  banks: any;
}) {
  const { company, invoice, banks } = data;
  const typeName = getDocumentTypeNameByCode(invoice.type);

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
      number: `${typeName} ${invoice.number}`,
      currency: {
        name: invoice?.currency || 'Akz',
        rate: getNumber(invoice?.exchange),
      },
      date_issue: new Date(invoice.date).toLocaleDateString('pt-AO'),
      due_date: getDate(invoice?.dueDate),
      discount: getNumber(invoice?.generalDiscount),
      payment_terms: getPaymentTermsNameByCode(invoice?.paymentTerms || ''),
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
  });

  return template;
}
