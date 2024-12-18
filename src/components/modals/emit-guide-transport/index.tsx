'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';
import { Loader2Icon } from 'lucide-react';
import { useEmitGuidePayment } from './use-emit-guide-transport';

interface Props {
  documentId: string;
  className?: string;
}

export function EmitGuideTransport(props: Props) {
  const { documentId, className } = props;
  const {
    isModalOpen,
    isLoading,
    deliveryDate,
    handleSubmit,
    handleChangeStateModal,
    setIsModalOpen,
    setDeliveryDate,
    observation,
    setObservation,
  } = useEmitGuidePayment(documentId);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleChangeStateModal} modal>
      <DialogTrigger
        asChild
        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary-100 hover:text-primary-900"
      >
        <span onClick={() => setIsModalOpen(true)}>Emitir Guia Trans.</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Emitir Guia de Transporte\Remessa</DialogTitle>
        </DialogHeader>
        <Label>Data de Entrega</Label>
        <DatePicker
          disabled={isLoading}
          value={deliveryDate}
          start={new Date()}
          onChange={setDeliveryDate}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex w-full items-center justify-between border border-neutral-200 hover:bg-transparent focus:ring-0',
          )}
        />
        <Textarea
          disabled={isLoading}
          value={observation}
          placeholder="Observação"
          className="resize-none"
          onChange={(e) => setObservation(e.currentTarget.value)}
        />
        <div className="mt-5 flex items-center justify-end gap-2">
          <Button disabled={isLoading} onClick={handleSubmit} className="flex items-center gap-2">
            {isLoading && <Loader2Icon className="size-4 animate-spin" />}
            Emitir
          </Button>
          <Button
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-700"
            onClick={() => handleChangeStateModal(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
