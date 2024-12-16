import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ProductForm } from './form';
import { ProductListing } from './product-listing';
import { ItemSearchProps } from './types';
import { useInputSearch } from './use-input-search';

export function InputSearchPopover(props: ItemSearchProps) {
  const { form, index } = props;
  const { open, add, setOpen, setAdd, handleSelect, handleAddCustomer } = useInputSearch(props);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <FormField
        control={form.control}
        name={`items.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <PopoverTrigger className="w-full">
                <Input placeholder="Product or Service" className="w-full" {...field} />
              </PopoverTrigger>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PopoverContent align="end" className="h-96 w-80 overflow-hidden bg-white p-0">
        <div className="relative h-full w-full flex-1">
          <div
            data-add={add}
            className="absolute flex h-full w-full translate-x-0 overflow-y-auto transition-all data-[add='false']:-translate-x-full data-[add='true']:translate-x-0"
          >
            <ProductForm onSubmitted={handleSelect} onBack={() => setAdd(false)} />
          </div>
          <div
            data-add={add}
            className="absolute flex h-full w-full translate-x-0 overflow-y-auto transition-all data-[add='false']:translate-x-0 data-[add='true']:translate-x-full"
          >
            <ProductListing open={open} onSelect={handleSelect} onAdd={() => setAdd(true)} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
