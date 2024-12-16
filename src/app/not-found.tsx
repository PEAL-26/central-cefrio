import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-8 p-8 text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-100">404</h1>
        <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200">
          Página não encontrada
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Ops! A página que você está procurando parece ter se perdido no ciberespaço.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Voltar para a página inicial
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a página anterior
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
