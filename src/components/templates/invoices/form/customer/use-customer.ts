import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { InvoiceSchemaType } from "../schema";
import { customerService } from "@/services/customers";

export function useCustomer() {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);

  const form = useFormContext<InvoiceSchemaType>();
  const customerId = form.watch("customerId");

  const { data, isLoading } = useQuery({
    queryFn: () => customerService.getById(customerId || ""),
    queryKey: ["customer", customerId],
  });

  const handleAddCustomer = () => {
    setAdd(true);
  };

  const handleSelect = (customerId: string) => {
    form.setValue("customerId", customerId);
    handleClose();
  };

  const handleClose = (open = false) => {
    if (!open) {
      setAdd(false);
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return {
    customer: data,
    isLoading,
    open,
    add,
    handleClose,
    handleOpen,
    setAdd,
    handleAddCustomer,
    handleSelect,
  };
}
