import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DOCUMENTS_WITH_PAYMENT,
  DOCUMENT_STATUS_ENUM,
  DOCUMENT_STATUS_ENUM_MAP,
  getDocumentTypeNameByCode,
} from '@/constants/document-types';
import { getPaymentMethodNameByCode } from '@/constants/payment-methods';
import { getPaymentTermsNameByCode } from '@/constants/payment-terms';
import { currencyFormatter } from '@/helpers/currency';
import { formatDate } from '@/helpers/date';
import { cn } from '@/libs/utils';
import { InvoiceDetailsData } from '@/services/invoices';

import { AddPayment } from './add-payment';
import { ActionsButtons } from './button-actions';
import { ButtonPrint } from './button-print';

export function InvoiceDetails({ invoice }: { invoice: InvoiceDetailsData }) {
  let payments = [];
  let total = 0;
  let totalPaid = 0;
  let balance = 0;

  if (invoice.type === 'RE') {
    total = (invoice?.documents?.flatMap((d) => ({ ...d.invoice })) || []).reduce(
      (total, item) => Number(total) + Number(item?.total || 0),
      0,
    );
    payments = invoice?.payments?.map((p) => ({ ...p, status: invoice.status })) || [];
    total = Number(invoice?.total || 0);
    totalPaid = Number(invoice?.totalPaid || 0);
    balance = totalPaid - total;
  } else {
    payments =
      invoice?.documents?.flatMap((d) => [
        ...(d?.invoice?.payments?.map((p) => ({ ...p, status: d.invoice.status })) || []),
      ]) || [];
    total = Number(invoice?.total || 0);
    totalPaid =
      payments
        .filter((p) => p.status !== DOCUMENT_STATUS_ENUM.A)
        .reduce((total, item) => Number(total) + Number(item.amount), 0) || 0;
    balance = totalPaid - total;
  }

  return (
    <div className="container mx-auto py-10">
      <div
        className={cn(
          'mb-6 flex w-full items-center justify-between gap-2 rounded-md p-2',
          invoice.status === DOCUMENT_STATUS_ENUM.A && 'bg-red-500 text-white',
        )}
      >
        <div className="flex w-full items-center gap-2">
          <h1 className="text-3xl font-bold">Detalhes do documento</h1>
          <ActionsButtons data={invoice} />
        </div>
        <span
          className={cn(
            'text-lg font-bold uppercase',
            invoice.status === DOCUMENT_STATUS_ENUM.N && 'text-green-500',
          )}
        >
          {DOCUMENT_STATUS_ENUM_MAP[invoice?.status as DOCUMENT_STATUS_ENUM] ?? ''}
        </span>
      </div>

      {/* Informações gerais */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Número:</dt>
              <dd>{invoice.number}</dd>
              <dt className="font-semibold">Tipo:</dt>
              <dd>{getDocumentTypeNameByCode(invoice.type)}</dd>
              <dt className="font-semibold">Data:</dt>
              <dd>{formatDate(invoice.date)}</dd>
              <dt className="font-semibold">Data de Vencimento:</dt>
              <dd>{formatDate(invoice?.dueDate)}</dd>
              <dt className="font-semibold">Termos de Pagamento:</dt>
              <dd>{getPaymentTermsNameByCode(invoice?.paymentTerms || '') || 'S/N'}</dd>
              <dt className="font-semibold">Referência:</dt>
              <dd>{invoice.reference || 'S/N'}</dd>
              <dt className="font-semibold">Moeda:</dt>
              <dd>{invoice.currency || 'S/N'}</dd>
              <dt className="font-semibold">Taxa de Câmbio:</dt>
              <dd>{invoice.exchange || 'S/N'}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Nome:</dt>
              <dd>{invoice.customer.name}</dd>
              <dt className="font-semibold">Contribuinte:</dt>
              <dd>{invoice.customer?.taxpayer || 'S/N'}</dd>
              <dt className="font-semibold">Telefone:</dt>
              <dd>{invoice.customer?.telephone || 'S/N'}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{invoice.customer?.email || 'S/N'}</dd>
              <dt className="font-semibold">Endereço:</dt>
              <dd>{invoice.customer?.address || 'S/N'}</dd>
              <dt className="font-semibold">Localização:</dt>
              <dd>{invoice.customer?.location || 'S/N'}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Produtos */}
      {invoice.type !== 'RE' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">IVA</TableHead>
                  <TableHead className="text-center">Desc.</TableHead>
                  <TableHead>TOTAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.products?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>
                      {currencyFormatter(product.price, {
                        code: invoice.currency,
                      })}
                    </TableCell>
                    <TableCell>{product.unitMeasure}</TableCell>
                    <TableCell className="text-center">{product.quantity}</TableCell>
                    <TableCell className="text-center">{product?.iva ?? 0}%</TableCell>
                    <TableCell className="text-center">{product?.discount ?? 0}%</TableCell>
                    <TableCell>
                      {' '}
                      {currencyFormatter(product.total, {
                        code: invoice.currency,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Resumo Financeiro */}
      <div
        className={cn('mt-6 grid gap-6 md:grid-cols-2', invoice.type === 'RE' && 'md:grid-cols-1')}
      >
        {invoice.type !== 'RE' && (
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-semibold">Subtotal:</dt>
                <dd>
                  {currencyFormatter(invoice?.subtotal || 0, {
                    code: invoice.currency,
                  })}
                </dd>
                <dt className="font-semibold">Total IVA:</dt>
                <dd>
                  {currencyFormatter(invoice?.totalIva || 0, {
                    code: invoice.currency,
                  })}
                </dd>
                <dt className="font-semibold">Desconto Geral:</dt>
                <dd>{invoice?.generalDiscount || 0}%</dd>
                <dt className="font-semibold">Total Desconto:</dt>
                <dd>
                  {currencyFormatter(invoice?.totalDiscount || 0, {
                    code: invoice.currency,
                  })}
                </dd>
                <dt className="font-semibold">Tipo de Retenção:</dt>
                <dd>{invoice?.withholdingTaxType || 'S/N'}</dd>
                <dt className="font-semibold">Percentagem de Retenção:</dt>
                <dd>{invoice?.withholdingTaxPercentage || 0}%</dd>
                <dt className="font-semibold">Total Retenção:</dt>
                <dd>
                  {currencyFormatter(invoice?.totalWithholdingTax || 0, {
                    code: invoice.currency,
                  })}
                </dd>
                <dt className="font-semibold">Total:</dt>
                <dd className="text-lg font-bold">
                  {currencyFormatter(total, {
                    code: invoice.currency,
                  })}
                </dd>
                {DOCUMENTS_WITH_PAYMENT.includes(invoice.type) && (
                  <>
                    <dt className="font-semibold">Pago:</dt>
                    <dd className="text-lg font-bold">
                      {currencyFormatter(totalPaid, {
                        code: invoice.currency,
                      })}
                    </dd>
                    <dt className="font-semibold">Saldo:</dt>
                    <dd
                      className={cn(
                        'text-lg font-bold',
                        balance < 0 && 'text-red-500',
                        balance > 0 && 'text-green-500',
                      )}
                    >
                      {currencyFormatter(balance, {
                        code: invoice.currency,
                      })}
                    </dd>
                  </>
                )}
              </dl>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pagamentos</CardTitle>
            {invoice.status === DOCUMENT_STATUS_ENUM.N && invoice.type === 'FT' && (
              <AddPayment documentId={invoice.id} total={total} totalPaid={totalPaid} />
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="w-[1%]">Estado</TableHead>
                  <TableHead>Obs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{getPaymentMethodNameByCode(payment.method)}</TableCell>
                    <TableCell>
                      {currencyFormatter(payment.amount, {
                        code: invoice.currency,
                      })}
                    </TableCell>
                    <TableCell className="text-center">{payment.status}</TableCell>
                    <TableCell className="line-clamp-1">{payment.observation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Documentos Relacionados */}
      <div
        className={cn('mt-6 grid gap-6 md:grid-cols-2', invoice.type === 'RE' && 'md:grid-cols-1')}
      >
        <Card>
          <CardHeader>
            <CardTitle>Documentos Relacionados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead className="w-[1%]">Estado</TableHead>
                  <TableHead className="w-[1%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.documents?.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-primary">
                      <Link href={`/comercial/invoices/${doc.invoice.id}`}>
                        {`${getDocumentTypeNameByCode(doc.invoice.type)} ${doc.invoice.number}`}
                      </Link>
                    </TableCell>
                    <TableCell>{formatDate(doc.invoice.date)}</TableCell>
                    <TableCell>
                      {currencyFormatter(doc.paid, {
                        code: invoice.currency,
                      })}
                    </TableCell>
                    <TableCell className="text-center">{doc.invoice.status}</TableCell>
                    <TableCell>
                      <ButtonPrint documentId={doc.invoice.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {invoice.type !== 'RE' && (
          <Card>
            <CardHeader>
              <CardTitle>Impostos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valor</TableHead>
                    <TableHead>Montante</TableHead>
                    <TableHead>Incidência</TableHead>
                    <TableHead>Observação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice?.taxes?.map((tax, index) => (
                    <TableRow key={index}>
                      <TableCell>{tax.value}%</TableCell>
                      <TableCell>
                        {currencyFormatter(tax.amount, {
                          code: invoice.currency,
                        })}
                      </TableCell>
                      <TableCell>
                        {currencyFormatter(tax.incidence, {
                          code: invoice.currency,
                        })}
                      </TableCell>
                      <TableCell>{tax.observation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Observação */}
      {invoice.observation && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{invoice.observation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
