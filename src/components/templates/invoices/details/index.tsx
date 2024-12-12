"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/helpers/date";
import { Badge } from "@/components/ui/badge";
import { currencyFormatter } from "@/helpers/currency";
import { InvoiceDetailsData } from "@/services/invoices";
import { getDocumentTypeNameByCode } from "@/constants/document-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ActionsButtons } from "./button-actions";

export function InvoiceDetails({ invoice }: { invoice: InvoiceDetailsData }) {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Detalhes da Fatura</h1>
        <ActionsButtons id={invoice.id} />
      </div>

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
              <dd>{invoice.paymentTerms || "S/N"}</dd>
              <dt className="font-semibold">Referência:</dt>
              <dd>{invoice.reference || "S/N"}</dd>
              <dt className="font-semibold">Moeda:</dt>
              <dd>{invoice.currency || "S/N"}</dd>
              <dt className="font-semibold">Taxa de Câmbio:</dt>
              <dd>{invoice.exchange || "S/N"}</dd>
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
              <dd>{invoice.customer?.taxpayer || "S/N"}</dd>
              <dt className="font-semibold">Telefone:</dt>
              <dd>{invoice.customer?.telephone || "S/N"}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{invoice.customer?.email || "S/N"}</dd>
              <dt className="font-semibold">Endereço:</dt>
              <dd>{invoice.customer?.address || "S/N"}</dd>
              <dt className="font-semibold">Localização:</dt>
              <dd>{invoice.customer?.location || "S/N"}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

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
                <TableHead>Unidade de Medida</TableHead>
                <TableHead>IVA</TableHead>
                <TableHead>Razão de Isenção</TableHead>
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
                  <TableCell>{product.iva}%</TableCell>
                  <TableCell>{product.reasonExemption || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
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
              <dd>{invoice?.withholdingTaxType || "S/N"}</dd>
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
                {currencyFormatter(invoice?.total || 0, {
                  code: invoice.currency,
                })}
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Método</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.payments?.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      {currencyFormatter(payment.amount, {
                        code: invoice.currency,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Relacionados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.documents?.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>{doc.document.number}</TableCell>
                    <TableCell>{doc.document.type}</TableCell>
                    <TableCell>{formatDate(doc.document.date)}</TableCell>
                    <TableCell>
                      <Badge variant={doc.paid ? "default" : "destructive"}>
                        {doc.paid ? "Sim" : "Não"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
      </div>

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
