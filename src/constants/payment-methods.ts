export const PAYMENT_METHODS = [
  { code: 'cash', name: 'Dinheiro' },
  { code: 'transfer', name: 'Transferência' },
  { code: 'deposit', name: 'Depósito' },
];

export function getPaymentMethodNameByCode(code: string) {
  return PAYMENT_METHODS.find((p) => p.code === code)?.name || '';
}
