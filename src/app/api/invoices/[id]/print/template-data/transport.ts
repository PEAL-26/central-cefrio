import { generateUrlFromName } from '@/helpers/file';
import { transportTemplate } from '@/resources';
import { getDate, getDocumentNumber } from './utils';

export async function transportTemplateData(data: { company: any; invoice: any }) {
  const { company, invoice } = data;
  const template = await transportTemplate({
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
      date_issue: new Date(invoice.date).toLocaleDateString('pt-AO'),
      delivery_date: getDate(invoice?.deliveryDate),
      reference: invoice?.reference || false,
      observation: invoice?.observation || '',
    },
    items:
      invoice?.products?.map((product: any) => ({
        article: Number(product.order),
        name: product?.productName || '',
        quantity: Number(product.quantity),
        unit: product?.unitMeasure || '',
      })) || [],
    number_validation: process.env.NEXT_PUBLIC_NUMBER_VALIDATION || '',
  });

  return template;
}
