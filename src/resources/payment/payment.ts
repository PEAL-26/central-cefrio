import { Handlebars } from '@/libs/handlebars';
import { PaymentDataType } from '../types';

import { generateItems } from '../utils';
import templateSource from './payment.min.hbs';

export async function paymentTemplate(data: PaymentDataType) {
  const {
    company,
    customer,
    document,
    items,
    logo_url,
    total,
    banks = [],
    show_banks,
    payments = [],
    credit,
    debit,
    subtotal,
    total_paid,
    number_validation,
  } = data;

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
    show_banks,
    banks,
    show_payments: true,
    payments,
    total,
    credit,
    debit,
    subtotal,
    total_paid,
    number_validation,
  };

  const template = Handlebars.compile(templateSource);

  return template(context);
}
