import { FileText, Mail } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import Link from 'next/link';

export default async function AppHomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto flex-grow px-4 py-8">
        <h2 className="mb-6 text-center text-3xl font-bold">Bem-vindo à CefrioApp</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Escolha um dos nossos aplicativos abaixo para começar:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Comercial</CardTitle>
              <CardDescription>Gerencie sua faturação</CardDescription>
            </CardHeader>
            <CardContent>
              <FileText className="mx-auto h-16 w-16 text-primary" />
              <p className="mt-4 text-center">
                Acesse todas as funcionalidades relacionadas à faturação e gestão comercial.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/comercial">Acessar Comercial</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mails</CardTitle>
              <CardDescription>Gerencie seus correios eletrônicos</CardDescription>
            </CardHeader>
            <CardContent>
              <Mail className="mx-auto h-16 w-16 text-primary" />
              <p className="mt-4 text-center">
                Acesse e gerencie todos os seus correios eletrônicos em um só lugar.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/mails">Acessar Mails</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}
