import { useFieldArray, useFormContext } from "react-hook-form";
import { InvoiceSchemaType } from "../schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { PaymentMethod } from "./method";
import { DOCUMENTS_WITH_PAYMENT } from "@/constants/document-types";

export function InvoicePayments() {
  const form = useFormContext<InvoiceSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "payments",
  });

  const hasPayment = DOCUMENTS_WITH_PAYMENT.includes(form.watch("type"));

  if (!hasPayment) return null;

  return (
    <div className="flex flex-col gap-4 w-60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pagamentos</h2>
        <Button
          variant={"ghost"}
          onClick={() => append({ method: "", amount: 0, paymentId: "" })}
          className="gap-4 p-0 h-8 w-8 rounded-full"
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="w-60 gap-2 flex flex-col">
        {fields.map((payment, index) => (
          <div key={index} className="flex flex-col gap-1">
            <PaymentMethod index={index} />
            <div className="flex items-center gap-3">
              <FormField
                defaultValue={index === 0 ? form.watch("total") : undefined}
                control={form.control}
                name={`payments.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={!form.watch(`payments.${index}.method`)}
                        min="0.00"
                        step="0.01"
                        type="number"
                        className="w-full text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={"ghost"}
                className="group hover:bg-transparent p-0 w-6 h-6 hover:text-red-500"
                onClick={() => remove(index)}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
