export const PAYMENT_TERMS = [
  { code: undefined, name: 'Nenhum' },
  { code: 'ready', name: 'Pronto Pagamento' },
  { code: 'installment', name: 'Pagamento a prazo' },
  { code: 'other', name: 'Outro' },
];

export function getPaymentTerms(code: string) {
  return PAYMENT_TERMS.find((payment) => payment.code === code);
}

export function getPaymentTermsNameByCode(code: string) {
  return PAYMENT_TERMS.find((payment) => payment.code === code)?.name || '';
}
