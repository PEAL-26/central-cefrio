"use client";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CreateEditProductDialogProps } from "./types";
import { useCreateEditProduct } from "./use-dialog";
import { BaseSyntheticEvent, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductSchemaType } from "./product";
import { Textarea } from "@/components/ui/textarea";

interface CreateEditProductFormProps {
  children: ReactNode;
  isPending?: boolean;
  isLoading?: boolean;
  form: UseFormReturn<ProductSchemaType>;
  onSubmit?(e?: BaseSyntheticEvent): void;
}

export function CreateEditProductForm(props: CreateEditProductFormProps) {
  const {
    children,
    form,
    isLoading = false,
    isPending = false,
    onSubmit,
  } = props;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid w-full gap-4 sm:rounded-lg">
        <div className="grid grid-cols-3 gap-6 ">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || isPending}
                      type="text"
                      placeholder="Ex.: Instalação mecânica de AC"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="unitMeasure"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Unidade</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || isPending}
                      type="text"
                      placeholder="Km"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || isPending}
                      type="text"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="iva"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>IVA</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || isPending}
                      type="text"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="reasonExemption"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Motivo de Isenção</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Motivo de isenção"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
}
