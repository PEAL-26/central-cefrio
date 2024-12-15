"use client";
import { LoaderIcon } from "lucide-react";

import { CustomerModal } from "./modal";
import { useCustomer } from "./use-customer";
import { Button } from "@/components/ui/button";

export function CustomerForm() {
  const { customer, isLoading, handleUnselect } = useCustomer();

  return (
    <div className="flex flex-col max-w-lg w-72 gap-4">
      <div className="flex justify-between items-center w-full gap-4 border-b">
        <h2 className="text-lg font-semibold">Cliente</h2>
        <CustomerModal />
      </div>
      <div className="flex items-center gap-2 relative">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Nome </span>
            <span>{customer?.name || "S/N"}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">NIF: </span>
            <span>{customer?.taxpayer || "S/N"}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Telefone: </span>
            <span>{customer?.telephone || "S/N"}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Email: </span>
            <span>{customer?.email || "S/N"}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Cidade </span>
            <span>{customer?.location || "S/N"}</span>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <span className="font-bold">Morada: </span>
            <span className="line-clamp-1 w-full text-right">
              {customer?.address || "S/N"}
            </span>
          </div>
          {customer && (
            <div className="flex items-center justify-center mt-3">
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={handleUnselect}
              >
                Limpar
              </Button>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
