import { splitArray } from '@/helpers/array';
import { Handlebars } from '@/libs/handlebars';
import { InvoiceData, InvoiceDataItem } from './types';

import templateSource from './invoice.min.hbs';
import { generateImageDataURLFromURL } from '@/helpers/url';

async function generateItems(items: InvoiceDataItem[], itemsPerPage = 22, restItemsPerPage = 32) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const splitted = splitArray(items, itemsPerPage, restItemsPerPage);

  // Divide os dados em páginas
  const paginatedData = splitted.map(({ items }, index) => ({
    first: index === 0,
    current: index + 1,
    items,
    break: index + 1 < totalPages,
  }));

  return { total_pages: totalPages, pages: paginatedData };
}

export async function invoiceTemplate(data: InvoiceData) {
  const {
    company,
    customer,
    document,
    items,
    logo_url,
    total,
    banks = [],
    show_banks,
    tax_summary,
  } = data;

  const { total_pages, pages } = await generateItems(items, 22);
  // const logoDataUrl = await generateImageDataURLFromURL(logo_url);

  // console.log({ logoDataUrl,logo_url });
  const context = {
    total_pages,
    pages,
    logo_url, // : logoDataUrl,
    company: {
      name: company?.name || false,
      slogan: company?.slogan || false,
      phone: company?.phone || false,
      email: company?.email || false,
      site: company?.site || false,
      address: company?.address || false,
      tax_id: company?.tax_id || false,
      location: company?.location || false,
    },
    customer: {
      name: customer?.name || false,
      phone: customer?.phone || false,
      email: customer?.email || false,
      address: customer?.address || false,
      location: customer?.location || false,
      tax_id: customer?.tax_id || false,
    },
    document: {
      number: document.number,
      currency: {
        name: document?.currency?.name || 'Akz',
        rate: document?.currency?.rate || '0,00 Kz',
      },
      date_issue: document.date_issue,
      due_date: document?.due_date || false,
      discount: document?.discount || false,
      payment_terms: document?.payment_terms || false,
      observation: document?.observation || false,
    },
    tax_summary:
      tax_summary?.map((tax) => ({
        value: tax?.value || '0,00 Kz',
        incidence: tax?.incidence || '0,00 Kz',
        total: tax?.total || '0,00 Kz',
        reason_exemption: tax?.reason_exemption || '',
      })) || [],
    total: {
      items: total.items,
      discounts: total.discounts,
      advance: total.advance,
      iva: total.iva,
      hit: total.hit,
      retention: total.retention,
      value: total.value,
    },
    show_banks,
    banks,
  };

  const template = Handlebars.compile(templateSource);

  return template(context);
}
