import { InvoiceType } from "./invoice-type";
import { DatePicker } from "./date-picker";
import { Currency } from "./currency";
import { PaymentTerms } from "./payment-terms";
import { useDocumentSettings } from "./use-document-settings";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Change } from "./change";

export function DocumentSettings() {
  const { form } = useDocumentSettings();

  return (
    <div className="flex flex-col w-96 gap-4">
      <div className="flex justify-between items-center w-full gap-4 border-b">
        <h2 className="text-lg font-semibold">Documento</h2>
        <span className="font-bold text-lg">
          Nº {form.watch("number") || "000"}
        </span>
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex items-center justify-between w-full gap-4">
          <span className="font-bold">Tipo: </span>
          <InvoiceType />
        </div>
        <div className="flex items-center justify-between w-full  gap-4">
          <span className="font-bold">Data: </span>
          <DatePicker
            value={form.watch("date")}
            onChange={(date) => form.setValue("date", date)}
          />
        </div>
        <div className="flex items-center justify-between w-full  gap-4">
          <span className="font-bold">Vencimento: </span>
          <DatePicker
            value={form.watch("dueDate")}
            onChange={(date) => form.setValue("dueDate", date)}
          />
        </div>
        <div className="flex items-center justify-between w-full  gap-4">
          <span className="font-bold">Moeda: </span>
          <Currency />
        </div>
        {form.watch("currency") !== "AOA" && (
          <div className="flex items-center justify-between w-full  gap-4">
            <span className="font-bold">Câmbio: </span>
            <Change />
          </div>
        )}
        <div className="flex-1 flex items-center justify-between w-full gap-4">
          <span className="font-bold">Cond. Pagamento</span>
          <PaymentTerms />
        </div>
        <div className="flex flex-col w-full">
          <span className="font-bold">Observações: </span>
          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormControl>
                  <Textarea placeholder="Observação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
