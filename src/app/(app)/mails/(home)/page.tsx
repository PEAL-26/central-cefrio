import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { Archive, Inbox, Plus, RefreshCcw, Send, Trash2 } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function MailsHomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Caixa de Entrada</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    'Relatório mensal',
                    'Reunião de equipe',
                    'Novo projeto',
                    'Fatura pendente',
                    'Atualização do sistema',
                  ].map((subject, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b py-2 last:border-b-0"
                    >
                      <span className="font-medium">{subject}</span>
                      <span className="text-muted-foreground text-sm">
                        há {index + 1} hora{index !== 0 ? 's' : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full" asChild>
                <Link href="/mails/new">
                  <Plus className="mr-2 h-4 w-4" /> Novo E-mail
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCcw className="mr-2 h-4 w-4" /> Atualizar
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pastas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Inbox className="mr-2 h-4 w-4" /> Caixa de Entrada
                  </li>
                  <li className="flex items-center">
                    <Send className="mr-2 h-4 w-4" /> Enviados
                  </li>
                  <li className="flex items-center">
                    <Archive className="mr-2 h-4 w-4" /> Arquivo
                  </li>
                  <li className="flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" /> Lixeira
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>E-mails não lidos:</span>
                    <span className="font-bold">12</span>
                  </li>
                  <li className="flex justify-between">
                    <span>E-mails enviados hoje:</span>
                    <span className="font-bold">5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Espaço utilizado:</span>
                    <span className="font-bold">45%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
