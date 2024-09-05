"use client";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { CreateEditCustomerForm } from "./form";
import { useCustomerCreateEdit } from "./use-dialog";
import { CustomerCreateEditDialogProps } from "./types";

export function CreateEditCustomerDialog(props: CustomerCreateEditDialogProps) {
  const { id, open, onClose } = props;
  const { isPending, isLoading, form, onSubmit } = useCustomerCreateEdit({
    id,
    open,
    onClose,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Alterar cliente" : "Adicionar cliente"}
          </DialogTitle>
        </DialogHeader>
        <CreateEditCustomerForm
          form={form}
          onSubmit={onSubmit}
          formClassName="sm:rounded-lg"
          isLoading={isPending || isLoading}
        >
          <DialogFooter className="flex lg:items-center lg:justify-center">
            <Button
              variant={"default"}
              className="gap-2 text-white"
              type="submit"
              disabled={isPending || isLoading}
            >
              {(isPending || isLoading) && (
                <Loader2 className="size-3 animate-spin" />
              )}
              Guardar
            </Button>
          </DialogFooter>
        </CreateEditCustomerForm>
      </DialogContent>
    </Dialog>
  );
}
