import { getDocumentTypeNameByCode } from '@/constants/document-types';
import { currencyFormatter } from '@/helpers/currency';
import { Decimal } from '@prisma/client/runtime/library';

export function getDate(date?: Date | null) {
  return date ? new Date(date).toLocaleDateString('pt-AO') : '';
}

export function getNumber(value?: number | Decimal | null, code?: string) {
  return currencyFormatter(Number(value ?? 0), { code });
}

export function getDocumentNumber(invoice: any) {
  const typeName = getDocumentTypeNameByCode(invoice.type);
  return `${typeName} ${invoice.number}`;
}
