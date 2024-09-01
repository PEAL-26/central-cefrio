import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useDocumentSettings } from "./use-document-settings";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { CURRENCIES } from "@/constants/currencies";

export function Currency() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  const currency = CURRENCIES.find(
    (doc) => doc.code === form.getValues("currency")
  );

  const handleSelect = (code: string) => {
    form.setValue("currency", code);
    setOpen(false);
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="flex items-center line-clamp-1 gap-2">
        <span
          className={cn(
            "flex gap-2 items-center line-clamp-1 whitespace-nowrap w-full",
            !currency?.name && "text-gray-400"
          )}
        >
          {currency?.name || "Selecione a moeda"}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {CURRENCIES.map((currency, key) => (
            <span
              key={key}
              className="hover:bg-gray-100 p-1 pr-14 rounded cursor-pointer"
              onClick={() => handleSelect(currency.code)}
            >
              {currency.name}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
