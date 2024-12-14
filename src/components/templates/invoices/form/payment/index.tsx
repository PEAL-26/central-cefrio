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
import { Textarea } from "@/components/ui/textarea";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";
import { DatePicker } from "@/components/ui/date-picker";

export function InvoicePayments() {
  const form = useFormContext<InvoiceSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "payments",
  });
  const { updatePayments } = useInvoiceUpdateTotal();

  const hasPayment = DOCUMENTS_WITH_PAYMENT.includes(form.watch("type"));

  if (!hasPayment) return null;

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold">Pagamentos</h2>
        <Button
          variant={"ghost"}
          onClick={() =>
            append({ method: "", amount: 0, paymentId: "", date: new Date() })
          }
          className="gap-4 p-0 h-8 w-8 rounded-full"
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="gap-2 flex flex-col w-full">
        {fields.map((_, index) => (
          <div key={index} className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <PaymentMethod index={index} />
              <Button
                type="button"
                variant={"ghost"}
                className="group hover:bg-transparent p-0 w-6 h-6 hover:text-red-500"
                onClick={() => remove(index)}
              >
                <TrashIcon />
              </Button>
            </div>
            <div className="flex items-center gap-3 w-full">
              <FormField
                defaultValue={index === 0 ? form.watch("total") : undefined}
                control={form.control}
                name={`payments.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!form.watch(`payments.${index}.method`)}
                        min="0.00"
                        step="0.01"
                        type="number"
                        className="w-full text-right"
                        onBlur={() => updatePayments()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`payments.${index}.date`}
              render={({ field }) => (
                <DatePicker
                  disabled={!form.watch(`payments.${index}.method`)}
                  className="w-full"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`payments.${index}.observation`}
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={!form.watch(`payments.${index}.method`)}
                      placeholder="Observação"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
