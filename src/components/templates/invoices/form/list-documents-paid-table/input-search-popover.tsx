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
import { InvoiceListResponseData } from "@/services/invoices";
import { getDocumentTypeNameByCode } from "@/constants/document-types";
import { formatDate } from "@/helpers/date";
import { toastResponseError } from "@/helpers/response/response";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

interface ItemSearchProps {
  form: any;
  index: number;
}

export function InputSearchPopover(props: ItemSearchProps) {
  const { form, index } = props;
  const [open, setOpen] = useState(() => false);
  const { updatePayments } = useInvoiceUpdateTotal();

  const handleSelect = (data: InvoiceListResponseData) => {
    const items = form.getValues("documents");
    if (items.find(({ documentId }: any) => documentId === data.id)) {
      setOpen(false);
      return;
    }

    if (items.length > 1) {
      if (!items.some((i: any) => i.customerId === data.customer.id)) {
        toastResponseError(
          "Ao emitir recibo de várias facturas, não pode adicionar facturas de outro cliente."
        );

        return;
      }
    }

    if (items.length === 1) {
      form.setValue("customerId", data.customer.id);
    }

    form.setValue(
      `documents.${index}.description`,
      `${getDocumentTypeNameByCode(data.type)} ${data.number} (${formatDate(
        data.date
      )}) - ${data.customer.name}`
    );
    form.setValue(`documents.${index}.customerId`, data.customer.id);
    form.setValue(`documents.${index}.documentId`, data.id);
    form.setValue(`documents.${index}.total`, Number(data?.total ?? 0));

    // TODO Verificar quanto já foi pago
    form.setValue(`documents.${index}.paid`, 0);

    setOpen(false);
    updatePayments();
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <FormField
        control={form.control}
        name={`documents.${index}.description`}
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
        align="start"
        className="w-80 h-96 bg-white overflow-hidden p-0"
      >
        <div className="flex-1 h-full w-full relative">
          <div className="flex w-full h-full overflow-y-auto absolute">
            <TableItemsSearch open={open} onSelect={handleSelect} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
