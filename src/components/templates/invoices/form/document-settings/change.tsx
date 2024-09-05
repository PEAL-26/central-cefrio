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
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function Change() {
  const { form } = useDocumentSettings();
  const [open, setOpen] = useState(false);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="flex items-center line-clamp-1 gap-2">
        <span
          className={cn(
            "flex gap-2 items-center line-clamp-1 whitespace-nowrap w-full"
          )}
        >
          {form?.watch("exchange") || "0.00"}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <FormField
          control={form.control}
          name="exchange"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
