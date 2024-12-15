"use client";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InvoicePaymentsComponent } from "@/components/ui/payments";
import { useAddPayment } from "./use-add-payment";
import { ReactLoading } from "@/libs/react-loading";
import { Loader2Icon } from "lucide-react";
import { useInitialLoading } from "@/hooks/use-initial-loading";

interface Props {
  documentId: string;
}

export function AddPayment(props: Props) {
  const { documentId } = props;
  const {
    isLoading,
    isLoadingData,
    form,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    handleChangeStateModal: handleClose,
  } = useAddPayment(documentId);
  const isReady = useInitialLoading()
  
  if (!isReady) {
    return null
  }
  
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger>
        <Button
          variant="default"
          className=""
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Adicionar pagamento</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          {isLoadingData && (
            <div className="flex justify-center items-center h-80">
              <ReactLoading
                type="spinningBubbles"
                color={"#1B3D7A"}
                height={60}
                width={60}
              />
            </div>
          )}
          {!isLoadingData && (
            <div>
              <InvoicePaymentsComponent
                disabled={isLoading}
                control={form.control}
                className="w-full"
                headerClassName="px-6"
                paymentsClassName="max-h-[400px] overflow-y-auto px-6 pb-6"
              />

              <div className="flex justify-end gap-2 items-center px-6 pb-4">
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
                  onClick={()=>handleClose(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
