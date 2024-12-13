import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { TableItemsSearch } from "./table-items-search";
import { ProductListResponseData } from "@/services/products";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

interface ItemSearchProps {
  form: any;
  index: number;
}

export function InputSearchPopover(props: ItemSearchProps) {
  const { form, index } = props;
  const [open, setOpen] = useState(() => false);
  const { updateTotal } = useInvoiceUpdateTotal();

  const handleSelect = (data: ProductListResponseData) => {
    const items = form.getValues("items");
    if (items.find(({ itemId }: any) => itemId === data.id)) {
      setOpen(false);
      return;
    }

    form.setValue(`items.${index}.productId`, data.id);
    form.setValue(`items.${index}.name`, data.name);
    form.setValue(`items.${index}.price`, data.price ?? 0);
    form.setValue(`items.${index}.unitMeasure`, data.unitMeasure || "un");
    form.setValue(`items.${index}.iva`, data.iva ?? 0);

    updateTotal(index);
    setOpen(false);
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <FormField
        control={form.control}
        name={`items.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <PopoverTrigger className="w-full">
                <Input
                  placeholder="Product or Service"
                  className="w-full"
                  {...field}
                />
              </PopoverTrigger>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PopoverContent align="start" className="w-80 h-96 bg-white">
        <TableItemsSearch onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
