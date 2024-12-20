export const DOCUMENT_TYPES = [
  {
    code: 'FT',
    name: 'Factura',
    slug: 'factura',
  },
  {
    code: 'FR',
    name: 'Factura/Recibo',
    slug: 'factura-recibo',
  },
  {
    code: 'PP',
    name: 'Factura Pró-forma',
    slug: 'proforma',
  },
  {
    code: 'OR',
    name: 'Orçamento',
    slug: 'orcamento',
  },
  {
    code: 'RE',
    name: 'Recibo',
    slug: 'recibo',
  },
  {
    code: 'ND',
    name: 'Nota de Débito',
    slug: 'nota-debito',
  },
  {
    code: 'NC',
    name: 'Nota de Crédito',
    slug: 'nota-credito',
  },
  {
    code: 'FO',
    name: 'Folha de Obra',
    slug: 'folha-obra',
  },
  {
    code: 'OU',
    name: 'Outro',
    slug: 'outro',
  },
];

export const DOCUMENTS_WITH_PAYMENT = ['FT', 'FG', 'FR', 'RE'];
export const DOCUMENTS_NOT_INCLUDE = ['NC', 'ND'];
export const DOCUMENTS_INCLUDE = ['RE', 'NC', 'ND'];
export const PAYMENT = ['RE', 'FR'];

export function getDocumentTypeNameByCode(code: string) {
  return DOCUMENT_TYPES.find((doc) => doc.code === code)?.name || '';
}

export enum DOCUMENT_STATUS_ENUM {
  N = 'N',
  A = 'A',
}

export const DOCUMENT_STATUS_ENUM_MAP: Record<DOCUMENT_STATUS_ENUM, string> = {
  N: 'Normal',
  A: 'Anulado',
};
