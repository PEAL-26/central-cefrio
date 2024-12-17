'use client';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InvoicePaymentsComponent } from '@/components/ui/payments';
import { currencyFormatter } from '@/helpers/currency';
import { useInitialLoading } from '@/hooks/use-initial-loading';
import { cn } from '@/libs/utils';
import { CheckCircle, Loader2Icon } from 'lucide-react';
import { useAddPayment } from './use-add-payment';

interface Props {
  documentId: string;
  total: number;
  totalPaid: number;
}

export function AddPayment(props: Props) {
  const { documentId, total, totalPaid } = props;
  const {
    isLoading,
    isLoadingData,
    form,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    handleChangeStateModal: handleClose,
  } = useAddPayment(documentId);
  const isReady = useInitialLoading();
  const payments = form.watch('payments');

  const balanceOld = Number(totalPaid) - Number(total);
  const currentTotalPaid = payments.reduce(
    (total, item) => Number(total) + Number(item.amount || 0),
    0,
  );
  const currentBalance = Number(currentTotalPaid) + Number(totalPaid) - Number(total);

  if (!isReady) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger>
        <Button variant="default" className="" onClick={() => setIsModalOpen(true)}>
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b px-6 pb-2 pt-6">
          <DialogTitle>Adicionar pagamento</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between px-6 text-sm font-bold">
          <span>TOTAL À PAGAR: {currencyFormatter(total)}</span>
          <span>TOTAL PAGO: {currencyFormatter(totalPaid)}</span>
        </div>

        <FormProvider {...form}>
          {balanceOld >= 0 && (
            <div className="flex flex-col items-center justify-center gap-2 p-4">
              <CheckCircle className="size-20 text-green-500" />
              <span className="text-center text-lg">Esse documento já foi completamente pago</span>
            </div>
          )}
          {balanceOld < 0 && (
            <div>
              <InvoicePaymentsComponent
                disabled={isLoading}
                control={form.control}
                className="w-full"
                headerClassName="px-6"
                paymentsClassName="max-h-[400px] overflow-y-auto px-6 pb-6"
              />

              <div className="flex items-center justify-between gap-2 px-6 pb-4">
                <div className="flex flex-col font-bold">
                  <span className="">{currencyFormatter(currentTotalPaid)} (Pagamentos)</span>
                  <span
                    className={cn(
                      'text-sm text-gray-600',
                      currentBalance > 0 && 'text-green-500',
                      currentBalance < 0 && 'text-red-500',
                    )}
                  >
                    {currencyFormatter(currentBalance)} (Saldo)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="flex items-center gap-2"
                  >
                    {isLoading && <Loader2Icon className="size-4 animate-spin" />}
                    Guardar
                  </Button>
                  <Button
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => handleClose(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
