"use client";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CustomerForm } from "./form";
import { CustomerTable } from "./table";
import { useCustomer } from "./use-customer";
import { useEffect, useState } from "react";

interface CustomerModalProps {}

export function CustomerModal(props: CustomerModalProps) {
  const {} = props;
  const {
    add,
    open,
    setAdd,
    handleClose,
    handleOpen,
    handleAddCustomer,
    handleSelect,
  } = useCustomer();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <Popover modal open={open} onOpenChange={handleClose}>
      <PopoverTrigger>
        <Button
          type="button"
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={handleOpen}
        >
          <BoltIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 h-96 bg-white overflow-hidden  p-0"
      >
        <div className="flex-1 h-full w-full relative">
          <div
            data-add={add}
            className="flex w-full h-full overflow-y-auto absolute transition-all translate-x-0 data-[add='true']:translate-x-0 data-[add='false']:-translate-x-full"
          >
            <CustomerForm
              onSubmitted={handleSelect}
              onBack={() => setAdd(false)}
            />
          </div>
          <div
            data-add={add}
            className="flex w-full h-full overflow-y-auto absolute transition-all translate-x-0 data-[add='false']:translate-x-0 data-[add='true']:translate-x-full"
          >
            <CustomerTable
              open={open}
              onAdd={handleAddCustomer}
              onSelect={(customer) => handleSelect(customer.id)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
