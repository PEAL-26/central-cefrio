'use client';

import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="space-y-8 p-8 text-center">
          <AlertTriangle className="mx-auto h-24 w-24 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Oops! Algo deu errado
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando
            para resolver o problema.
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Código de erro: {error.digest}
            </p>
          )}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={reset} variant="default">
              <RefreshCcw className="mr-2 h-4 w-4" /> Tentar novamente
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Voltar para a página inicial
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
