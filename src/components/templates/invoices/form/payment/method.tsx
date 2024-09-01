import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { CURRENCIES } from "@/constants/currencies";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PAYMENT_METHODS } from "@/constants/payment-methods";
import { useDocumentSettings } from "../document-settings/use-document-settings";

interface PAymentMethodProps {
  index: number;
}
export function PaymentMethod({ index }: PAymentMethodProps) {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  const payment = PAYMENT_METHODS.find(
    (payment) => payment.code === form.getValues(`payments.${index}.method`)
  );

  const handleSelect = (paymentCode: string) => {
    const payments = form.getValues("payments");
    const paymentFound = payments.find(
      (payment) => payment.method === paymentCode
    );

    if (paymentFound) return;

    form.setValue(`payments.${index}.method`, paymentCode);
    setOpen(false);
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="flex line-clamp-1 gap-2 justify-between w-fit">
        <span
          className={cn(
            "flex line-clamp-1 whitespace-nowrap text-left",
            !payment?.code && "text-gray-400"
          )}
        >
          {payment?.name || "Selecione o método de pagamento"}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {PAYMENT_METHODS.map((payment, key) => (
            <span
              key={key}
              className="hover:bg-gray-100 p-1 pr-14 rounded cursor-pointer"
              onClick={() => handleSelect(payment.code)}
            >
              {payment.name}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
