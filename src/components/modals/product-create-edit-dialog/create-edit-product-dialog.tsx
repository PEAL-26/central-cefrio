'use client';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateEditProductForm } from './form';
import { CreateEditProductDialogProps } from './types';
import { useCreateEditProduct } from './use-dialog';

export function CreateEditProductDialog(props: CreateEditProductDialogProps) {
  const { id, open, onClose } = props;
  const { isPending, isLoading, form, onSubmit } = useCreateEditProduct({
    id,
    open,
    onClose,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? 'Alterar produto\\serviço' : 'Adicionar produto\\serviço'}
          </DialogTitle>
        </DialogHeader>
        <CreateEditProductForm
          form={form}
          isLoading={isLoading}
          isPending={isPending}
          onSubmit={onSubmit}
        >
          <DialogFooter className="flex lg:items-center lg:justify-center">
            <Button
              variant={'default'}
              className="gap-2 text-white"
              type="submit"
              disabled={isPending || isLoading}
            >
              {(isPending || isLoading) && <Loader2 className="size-3 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </CreateEditProductForm>
      </DialogContent>
    </Dialog>
  );
}
