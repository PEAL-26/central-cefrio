'use client';
import { LoaderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CustomerModal } from './modal';
import { useCustomer } from './use-customer';

export function CustomerForm() {
  const { customer, isLoading, handleUnselect } = useCustomer();

  return (
    <div className="flex w-72 max-w-lg flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-4 border-b">
        <h2 className="text-lg font-semibold">Cliente</h2>
        <CustomerModal />
      </div>
      <div className="relative flex items-center gap-2">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <span className="font-bold">Nome </span>
            <span>{customer?.name || 'S/N'}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-bold">NIF: </span>
            <span>{customer?.taxpayer || 'S/N'}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-bold">Telefone: </span>
            <span>{customer?.telephone || 'S/N'}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-bold">Email: </span>
            <span>{customer?.email || 'S/N'}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-bold">Cidade </span>
            <span>{customer?.location || 'S/N'}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <span className="font-bold">Morada: </span>
            <span className="line-clamp-1 w-full text-right">{customer?.address || 'S/N'}</span>
          </div>
          {customer && (
            <div className="mt-3 flex items-center justify-center">
              <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={handleUnselect}>
                Limpar
              </Button>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
