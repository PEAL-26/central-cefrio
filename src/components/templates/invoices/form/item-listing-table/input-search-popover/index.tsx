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

import { ProductListing } from "./product-listing";
import { ItemSearchProps } from "./types";
import { useInputSearch } from "./use-input-search";
import { ProductForm } from "./form";

export function InputSearchPopover(props: ItemSearchProps) {
  const { form, index } = props;
  const { open, add, setOpen, setAdd, handleSelect, handleAddCustomer } =
    useInputSearch(props);

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
      <PopoverContent
        align="end"
        className="w-80 h-96 bg-white overflow-hidden p-0"
      >
        <div className="flex-1 h-full w-full relative">
          <div
            data-add={add}
            className="flex w-full h-full overflow-y-auto absolute transition-all translate-x-0 data-[add='true']:translate-x-0 data-[add='false']:-translate-x-full"
          >
            <ProductForm
              onSubmitted={handleSelect}
              onBack={() => setAdd(false)}
            />
          </div>
          <div
            data-add={add}
            className="flex w-full h-full overflow-y-auto absolute transition-all translate-x-0 data-[add='false']:translate-x-0 data-[add='true']:translate-x-full"
          >
            <ProductListing
              open={open}
              onSelect={handleSelect}
              onAdd={() => setAdd(true)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
