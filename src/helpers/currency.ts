import * as currency from 'currency-formatter';

export function formatCurrency(value?: number) {
  let newValue = value;
  if (newValue === undefined || newValue === null) newValue = 0;

  const formatNumber = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
  });

  return formatNumber.format(newValue);
}

export type FormatCurrencyOptions = currency.FormatOptions;
export function currencyFormatter(value: number, options?: FormatCurrencyOptions) {
  const {
    code = 'AOA',
    precision = 2,
    format = '%v %s',
    thousand = ' ',
    decimal = ',',
    ...rest
  } = options || {};
  return currency.format(value, {
    code,
    precision,
    thousand,
    format,
    decimal,
    ...rest,
  });
}
