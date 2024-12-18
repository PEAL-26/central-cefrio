import { Handlebars } from '@/libs/handlebars';

import { TransportDataType } from '../types';
import { generateItems } from '../utils';

import templateSource from './transport.min.hbs';

export async function transportTemplate(data: TransportDataType) {
  const { company, customer, document, items, logo_url, number_validation } = data;

  const { total_pages, pages } = await generateItems(items, 22);

  const context = {
    total_pages,
    pages,
    logo_url,
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
      date_issue: document.date_issue,
      delivery_date: document?.delivery_date,
      observation: document?.observation || false,
      reference: document?.reference || false,
    },
    number_validation,
  };

  const template = Handlebars.compile(templateSource);

  return template(context);
}
